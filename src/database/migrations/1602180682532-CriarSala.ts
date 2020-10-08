import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarSala1602180682532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "salas",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "chat_id",
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

    await queryRunner.createForeignKeys("salas", [
      new TableForeignKey({
        columnNames: ["chat_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "grupos",
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
    await queryRunner.dropForeignKey("salas", "chat_id");
    await queryRunner.dropForeignKey("salas", "jogo_id");

    await queryRunner.dropTable("salas");
  }
}
