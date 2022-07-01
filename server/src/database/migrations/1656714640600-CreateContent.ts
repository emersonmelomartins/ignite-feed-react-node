import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContent1656714640600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contents",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "post_id",
            type: "uuid",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "value",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "FK_ContentPost",
            referencedTableName: "posts",
            referencedColumnNames: ["id"],
            columnNames: ["post_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("contents");
  }
}
