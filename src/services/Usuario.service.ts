import { getRepository } from "typeorm";

import { Usuarios } from "../models/entities/Usuarios";
import { Amigos } from "../models/entities/Amigos";

interface Request {
  id: string;
  amigo_id: string;
}

class UsuarioService {
  public async execute({ id, amigo_id }: Request): Promise<Amigos> {
    const UsuarioRepository = getRepository(Usuarios);
    const AmigosRepository = getRepository(Amigos);

    const usuario = UsuarioRepository.findOne({ id });

    if (!usuario) {
      throw new Error("Usuario not found");
    }

    const amigo = UsuarioRepository.findOne({ id: amigo_id });

    if (!amigo) {
      throw new Error("Amigo not found");
    }

    const verificaAmizade = AmigosRepository.find({
      where: { usuario_id: id, amigo_id: amigo_id },
    });

    if (verificaAmizade) {
      throw new Error("Amigo already exists");
    }

    const amigos = AmigosRepository.create({
      usuario: usuario,
      amigo: amigo,
    });

    const retorno = await AmigosRepository.save(amigos);

    return retorno;
  }
}

export default UsuarioService;
