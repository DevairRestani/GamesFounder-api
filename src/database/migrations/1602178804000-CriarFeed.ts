import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarFeed1602178804000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "feeds",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "usuario_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "data",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "conteudo",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "feeds",
      new TableForeignKey({
        columnNames: ["usuario_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("feeds", "usuario_id");

    await queryRunner.dropTable("feeds");
  }
}
