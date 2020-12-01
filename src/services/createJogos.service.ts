<<<<<<< HEAD
import { getCustomRepository } from "typeorm";
=======
import { getRepository } from "typeorm";
>>>>>>> 67401863b111468824ea0b7572cfc8dc102fab80

import { Jogo } from "../models/entities/Jogo";

import JogosRepository from "../repositories/JogosRepository";
import jogosRouter from "../routes/jogos.routes";

interface Request {
<<<<<<< HEAD
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
=======
  nome: string;
  genero: string;
  ano: string | null;
}

class CreateJogosService {
  public async execute({ nome, genero, ano }: Request): Promise<Jogo> {
    const JogosRepository = getRepository(Jogo);

    const JogoExiste = await JogosRepository.findOne({
      where: { nome },
    });

    if (JogoExiste) {
      throw new Error("Jogo já cadastrado!");
    }

    const Jogos = JogosRepository.create({
      nome,
      genero,
      ano,
    });
>>>>>>> 67401863b111468824ea0b7572cfc8dc102fab80

    let jogoSalvo = await JogosRepository.save(Jogos);

<<<<<<< HEAD
        await jogosRepository.save(Jogo);

        return Jogo;
=======
    if (!jogoSalvo) {
      throw new Error("Não foi possivel salvar o jogo!");
>>>>>>> 67401863b111468824ea0b7572cfc8dc102fab80
    }

    return await JogosRepository.save(Jogos);
  }
}

export default CreateJogosService;
