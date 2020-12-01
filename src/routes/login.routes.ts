import { Router } from "express";

import AutenticacaoUserService from "../services/AutenticacaoUser.service";

const loginRouter = Router();

loginRouter.post("/", async (request, response) => {
  try {
    const { email, senha } = request.body;

    const autenticacaoUser = new AutenticacaoUserService();

    const { token } = await autenticacaoUser.execute({
      email,
      senha,
    });

    return response.json({ token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default loginRouter;
