import { Response, Router } from "express";
import { getCustomRepository } from "typeorm";
import { Jogos } from "../models/entities/Jogos";

import JogosRepository from "../repositories/JogosRepository";
import CreateJogosService from "../services/createJogos.service";

const jogosRouter = Router();

jogosRouter.get("/novo", (Request, Response) => {
    const jogosRepository = getCustomRepository(JogosRepository);
    const jogos = jogosRepository.find();

    return Response.json(jogos);
});

jogosRouter.post("/novo", async (Request, Response) => {
    try {
        const { nome, genero, ano } = Request.body;

        const CreateJogo = new CreateJogosService();

        const Jogo = await CreateJogo.execute({
            nome,
            genero,
            ano,
        });

        return Response.json(Jogo);
    } catch (err) {
        return Response.status(400).json({ message: err.message });
    }
});

export default jogosRouter;
