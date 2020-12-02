import {MigrationInterface, QueryRunner} from "typeorm";

export class CorrecaoDataJogo1606922884522 implements MigrationInterface {
    name = 'CorrecaoDataJogo1606922884522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."conversas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" TIMESTAMP NOT NULL DEFAULT now(), "mensagem" character varying NOT NULL, CONSTRAINT "PK_6a5fe997ccfd7074a2be8632499" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."salas_usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sala_id" uuid, "usuario_id" uuid, CONSTRAINT "PK_65bba2c1a109d9c2409a2defb79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."salas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chat_id" uuid, "jogo_id" uuid, CONSTRAINT "PK_91dc4234de08de42060e3a8e107" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."jogos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "genero" character varying NOT NULL, "ano" character varying, CONSTRAINT "PK_b2b4e1d74f9278cfc229ef9c8cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."grupos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, CONSTRAINT "PK_fcd2284cdca553a6aec30e51747" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nick" character varying, "nome" character varying NOT NULL, "imagem" bytea, "data_nascimento" date NOT NULL, "exibir_data_nascimento" boolean NOT NULL, "genero" character varying, "streamer" boolean NOT NULL, "link" character varying, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1d05b4e4456f2432ef0b3e82879" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."feeds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" TIMESTAMP NOT NULL DEFAULT now(), "conteudo" character varying NOT NULL, "usuarioId" uuid, CONSTRAINT "PK_5de2754410d5faf911934c3d428" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."usuarios_contas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "senha" character varying NOT NULL, "token" character varying, "usuarioId" uuid, CONSTRAINT "REL_ae136211a3910443b457546c2a" UNIQUE ("usuarioId"), CONSTRAINT "PK_1cc1cc8290215bb7ac9b6f1b093" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."usuarios_amigos_usuarios" ("usuariosId_1" uuid NOT NULL, "usuariosId_2" uuid NOT NULL, CONSTRAINT "PK_5d84481bcadbdc80bf51678d12a" PRIMARY KEY ("usuariosId_1", "usuariosId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_706ba701060351f2ae1236a9ed" ON "public"."usuarios_amigos_usuarios" ("usuariosId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_023b4064aa94fa4d4bec327fe6" ON "public"."usuarios_amigos_usuarios" ("usuariosId_2") `);
        await queryRunner.query(`CREATE TABLE "public"."usuarios_conversas_conversas" ("usuariosId" uuid NOT NULL, "conversasId" uuid NOT NULL, CONSTRAINT "PK_131a8572bd3312bf0d9efdd54db" PRIMARY KEY ("usuariosId", "conversasId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0dcd9565ae93918f6328940d1c" ON "public"."usuarios_conversas_conversas" ("usuariosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ad1d80b8f6a3d541b2b846dffb" ON "public"."usuarios_conversas_conversas" ("conversasId") `);
        await queryRunner.query(`CREATE TABLE "public"."usuarios_grupos_grupos" ("usuariosId" uuid NOT NULL, "gruposId" uuid NOT NULL, CONSTRAINT "PK_075a03516cd57ea6aed24e43205" PRIMARY KEY ("usuariosId", "gruposId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d7e0ff41dd549550eb845057a" ON "public"."usuarios_grupos_grupos" ("usuariosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7eab2a1069902ac88c955d8722" ON "public"."usuarios_grupos_grupos" ("gruposId") `);
        await queryRunner.query(`CREATE TABLE "public"."usuarios_jogos_favoritos_jogos" ("usuariosId" uuid NOT NULL, "jogosId" uuid NOT NULL, CONSTRAINT "PK_41f7bb440978f490d612ca9addc" PRIMARY KEY ("usuariosId", "jogosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35e6ceedfa7fb6ba77a42bab4a" ON "public"."usuarios_jogos_favoritos_jogos" ("usuariosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c70e1d3302c620231b8f4477db" ON "public"."usuarios_jogos_favoritos_jogos" ("jogosId") `);
        await queryRunner.query(`ALTER TABLE "public"."salas_usuarios" ADD CONSTRAINT "FK_f274ebca018442fa0cc61ce9636" FOREIGN KEY ("sala_id") REFERENCES "public"."salas"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."salas_usuarios" ADD CONSTRAINT "FK_c8935315d537171cabc45a05d67" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."salas" ADD CONSTRAINT "FK_51165da452023aa41cbb0060d88" FOREIGN KEY ("chat_id") REFERENCES "public"."grupos"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."salas" ADD CONSTRAINT "FK_0d6faab60e666ddc9cf1564097d" FOREIGN KEY ("jogo_id") REFERENCES "public"."jogos"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."feeds" ADD CONSTRAINT "FK_109905b29eb4cfcda65a7d97ad7" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_contas" ADD CONSTRAINT "FK_ae136211a3910443b457546c2a9" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_amigos_usuarios" ADD CONSTRAINT "FK_706ba701060351f2ae1236a9ede" FOREIGN KEY ("usuariosId_1") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_amigos_usuarios" ADD CONSTRAINT "FK_023b4064aa94fa4d4bec327fe6d" FOREIGN KEY ("usuariosId_2") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_conversas_conversas" ADD CONSTRAINT "FK_0dcd9565ae93918f6328940d1cf" FOREIGN KEY ("usuariosId") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_conversas_conversas" ADD CONSTRAINT "FK_ad1d80b8f6a3d541b2b846dffb0" FOREIGN KEY ("conversasId") REFERENCES "public"."conversas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_grupos_grupos" ADD CONSTRAINT "FK_7d7e0ff41dd549550eb845057a8" FOREIGN KEY ("usuariosId") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_grupos_grupos" ADD CONSTRAINT "FK_7eab2a1069902ac88c955d87221" FOREIGN KEY ("gruposId") REFERENCES "public"."grupos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_jogos_favoritos_jogos" ADD CONSTRAINT "FK_35e6ceedfa7fb6ba77a42bab4a4" FOREIGN KEY ("usuariosId") REFERENCES "public"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_jogos_favoritos_jogos" ADD CONSTRAINT "FK_c70e1d3302c620231b8f4477db6" FOREIGN KEY ("jogosId") REFERENCES "public"."jogos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."usuarios_jogos_favoritos_jogos" DROP CONSTRAINT "FK_c70e1d3302c620231b8f4477db6"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_jogos_favoritos_jogos" DROP CONSTRAINT "FK_35e6ceedfa7fb6ba77a42bab4a4"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_grupos_grupos" DROP CONSTRAINT "FK_7eab2a1069902ac88c955d87221"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_grupos_grupos" DROP CONSTRAINT "FK_7d7e0ff41dd549550eb845057a8"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_conversas_conversas" DROP CONSTRAINT "FK_ad1d80b8f6a3d541b2b846dffb0"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_conversas_conversas" DROP CONSTRAINT "FK_0dcd9565ae93918f6328940d1cf"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_amigos_usuarios" DROP CONSTRAINT "FK_023b4064aa94fa4d4bec327fe6d"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_amigos_usuarios" DROP CONSTRAINT "FK_706ba701060351f2ae1236a9ede"`);
        await queryRunner.query(`ALTER TABLE "public"."usuarios_contas" DROP CONSTRAINT "FK_ae136211a3910443b457546c2a9"`);
        await queryRunner.query(`ALTER TABLE "public"."feeds" DROP CONSTRAINT "FK_109905b29eb4cfcda65a7d97ad7"`);
        await queryRunner.query(`ALTER TABLE "public"."salas" DROP CONSTRAINT "FK_0d6faab60e666ddc9cf1564097d"`);
        await queryRunner.query(`ALTER TABLE "public"."salas" DROP CONSTRAINT "FK_51165da452023aa41cbb0060d88"`);
        await queryRunner.query(`ALTER TABLE "public"."salas_usuarios" DROP CONSTRAINT "FK_c8935315d537171cabc45a05d67"`);
        await queryRunner.query(`ALTER TABLE "public"."salas_usuarios" DROP CONSTRAINT "FK_f274ebca018442fa0cc61ce9636"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c70e1d3302c620231b8f4477db"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35e6ceedfa7fb6ba77a42bab4a"`);
        await queryRunner.query(`DROP TABLE "public"."usuarios_jogos_favoritos_jogos"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7eab2a1069902ac88c955d8722"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d7e0ff41dd549550eb845057a"`);
        await queryRunner.query(`DROP TABLE "public"."usuarios_grupos_grupos"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ad1d80b8f6a3d541b2b846dffb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0dcd9565ae93918f6328940d1c"`);
        await queryRunner.query(`DROP TABLE "public"."usuarios_conversas_conversas"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_023b4064aa94fa4d4bec327fe6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_706ba701060351f2ae1236a9ed"`);
        await queryRunner.query(`DROP TABLE "public"."usuarios_amigos_usuarios"`);
        await queryRunner.query(`DROP TABLE "public"."usuarios_contas"`);
        await queryRunner.query(`DROP TABLE "public"."feeds"`);
        await queryRunner.query(`DROP TABLE "public"."usuarios"`);
        await queryRunner.query(`DROP TABLE "public"."grupos"`);
        await queryRunner.query(`DROP TABLE "public"."jogos"`);
        await queryRunner.query(`DROP TABLE "public"."salas"`);
        await queryRunner.query(`DROP TABLE "public"."salas_usuarios"`);
        await queryRunner.query(`DROP TABLE "public"."conversas"`);
    }

}
