import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLicense1603292114630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'licenses',
        columns:[
          {
            name:'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'owner',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'module_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'licenseType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'expiration',
            type: 'timestamp with time zone',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: true,
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
            default: 'now()'
          }

        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('licenses')
    }

}
