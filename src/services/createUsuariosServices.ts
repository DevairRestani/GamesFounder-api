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
  imagem: string | null;
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
  }: Request): Promise<UsuariosContas> {
    const UsuariosContasRepository = getRepository(UsuariosContas);
    const UsuarioRepository = getRepository(Usuarios);

    const UsuarioExiste = await UsuariosContasRepository.findOne({
      where: { email },
    });

    if (UsuarioExiste) {
      throw new Error("Usuario already exists");
    }

    const Usuario = UsuarioRepository.create({
      imagem,
      genero,
      dataNascimento,
      exibirDataNascimento,
      streamer,
      link,
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

    UsuariosContasRepository.save(ContaUsuario);

    return ContaUsuario;
  }
}

export default CreateUsuariosServices;
