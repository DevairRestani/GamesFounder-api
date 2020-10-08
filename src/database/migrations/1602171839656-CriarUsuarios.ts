import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarUsuarios1602171839656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "imagem",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "data_nascimento",
            type: "date",
            isNullable: false,
          },
          {
            name: "exibir_data_nascimento",
            type: "bool",
            isNullable: false,
          },
          {
            name: "genero",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "streamer",
            type: "bool",
            isNullable: false,
          },
          {
            name: "link",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "criado_em",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "atualizado_em",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios");
  }
}
