import { Router } from 'express';

import loginRouter from './login.routes';

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello Word" });
});

routes.use('/login', loginRouter);

export default routes;
