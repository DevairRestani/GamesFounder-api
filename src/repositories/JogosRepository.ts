import { EntityRepository, Repository } from "typeorm";

import { Jogo } from "../models/entities/Jogo";

@EntityRepository(Jogo)
class JogosRepository extends Repository<Jogo> {
  public async ListAll(): Promise<Jogo[] | null> {
    return (await this.ListAll()) || null;
  }

  public async ListJogos(jogo_nome: string): Promise<Jogo> {
    const jogo = await this.findOne(jogo_nome);

    if (!jogo) {
      throw new Error("Não existe esse jogo!");
    }

    return jogo || null;
  }
}

export default JogosRepository;
