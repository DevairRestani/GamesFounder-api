import { Usuarios } from "../models/entities/Usuarios";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Usuarios)
export class UsuarioRepository extends Repository<Usuarios> {
  public async ListAll(): Promise<Usuarios[] | null> {
    return (await this.ListAll()) || null;
  }

  public async ListAmigos(usuario_id: string): Promise<Usuarios | null> {
    const usuario = await await this.findOne(usuario_id);

    if (!usuario) {
      throw new Error("Usuario não encontrado");
    }

    return usuario || null;
  }
}
