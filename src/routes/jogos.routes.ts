import { Router } from "express";

import CreateJogosService from "../services/createJogos.service";

const jogosRouter = Router();

jogosRouter
  .post("/novo", async (Request, Response) => {
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
