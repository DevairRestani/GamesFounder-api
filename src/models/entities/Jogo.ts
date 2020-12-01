import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { Grupo } from "./Grupo";
import { Salas } from "./Sala";
import { Usuario } from "./Usuario";

@Entity("jogos", { schema: "public" })
<<<<<<< HEAD:src/models/entities/Jogos.ts
export class Jogos {
    @Column("uuid", {
        primary: true,
        name: "id",
        default: () => "uuid_generate_v4()",
    })
    id: string;
=======
export class Jogo {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;
>>>>>>> 67401863b111468824ea0b7572cfc8dc102fab80:src/models/entities/Jogo.ts

    @Column("character varying", { name: "nome" })
    nome: string;

    @Column("character varying", { name: "genero" })
    genero: string;

    @Column("date", { name: "ano", nullable: true })
    ano: Date | null;

<<<<<<< HEAD:src/models/entities/Jogos.ts
    @OneToMany(() => Grupos, (grupos) => grupos.jogo)
    grupos: Grupos[];

    @OneToMany(() => JogosFavoritos, (jogosFavoritos) => jogosFavoritos.jogo)
    jogosFavoritos: JogosFavoritos[];

    @OneToMany(() => Salas, (salas) => salas.jogo)
    salas: Salas[];
=======
  @OneToMany(() => Grupo, (grupos) => grupos.jogo)
  grupos: Grupo[];

  @OneToMany(() => Salas, (salas) => salas.jogo)
  salas: Salas[];

  @ManyToOne(() => Usuario, (usuario) => usuario.jogosFavoritos)
  usuario: Usuario;
>>>>>>> 67401863b111468824ea0b7572cfc8dc102fab80:src/models/entities/Jogo.ts
}
