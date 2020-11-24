import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import { Jogos } from "../models/entities/Jogos";

interface Request {
    nome: string;
    genero: string;
    ano: string | null;
}

class CreateJogosService {
    public async execute({ nome, genero, ano }: Request): Promise<Jogos> {
        const JogosRepository = getRepository(Jogos);

        const JogoExiste = await JogosRepository.findOne({
            where: { nome },
        });

        if (JogoExiste) {
            throw new Error("Jogo já cadastrado!");
        }

        const Jogo = JogosRepository.create({
            nome,
            genero,
            ano,
        });

        let jogoSalvo = await JogosRepository.save(Jogo);

        if (!jogoSalvo) {
            throw new Error("Não foi possivel salvar o jogo!");
        }

        return await JogosRepository.save(Jogo);
    }
}

export default CreateJogosService;
