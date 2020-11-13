import { Router } from "express";
import multer from "multer";

import CreateUsuariosService from "../services/createUsuario.service";

const usuariosRouter = Router();
const upload = multer();

const imagemLoad = upload.single("imagem");

usuariosRouter.post("/cadastrar", imagemLoad, async (req, res) => {
    try {
        const {
            email,
            senha,
            exibirDataNascimento,
            dataNascimento,
            genero,
            streamer,
            link,
            nome,
            nick,
        } = req.body;

        const imagem = req.file;

        const CreateUser = new CreateUsuariosService();

        const User = await CreateUser.execute({
            email,
            senha,
            imagem,
            dataNascimento,
            exibirDataNascimento,
            genero,
            streamer,
            link,
            nome,
            nick,
        });

        return res.json(User);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

export default usuariosRouter;
