import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("feeds", { schema: "public" })
export class Feeds {
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

  @Column("character varying", { name: "conteudo" })
  conteudo: string;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.feeds, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
