import { User } from "@domain/entities/user";
import { IUserRepository } from "@domain/repositories/user-repository";

export class CreateUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User): Promise<User> {

        if (!user.email) {
            throw new Error('E-mail required');
        }
        
        const existingByEmail = await this.userRepository.findByEmail(user.email);
        if (existingByEmail) {
            throw new Error('E-mail already registered');
        }

        const existingByName = await this.userRepository.findByName(user.nome);
        if (existingByName) {
            throw new Error('Name already registered');
        }

        return await this.userRepository.create(user);
    }
}
