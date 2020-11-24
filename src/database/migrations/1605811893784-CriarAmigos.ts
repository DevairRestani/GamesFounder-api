import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriarAmigos1605811893784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "amigos",
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
            name: "amigos_id",
            type: "uuid",
            isNullable: true,
          },
        ],
      })
    );

    const usuariofk = new TableForeignKey({
      columnNames: ["usuario_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "usuarios",
    });

    const amigosfk = new TableForeignKey({
      columnNames: ["amigos_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "usuarios",
    });

    await queryRunner.createForeignKey("amigos", usuariofk);
    await queryRunner.createForeignKey("amigos", amigosfk);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
