import { Router } from "express";
import loginRouter from "./login.routes";
import usuariosRouter from "./Usuarios.routes";
import recSenha from "./RecuperarSenha.routes";
import jogosRouter from "./jogos.routes";

const routes = Router();

routes.use("/usuarios", usuariosRouter);
routes.use("/recuperarSenha", recSenha);
routes.use("/login", loginRouter);
routes.get("/", (req, res) => {
  res.send("success");
});
routes.use("/novo", jogosRouter);

export default routes;
