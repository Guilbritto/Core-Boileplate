import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateCompany1601778087991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'org_id',
            type: 'varchar'
          }
        ]
      })
    );
    await queryRunner.createForeignKey(
      'companies',
      new TableForeignKey({
        columnNames: ['org_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organizations',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('company', 'org_id');
    await queryRunner.dropTable('company');
  }
}
