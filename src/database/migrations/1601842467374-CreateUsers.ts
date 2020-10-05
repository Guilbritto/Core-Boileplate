import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateUsers1601842467374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
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
            name: 'org_id',
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
    await queryRunner.dropForeignKey('users', 'div_id');
    await queryRunner.dropForeignKey('users', 'comp_id');
    await queryRunner.dropForeignKey('users', 'org_id');
    await queryRunner.dropTable('users');
  }
}
