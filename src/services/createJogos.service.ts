import { getCustomRepository } from "typeorm";

import { Jogos } from "../models/entities/Jogos";

import JogosRepository from "../repositories/JogosRepository";
import jogosRouter from "../routes/jogos.routes";

interface Request {
    nome: string;
    genero: string;
    ano: Date | null;
}

class CreateJogosService {
    public async execute({ nome, genero, ano }: Request): Promise<Jogos> {
        const jogosRepository = getCustomRepository(JogosRepository);

        const JogoExiste = await jogosRepository.findOne({
            where: { nome },
        });

        if (JogoExiste) {
            throw new Error("Jogo já cadastrado!");
        }

        const Jogo = jogosRepository.create({
            nome,
            genero,
            ano,
        });

        let jogoSalvo = await jogosRepository.save(Jogo);

        if (!jogoSalvo) {
            throw new Error("Não foi possivel salvar o jogo!");
        }

        await jogosRepository.save(Jogo);

        return Jogo;
    }
}

export default CreateJogosService;
