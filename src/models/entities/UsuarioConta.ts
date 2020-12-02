import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("usuarios_contas", { schema: "public" })
export class UsuarioConta {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "senha" })
  senha: string;

  @Column("character varying", { name: "token", nullable: true })
  token: string | null;

  @OneToOne(() => Usuario, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  usuario: Usuario;
}
