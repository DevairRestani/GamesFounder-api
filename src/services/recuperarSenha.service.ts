import { getRepository, ObjectID } from "typeorm";
import randToken from "rand-token";
import { hash } from "bcryptjs";

import { UsuarioConta } from "../models/entities/UsuarioConta";
import { Email } from "./Email.service";

class recuperarSenha {
  public async execute(email: string): Promise<UsuarioConta> {
    const UsuarioRepository = getRepository(UsuarioConta);

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
      conteudo:
        `<h1>Token</h1>
                        <p>` +
        usuario.token +
        `</p>`,
      destinatario: email,
    });

    return usuario;
  }

  public async updateSenha(
    email: string,
    token: string,
    senha: string
  ): Promise<UsuarioConta> {
    const UsuarioRepository = getRepository(UsuarioConta);

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
