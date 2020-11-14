import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("usuarios_contas", { schema: "public" })
export class UsuariosContas {
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

    @Column("character varying", { name: "token" })
    token: string | null;

    @ManyToOne(() => Usuarios, (usuarios) => usuarios, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
    usuario: Usuarios;
}
