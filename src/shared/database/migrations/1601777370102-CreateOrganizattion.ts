import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrganizattion1601777370102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'organizations',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('organizations');
  }
}
