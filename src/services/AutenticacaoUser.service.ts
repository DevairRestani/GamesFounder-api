import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

import { UsuarioConta } from "../models/entities/UsuarioConta";

interface Request {
  email: string;
  senha: string;
}

interface Response {
  token: string;
}

class AutenticacaoUserService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const UsuarioRepository = getRepository(UsuarioConta);

    const usuario = await UsuarioRepository.findOne({
      where: { email: email },
      relations: ["usuario"],
    });

    if (!usuario) {
      throw new Error("Email ou senha incorretos!");
    }
    const passordMatched = await compare(senha, usuario.senha);

    if (!passordMatched) {
      throw new Error("Email ou senha incorretos!");
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.usuario.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { token };
  }
}

export default AutenticacaoUserService;
