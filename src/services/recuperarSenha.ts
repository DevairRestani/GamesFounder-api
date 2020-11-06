import { getRepository, ObjectID } from "typeorm";
import emailValidator from "email-validator";
import { hash } from "bcryptjs";

import { UsuariosContas } from "../models/entities/UsuariosContas";
import { Email } from "./Email";

interface Params {
  email: string;
}

class recuperarSenha {
  private UsuarioRepository = getRepository(UsuariosContas);

  private async verifyEmail(email: string): Promise<UsuariosContas | null> {
    if (!emailValidator.validate(email)) {
      throw new Error("Email inválido");
    }

    const User = await this.UsuarioRepository.findOne({ email: email });

    if (!User) {
      return null;
    }

    return User;
  }

  public async execute({ email }: Params): Promise<UsuariosContas> {
    let usuario = await this.verifyEmail(email);

    if (!usuario) {
      throw new Error("Email inválido");
    }

    const token = Math.random().toString(50);

    usuario.token = token;

    await this.UsuarioRepository.save(usuario);

    const emailSender = new Email();

    await emailSender.send({
      assunto: "recuperarSenha",
      conteudo: "token: " + usuario.token,
      destinatario: email,
    });

    return usuario;
  }

  public async updateSenha(
    email: string,
    token: string,
    senha: string
  ): Promise<UsuariosContas> {
    let usuario = await this.UsuarioRepository.findOne({
      email: email,
      token: token,
    });

    if (!usuario) {
      throw new Error("Não foi possivel atualizar a senha");
    }
    usuario.senha = await hash(senha, 8);
    usuario.token = null;

    await this.UsuarioRepository.save(usuario);

    return usuario;
  }
}

export default recuperarSenha;
