import { Router } from "express";
import recuperarSenha from "../services/recuperarSenha";

const recSenha = Router();

recSenha
    .post("/Solicitar", async (req, res) => {
        try {
            const email = req.body.email;

            const solicitar = new recuperarSenha();

            const usuario = await solicitar.execute(email);

            return res.status(200).json(usuario);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })
    .post("/Atualizar", async (req, res) => {
        try {
            const { token, email, senha } = req.body;

            const solicitar = new recuperarSenha();

            const usuario = await solicitar.updateSenha(email, token, senha);

            return res.status(201).json(usuario);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    });

export default recSenha;
