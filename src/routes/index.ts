import { Router } from "express";

import usuariosRouter from "./Usuarios.rotas";

const routes = Router();

routes.use('/usuarios', usuariosRouter);

export default routes;
