import { Column, Entity, OneToMany } from "typeorm";
import { Conversas } from "./Conversas";
import { Feeds } from "./Feeds";
import { Grupos } from "./Grupos";
import { JogosFavoritos } from "./JogosFavoritos";
import { SalasUsuarios } from "./SalasUsuarios";
import { UsuariosContas } from "./UsuariosContas";

@Entity("usuarios", { schema: "public" })
export class Usuarios {
    @Column("uuid", {
        primary: true,
        name: "id",
        default: () => "uuid_generate_v4()",
    })
    id: string;

    @Column("character varying", { name: "nick", nullable: true })
    nick: string | null;

    @Column("character varying", { name: "nome" })
    nome: string;

    @Column("bytea", { name: "imagem", nullable: true })
    imagem: Buffer | null;

    @Column("date", { name: "data_nascimento" })
    dataNascimento: string;

    @Column("boolean", { name: "exibir_data_nascimento" })
    exibirDataNascimento: boolean;

    @Column("character varying", { name: "genero", nullable: true })
    genero: string | null;

    @Column("boolean", { name: "streamer" })
    streamer: boolean;

    @Column("character varying", { name: "link", nullable: true })
    link: string | null;

    @Column("timestamp without time zone", {
        name: "criado_em",
        default: () => "now()",
    })
    criadoEm: Date;

    @Column("timestamp without time zone", {
        name: "atualizado_em",
        default: () => "now()",
    })
    atualizadoEm: Date;

    @OneToMany(() => Conversas, (conversas) => conversas.usuarioIdDestinatario)
    conversas: Conversas[];

    @OneToMany(() => Conversas, (conversas) => conversas.usuarioIdRemetente)
    conversas2: Conversas[];

    @OneToMany(() => Feeds, (feeds) => feeds.usuario)
    feeds: Feeds[];

    @OneToMany(() => Grupos, (grupos) => grupos.usuario)
    grupos: Grupos[];

    @OneToMany(() => JogosFavoritos, (jogosFavoritos) => jogosFavoritos.usuario)
    jogosFavoritos: JogosFavoritos[];

    @OneToMany(() => SalasUsuarios, (salasUsuarios) => salasUsuarios.usuario)
    salasUsuarios: SalasUsuarios[];

    @OneToMany(() => UsuariosContas, (usuariosContas) => usuariosContas.usuario)
    amigos: UsuariosContas[];
}
