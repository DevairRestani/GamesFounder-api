import { UsuariosContas } from "../models/entities/UsuariosContas";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UsuariosContas)
class UsuarioRepository extends Repository<UsuariosContas> {
	public async ListAll(): Promise<UsuariosContas[] | null> {
		return (await this.ListAll()) || null;
	}
}
