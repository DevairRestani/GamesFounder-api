import { getRepository, ObjectID } from "typeorm";
import randToken from "rand-token";
import { hash } from "bcryptjs";

import { UsuariosContas } from "../models/entities/UsuariosContas";
import { Email } from "./Email.service";

class recuperarSenha {
    public async execute(email: string): Promise<UsuariosContas> {
        const UsuarioRepository = getRepository(UsuariosContas);

        let usuario = await UsuarioRepository.findOne({ email: email });

        if (!usuario) {
            throw new Error("Email inválido");
        }

        const token = randToken.generate(50);

        usuario.token = token;

        await UsuarioRepository.save(usuario);

        const emailSender = new Email();

        await emailSender.send({
            assunto: "recuperarSenha",
            conteudo: `<h1>Token</h1>
                        <a href='http://localhost:3333/recuperarSenha/Atualizar'></a>`,
            destinatario: email,
            html: true,
        });

        return usuario;
    }

    public async updateSenha(
        email: string,
        token: string,
        senha: string
    ): Promise<UsuariosContas> {
        const UsuarioRepository = getRepository(UsuariosContas);

        let usuario = await UsuarioRepository.findOne({
            email: email,
            token: token,
        });

        if (!usuario) {
            throw new Error("Não foi possivel atualizar a senha");
        }
        usuario.senha = await hash(senha, 8);
        usuario.token = null;

        await UsuarioRepository.save(usuario);

        return usuario;
    }
}

export default recuperarSenha;
