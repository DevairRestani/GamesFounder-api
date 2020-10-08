import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarSalasUsuarios1602180871533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "salas_usuarios",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "uuid",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "sala_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "usuario_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("salas_usuarios", [
      new TableForeignKey({
        columnNames: ["usuario_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "usuarios",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["sala_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "salas",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("salas_usuarios", "chat_id");
    await queryRunner.dropForeignKey("salas_usuarios", "usuario_id");

    await queryRunner.dropTable("salas_usuarios");
  }
}
