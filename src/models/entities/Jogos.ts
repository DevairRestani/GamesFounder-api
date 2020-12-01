import { Column, Entity, OneToMany } from "typeorm";
import { Grupos } from "./Grupos";
import { JogosFavoritos } from "./JogosFavoritos";
import { Salas } from "./Salas";

@Entity("jogos", { schema: "public" })
export class Jogos {
    @Column("uuid", {
        primary: true,
        name: "id",
        default: () => "uuid_generate_v4()",
    })
    id: string;

    @Column("character varying", { name: "nome" })
    nome: string;

    @Column("character varying", { name: "genero" })
    genero: string;

    @Column("date", { name: "ano", nullable: true })
    ano: Date | null;

    @OneToMany(() => Grupos, (grupos) => grupos.jogo)
    grupos: Grupos[];

    @OneToMany(() => JogosFavoritos, (jogosFavoritos) => jogosFavoritos.jogo)
    jogosFavoritos: JogosFavoritos[];

    @OneToMany(() => Salas, (salas) => salas.jogo)
    salas: Salas[];
}
