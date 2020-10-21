import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Jogos } from "./Jogos";
import { Usuarios } from "./Usuarios";

@Entity("jogos_favoritos", { schema: "public" })
export class JogosFavoritos {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @ManyToOne(() => Jogos, (jogos) => jogos.jogosFavoritos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "jogo_id", referencedColumnName: "id" }])
  jogo: Jogos;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.jogosFavoritos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuarios;
}
