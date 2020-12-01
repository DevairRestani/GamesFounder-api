import { getRepository } from "typeorm";

import { Usuario } from "../models/entities/Usuario";

interface Request {
  id: string;
  amigo_id: string;
}

class AmigoService {
  public async adicionar({ id, amigo_id }: Request): Promise<Usuario[]> {
    const UsuarioRepository = getRepository(Usuario);

    let usuario = await UsuarioRepository.findOne({
      select: ["id"],
      relations: ["amigos"],
      where: { id: id },
    });

    if (!usuario) {
      throw new Error("Usuario não encontrado.");
    }

    const amigo = await UsuarioRepository.findOne({
      where: { id: amigo_id },
      select: ["id"],
    });

    if (!amigo) {
      throw new Error("Amigo não encontrado.");
    }

    const verificarAmizade = usuario.amigos.filter((a) => a.id === amigo.id);

    if (verificarAmizade.length > 0) {
      throw new Error("Voces já são amigos.");
    }

    usuario.amigos.push(amigo);

    usuario = await UsuarioRepository.save(usuario);

    return usuario.amigos;
  }

  public async excluir({ id, amigo_id }: Request): Promise<Usuario[]> {
    const UsuarioRepository = getRepository(Usuario);

    let usuario = await UsuarioRepository.findOne({
      where: { id },
      select: ["id"],
      relations: ["amigos"],
    });

    if (!usuario) {
      throw new Error("Usuario não encontrado.");
    }

    const amigo = await UsuarioRepository.findOne({
      where: { id: amigo_id },
      select: ["id"],
    });

    if (!amigo) {
      throw new Error("Amigo não encontrado.");
    }

    usuario.amigos = usuario.amigos.filter((amig) => {
      amig.id !== amigo.id;
    });

    usuario = await UsuarioRepository.save(usuario);

    return usuario.amigos;
  }

  public async listar(id: string): Promise<Usuario[]> {
    const UsuarioRepository = getRepository(Usuario);

    const usuario = await UsuarioRepository.findOne({
      select: ["id"],
      where: { id: id },
      relations: ["amigos"],
    });

    if (!usuario) {
      throw new Error("Usuario não encontrado.");
    }

    return usuario.amigos;
  }
}

export default AmigoService;
