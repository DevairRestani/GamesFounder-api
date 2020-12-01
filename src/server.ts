import express from "express";
import routes from "./routes/index.routes";

import "./database";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("(☞ﾟヮﾟ)☞ Server Iniciado ☜(ﾟヮﾟ☜)");
});
