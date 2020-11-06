import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarJogosFavoritos1602179681979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "jogos_favoritos",
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
        ],
      })
    );

    await queryRunner.createForeignKeys("jogos_favoritos", [
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
    await queryRunner.dropForeignKey("jogos_favoritos", "usuario_id");
    await queryRunner.dropForeignKey("jogos_favoritos", "jogo_id");

    await queryRunner.dropTable("jogos_favoritos");
  }
}
