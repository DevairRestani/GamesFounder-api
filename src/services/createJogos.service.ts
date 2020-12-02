import { getRepository } from "typeorm";

import { Jogo } from "../models/entities/Jogo";

import JogosRepository from "../repositories/JogosRepository";
import jogosRouter from "../routes/jogos.routes";

interface Request {
  nome: string;
  genero: string;
  ano: Date | null;
}

class CreateJogosService {
  public async execute({ nome, genero, ano }: Request): Promise<Jogo> {
    const jogosRepository = getRepository(Jogo);

    const JogoExiste = await jogosRepository.findOne({
      where: { nome },
    });

    if (JogoExiste) {
      throw new Error("Jogo já cadastrado!");
    }

    const jogo = jogosRepository.create({
      nome,
      genero,
      ano,
    });

    let jogoSalvo = await jogosRepository.save(jogo);

    return jogoSalvo;
  }
}

export default CreateJogosService;
