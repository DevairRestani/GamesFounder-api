import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import { UsuarioConta } from "../models/entities/UsuarioConta";
import { Usuario } from "../models/entities/Usuario";

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
  }: Request): Promise<UsuarioConta> {
    const UsuarioContaRepository = getRepository(UsuarioConta);
    const UsuariosRepository = getRepository(Usuario);

    if (!streamer && link) {
      throw new Error("Não foi possivel cadastrar o usuario");
    }

    const UsuarioExiste = await UsuarioContaRepository.findOne({
      where: { email },
    });

    if (UsuarioExiste) {
      throw new Error("O usuário já existe");
    }

    const Usuarios = UsuariosRepository.create({
      imagem,
      genero,
      dataNascimento,
      exibirDataNascimento,
      streamer,
      link,
      nome,
      nick,
    });

    let Usuarioalvo = await UsuariosRepository.save(Usuarios);

    if (!Usuarioalvo) {
      throw new Error("Não foi possivel salvar o usuario");
    }

    const hashedPassword = await hash(senha, 8);

    const ContaUsuario = UsuarioContaRepository.create({
      email,
      senha: hashedPassword,
      usuario: Usuarioalvo,
    });

    return await UsuarioContaRepository.save(ContaUsuario);
  }
}

export default CreateUsuariosServices;
