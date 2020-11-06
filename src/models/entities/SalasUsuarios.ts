import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Salas } from "./Salas";
import { Usuarios } from "./Usuarios";

@Entity("salas_usuarios", { schema: "public" })
export class SalasUsuarios {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @ManyToOne(() => Salas, (salas) => salas.salasUsuarios, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "sala_id", referencedColumnName: "id" }])
  sala: Salas;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.salasUsuarios, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
