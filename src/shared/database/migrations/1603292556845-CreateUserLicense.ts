import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserLicense1603292556845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'user_licenses',
        columns: [
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'module_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'license_id',
            type: 'varchar',
            isNullable: true,
          },
        ]
      }))

      await queryRunner.createForeignKey(
        'user_licenses',
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createForeignKey(
        'user_licenses',
        new TableForeignKey({
          columnNames: ['module_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'modules',
          onDelete: 'CASCADE'
        })
      );
      await queryRunner.createForeignKey(
        'user_licenses',
        new TableForeignKey({
          columnNames: ['license_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'licenses',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const userLicenses = await queryRunner.getTable('user_licenses');

      const fkUser = userLicenses?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('user_id') !== -1
      );
      const fkModule = userLicenses?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('module_id') !== -1
      );
      const fkLicense = userLicenses?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('license_id') !== -1
      );
      if (fkUser) {
        await queryRunner.dropForeignKey('user_licenses', fkUser);
      }
      if (fkModule) {
        await queryRunner.dropForeignKey('user_licenses', fkModule);
      }
      if (fkLicense) {
        await queryRunner.dropForeignKey('user_licenses', fkLicense);
      }
      await queryRunner.dropTable('user_licenses');
    }

}
