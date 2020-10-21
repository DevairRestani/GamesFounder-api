import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Grupos } from "./Grupos";
import { Jogos } from "./Jogos";
import { SalasUsuarios } from "./SalasUsuarios";

@Entity("salas", { schema: "public" })
export class Salas {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @ManyToOne(() => Grupos, (grupos) => grupos.salas, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "chat_id", referencedColumnName: "id" }])
  chat: Grupos;

  @ManyToOne(() => Jogos, (jogos) => jogos.salas, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "jogo_id", referencedColumnName: "id" }])
  jogo: Jogos;

  @OneToMany(() => SalasUsuarios, (salasUsuarios) => salasUsuarios.sala)
  salasUsuarios: SalasUsuarios[];
}
