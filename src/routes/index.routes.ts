import { Router } from "express";
import loginRouter from "./login.routes";
import usuariosRouter from "./Usuarios.routes";
import recSenha from "./RecuperarSenha.routes";
import jogosRouter from "./jogos.routes";
import AmigoRuter from "./amigo.routes";

const routes = Router();

routes.use("/usuarios", usuariosRouter);
routes.use("/recuperarSenha", recSenha);
routes.use("/login", loginRouter);
<<<<<<< HEAD
routes.use("/jogos", jogosRouter);
=======
routes.get("/", (req, res) => {
  res.send("success");
});
routes.use("/jogos", jogosRouter);
routes.use("/amigo", AmigoRuter);
>>>>>>> 67401863b111468824ea0b7572cfc8dc102fab80

export default routes;
