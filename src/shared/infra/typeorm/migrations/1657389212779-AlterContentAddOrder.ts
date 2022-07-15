import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterContentAddOrder1657389212779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "contents",
      new TableColumn({
        name: "order",
        type: "int",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("contents", "order");
  }
}
