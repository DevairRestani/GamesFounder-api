import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import { UsuariosContas } from "../models/entities/UsuariosContas";
import { Usuarios } from "../models/entities/Usuarios";

interface Request {
    email: string;
    senha: string;
    dataNascimento: string;
    exibirDataNascimento: boolean;
    genero: string | null;
    streamer: boolean;
    link: string | null;
    imagem: object | null;
    nome: string;
    nick: string | null;
}

class CreateUsuariosServices {
    public async execute({
        email,
        senha,
        dataNascimento,
        exibirDataNascimento,
        genero,
        streamer,
        link,
        imagem,
        nome,
        nick,
    }: Request): Promise<UsuariosContas> {
        const UsuariosContasRepository = getRepository(UsuariosContas);
        const UsuarioRepository = getRepository(Usuarios);

        if (!streamer && link) {
            throw new Error("Não foi possivel cadastrar o usuario");
        }

        const UsuarioExiste = await UsuariosContasRepository.findOne({
            where: { email },
        });

        if (UsuarioExiste) {
            throw new Error("O usuário já existe");
        }

        const Usuario = UsuarioRepository.create({
            imagem,
            genero,
            dataNascimento,
            exibirDataNascimento,
            streamer,
            link,
            nome,
            nick,
        });

        let usuarioSalvo = await UsuarioRepository.save(Usuario);

        if (!usuarioSalvo) {
            throw new Error("Não foi possivel salvar o usuario");
        }

        const hashedPassword = await hash(senha, 8);

        const ContaUsuario = UsuariosContasRepository.create({
            email,
            senha: hashedPassword,
            usuario: usuarioSalvo,
        });

        return await UsuariosContasRepository.save(ContaUsuario);
    }
}

export default CreateUsuariosServices;
