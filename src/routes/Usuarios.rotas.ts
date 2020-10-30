import { Router } from "express";

import CreateUsuariosService from "../services/createUsuariosServices";

const usuariosRouter = Router();

usuariosRouter.post("/", async (req, res) => {
  try {
    const {
      email,
      senha,
      imagem,
      exibirDataNascimento,
      dataNascimento,
      genero,
      streamer,
      link,
    } = req.body;

    const CreateUser = new CreateUsuariosService();

    const User = CreateUser.execute({
      email,
      senha,
      imagem,
      dataNascimento,
      exibirDataNascimento,
      genero,
      streamer,
      link,
    });

    return res.json(User);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default usuariosRouter;
