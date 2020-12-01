import { Column, Entity, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("feeds", { schema: "public" })
export class Feed {
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

  @ManyToOne(() => Usuario, (usuario) => usuario.feeds, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  usuario: Usuario;
}
