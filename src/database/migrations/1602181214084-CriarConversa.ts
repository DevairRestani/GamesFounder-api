import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarConversa1602181214084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "conversas",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "usuario_id_remetente",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "usuario_id_destinatario",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "data",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "mensagem",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("conversas", [
      new TableForeignKey({
        columnNames: ["usuario_id_remetente"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["usuario_id_destinatario"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("conversas", "usuario_id_remetente");
    await queryRunner.dropForeignKey(
      "salas_usuarios",
      "usuario_id_destinatario"
    );

    await queryRunner.dropTable("conversas");
  }
}
