import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarUsuarioConta1602177827573 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios_contas",
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
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "senha",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "usuarios_contas",
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
    await queryRunner.dropForeignKey("usuarios_contas", "usuario_id");

    await queryRunner.dropTable("usuarios_contas");
  }
}
