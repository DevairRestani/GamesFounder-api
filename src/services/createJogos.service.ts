import { getRepository } from "typeorm";

import { Jogo } from "../models/entities/Jogo";

interface Request {
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

    let jogoSalvo = await JogosRepository.save(Jogos);

    if (!jogoSalvo) {
      throw new Error("Não foi possivel salvar o jogo!");
    }

    return await JogosRepository.save(Jogos);
  }
}

export default CreateJogosService;
