import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity("amigos", { schema: "public" })
export class Amigos {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.amigos)
  @JoinColumn([{ name: "amigos_id", referencedColumnName: "id" }])
  amigos: Usuarios;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.amigos2)
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
