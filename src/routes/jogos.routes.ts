import { Response, Router } from "express";
import { getCustomRepository } from "typeorm";
import { Jogos } from "../models/entities/Jogos";

import JogosRepository from "../repositories/JogosRepository";
import CreateJogosService from "../services/createJogos.service";

const jogosRouter = Router();

<<<<<<< HEAD
jogosRouter.get("/novo", (Request, Response) => {
    const jogosRepository = getCustomRepository(JogosRepository);
    const jogos = jogosRepository.find();

    return Response.json(jogos);
});

jogosRouter.post("/novo", async (Request, Response) => {
=======
jogosRouter
  .post("/novo", async (Request, Response) => {
>>>>>>> 67401863b111468824ea0b7572cfc8dc102fab80
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
  })
  .get("/novo", (req, res) => {
    return res.status(200).json({ message: "jopgos" });
  });

export default jogosRouter;
