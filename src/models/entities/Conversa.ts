import { Column, Entity } from "typeorm";

@Entity("conversas", { schema: "public" })
export class Conversas {
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

  @Column("character varying", { name: "mensagem" })
  mensagem: string;
}
