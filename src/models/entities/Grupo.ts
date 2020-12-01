import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Jogo } from "./Jogo";
import { Salas } from "./Sala";

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

  @ManyToOne(() => Jogo, (jogo) => jogo.grupos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "jogo_id", referencedColumnName: "id" }])
  jogo: Jogo;

  @OneToMany(() => Salas, (salas) => salas.chat)
  salas: Salas[];
}
