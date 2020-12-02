import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Conversas } from "./Conversa";
import { Feed } from "./Feed";
import { Grupo } from "./Grupo";
import { Jogo } from "./Jogo";
import { SalasUsuarios } from "./SalasUsuarios";

@Entity("usuarios", { schema: "public" })
export class Usuario {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "nick", nullable: true })
  nick: string | null;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("bytea", { name: "imagem", nullable: true })
  imagem: Buffer | null;

  @Column("date", { name: "data_nascimento" })
  dataNascimento: string;

  @Column("boolean", { name: "exibir_data_nascimento" })
  exibirDataNascimento: boolean;

  @Column("character varying", { name: "genero", nullable: true })
  genero: string | null;

  @Column("boolean", { name: "streamer" })
  streamer: boolean;

  @Column("character varying", { name: "link", nullable: true })
  link: string | null;

  @Column("timestamp without time zone", {
    name: "criado_em",
    default: () => "now()",
  })
  criadoEm: Date;

  @Column("timestamp without time zone", {
    name: "atualizado_em",
    default: () => "now()",
  })
  atualizadoEm: Date;

  @ManyToMany(() => Usuario)
  @JoinTable()
  amigos: Usuario[];

  @ManyToMany(() => Conversas)
  @JoinTable()
  conversas: Conversas[];

  @OneToMany(() => Feed, (feed) => feed.usuario)
  feeds: Feed[];

  @ManyToMany(() => Grupo, (grupo) => grupo.usuarios, { nullable: true })
  @JoinTable()
  grupos: Grupo[] | null;

  @ManyToMany(() => Jogo, (jogo) => jogo.usuarios, { nullable: true })
  @JoinTable()
  jogosFavoritos: Jogo[] | null;

  @OneToMany(() => SalasUsuarios, (salasUsuarios) => salasUsuarios.usuario, {
    nullable: true,
  })
  salasUsuarios: SalasUsuarios[] | null;
}
