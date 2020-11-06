import { JogosFavoritos } from "../models/entities/JogosFavoritos";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(JogosFavoritos)
class JogosFavoritosRepository extends Repository<JogosFavoritos> {
  public async ListAll(): Promise<JogosFavoritos[] | null> {
    return (await this.ListAll()) || null;
  }

  public async ListGames(usuario_id: string): Promise<JogosFavoritos[] | null> {
    return (await this.ListGames(usuario_id)) || null;
  }
}

export default JogosFavoritosRepository;
