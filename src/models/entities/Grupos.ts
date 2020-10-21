import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Jogos } from "./Jogos";
import { Usuarios } from "./Usuarios";
import { Salas } from "./Salas";

@Entity("grupos", { schema: "public" })
export class Grupos {
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

  @ManyToOne(() => Jogos, (jogos) => jogos.grupos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "jogo_id", referencedColumnName: "id" }])
  jogo: Jogos;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.grupos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;

  @OneToMany(() => Salas, (salas) => salas.chat)
  salas: Salas[];
}
