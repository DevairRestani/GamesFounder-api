import { getRepository } from "typeorm";

import { Jogo } from "../models/entities/Jogo";

interface Request {
  nome: string;
  genero: string;
  ano: string | null;
}

class CreateJogosService {
  public async execute({ nome, genero, ano }: Request): Promise<Jogo> {
    const jogosRepository = getRepository(Jogo);

    const JogoExiste = await jogosRepository.findOne({
      where: { nome, genero, ano },
    });

    if (JogoExiste) {
      throw new Error("Jogo já cadastrado!");
    }

    if (!ano) {
      throw new Error("Insira um ano");
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
