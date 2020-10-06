import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateUsers1601842467374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'org_id',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'status',
            type: 'varchar'
          },
          {
            name: 'forgot_code',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'comp_id',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'div_id',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: true
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true
          }
        ]
      })
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['org_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organizations',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['comp_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['div_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'divisions',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const usersTable = await queryRunner.getTable('users');

    const fkDivID = usersTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('div_id') !== -1
    );
    const fkCompID = usersTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('comp_id') !== -1
    );
    const fkOrgId = usersTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('org_id') !== -1
    );
    if (fkDivID) {
      await queryRunner.dropForeignKey('users', fkDivID);
    }
    if (fkCompID) {
      await queryRunner.dropForeignKey('users', fkCompID);
    }
    if (fkOrgId) {
      await queryRunner.dropForeignKey('users', fkOrgId);
    }
    await queryRunner.dropTable('users');
  }
}
