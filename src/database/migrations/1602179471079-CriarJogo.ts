import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarJogo1602179471079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "jogos",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "nome",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "genero",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "ano",
            type: "date",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("jogos");
  }
}
