import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Grupo } from "./Grupo";
import { Salas } from "./Sala";
import { Usuario } from "./Usuario";

@Entity("jogos", { schema: "public" })
export class Jogo {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "nome" })
  nome: string;

  @Column("character varying", { name: "genero" })
  genero: string;

  @Column("character varying", { name: "ano", nullable: true })
  ano: string | null;

  @OneToMany(() => Grupo, (grupos) => grupos.jogo)
  grupos: Grupo[];

  @OneToMany(() => Salas, (salas) => salas.jogo)
  salas: Salas[];

  @ManyToMany(() => Usuario, (usuario) => usuario.jogosFavoritos, {
    nullable: true,
  })
  usuarios: Usuario[] | null;
}
