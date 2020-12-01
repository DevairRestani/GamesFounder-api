import { Router } from "express";

import verificarAutenticado from "../middleware/verificarAutenticado";
import AmigoService from "../services/Amigo.service";

const usuariosRouter = Router();

usuariosRouter
  .post("/Adicionar", verificarAutenticado, async (req, res) => {
    try {
      const id = req.usuario.id;

      const { amigo_id } = req.body;

      const criarAmigo = new AmigoService();

      const amigos = await criarAmigo.adicionar({ id, amigo_id });

      return res.status(201).json(amigos);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  })
  .delete("/Excluir", verificarAutenticado, async (req, res) => {
    try {
      const id = req.usuario.id;

      const { amigo_id } = req.body;

      const criarAmigo = new AmigoService();

      const amigos = await criarAmigo.excluir({ id, amigo_id });

      return res.status(200).json(amigos);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  })
  .get("/Listar", verificarAutenticado, async (req, res) => {
    try {
      const id = req.usuario.id;

      const criarAmigo = new AmigoService();

      const amigos = await criarAmigo.listar(id);

      return res.status(200).json(amigos);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  });

export default usuariosRouter;
