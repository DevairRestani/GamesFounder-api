import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import Usuario from '../models/Usuario';

interface Request {
    email: string;
    passord: string;
}

interface Response {
    usuarios: Usuario;
}

class AutenticacaoUserService {
    public async execute({ email, passord}: Request): Promise<Response> {
        const UsuarioRepository = getRepository(Usuario);

        const Usuario = await UsuarioRepository.findOne({ where: { email } });

        if (!Usuario){
            throw new Error('Email ou senha incorretos!');
        }
        const passordMatched = await compare(passord, Usuario.passord);

        if (!passordMatched){
            throw new Error('Email ou senha incorretos!');
        }

        return{
            Usuario,
        }
    }
}

export default AutenticacaoUserService;
