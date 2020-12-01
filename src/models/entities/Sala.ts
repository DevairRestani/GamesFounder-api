import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Grupo } from "./Grupo";
import { Jogo } from "./Jogo";
import { SalasUsuarios } from "./SalasUsuarios";

@Entity("salas", { schema: "public" })
export class Salas {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @ManyToOne(() => Grupo, (grupo) => grupo.salas, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "chat_id", referencedColumnName: "id" }])
  chat: Grupo;

  @ManyToOne(() => Jogo, (jogo) => jogo.salas, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "jogo_id", referencedColumnName: "id" }])
  jogo: Jogo;

  @OneToMany(() => SalasUsuarios, (salasUsuarios) => salasUsuarios.sala)
  salasUsuarios: SalasUsuarios[];
}
