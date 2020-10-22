import { query } from "express";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateModule1603291593077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'modules',
        columns:[
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
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
      await queryRunner.createForeignKey(
        'modules',
        new TableForeignKey({
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE'
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const modulesTable = await queryRunner.getTable('modules')
      
      const fkUser = modulesTable?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('userId') !== -1
      );
      if (fkUser) {
        await queryRunner.dropForeignKey('modules', fkUser);
      }
      await queryRunner.dropTable('modules')
    }

}
