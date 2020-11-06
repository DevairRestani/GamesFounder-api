import { Usuarios } from "../models/entities/Usuarios";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Usuarios)
class UsuarioRepository extends Repository<Usuarios> {
  public async ListAll(): Promise<Usuarios[] | null> {
    return (await this.ListAll()) || null;
  }

  public async ListAmigos(usuario_id: string): Promise<Usuarios[] | null> {
    return (await this.ListAmigos(usuario_id)) || null;
  }
}
