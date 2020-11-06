import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarGrupo1602180370281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "grupos",
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
            name: "jogo_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "data",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "message",
            type: "varchar",
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("grupos", [
      new TableForeignKey({
        columnNames: ["usuario_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["jogo_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "jogos",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("grupos", "usuario_id");
    await queryRunner.dropForeignKey("grupos", "jogo_id");

    await queryRunner.dropTable("grupos");
  }
}
