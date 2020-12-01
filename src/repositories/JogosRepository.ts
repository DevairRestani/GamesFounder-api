import { EntityRepository, Repository } from "typeorm";

import { Jogos } from "../models/entities/Jogos";

@EntityRepository(Jogos)
class JogosRepository extends Repository<Jogos> {
    public async ListAll(): Promise<Jogos[] | null> {
        return (await this.ListAll()) || null;
    }

    public async ListJogos(jogo_nome: string): Promise<Jogos> {
        const jogo = await this.findOne(jogo_nome);

        if (!jogo) {
            throw new Error("Não existe esse jogo!");
        }

        return jogo || null;
    }
}

export default JogosRepository;
