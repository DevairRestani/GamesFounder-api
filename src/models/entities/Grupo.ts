import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Jogo } from "./Jogo";
import { Salas } from "./Sala";
import { Usuario } from "./Usuario";

@Entity("grupos", { schema: "public" })
export class Grupo {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("timestamp without time zone", {
    name: "data",
    default: () => "now()",
  })
  data: Date;

  @Column("character varying", { name: "message" })
  message: string;

  @ManyToMany(() => Jogo, (jogo) => jogo.grupos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    nullable: true,
  })
  @JoinColumn([{ name: "jogo_id", referencedColumnName: "id" }])
  jogo: Jogo | null;

  @OneToMany(() => Salas, (salas) => salas.chat)
  salas: Salas[];

  @ManyToMany(() => Usuario, (usuario) => usuario.grupos, { nullable: true })
  usuarios: Usuario | null;
}
