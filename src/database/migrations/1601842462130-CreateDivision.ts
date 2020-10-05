import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateDivision1601842462130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'divisions',
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
            name: 'org_id',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'comp_id',
            type: 'varchar',
            isNullable: true
          }
        ]
      })
    );
    await queryRunner.createForeignKey(
      'divisions',
      new TableForeignKey({
        columnNames: ['org_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organizations',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'divisions',
      new TableForeignKey({
        columnNames: ['comp_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('divisions', 'comp_id');
    await queryRunner.dropForeignKey('divisions', 'org_id');
    await queryRunner.dropTable('divisions');
  }
}
