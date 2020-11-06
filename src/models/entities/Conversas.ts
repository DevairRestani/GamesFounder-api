import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuarios";

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

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.conversas, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id_destinatario", referencedColumnName: "id" }])
  usuarioIdDestinatario: Usuarios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.conversas2, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id_remetente", referencedColumnName: "id" }])
  usuarioIdRemetente: Usuarios;
}
