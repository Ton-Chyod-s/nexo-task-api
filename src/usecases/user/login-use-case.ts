import bcrypt from "bcrypt";
import { IUserRepository } from "@domain/repositories/user-repository";
import { AuthService } from "@infrastructure/jwt/auth-service";
import { LoginResponseDTO } from "@domain/dtos/user/login-response-dto";

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private readonly authService: AuthService = new AuthService()
    ) {}

    async execute(email: string, password: string): Promise<LoginResponseDTO | null> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) return null;

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        const token = this.authService.generateToken(user.id?.toString() || "");

        return {
            id: user.id?.toString() || "",
            nome: user.nome,
            email: user.email,
            token
        };
    }
}