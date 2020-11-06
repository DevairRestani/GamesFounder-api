import { Router } from 'express';

import AutenticacaoUserService from '../services/AutenticacaoUserService';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const autenticacaoUser = new AutenticacaoUserService();

        const usuario = await autenticacaoUser.execute({
            email,
            password,
        })

        return response.json({ usuario });
} catch (err) {
    return response.status(400).json({ error: err.message});
}
});

export default loginRouter;
