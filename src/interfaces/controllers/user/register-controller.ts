import { Request, Response } from "express";
import { CreateUseCase } from "@usecases/user/create-use-case";
import { AuthService } from "@infrastructure/jwt/auth-service";
import { hashPassword } from "@utils/password-generator";
import { UsuarioDTO } from "@domain/dtos/user/register-request-dto";

export class RegisterController {
    constructor(
        private readonly createUseCase: CreateUseCase,
        private readonly authService: AuthService
    ) {}

    async register(req: Request, res: Response): Promise<Response> {
        const dados: UsuarioDTO = req.body;

        if (dados.senha !== dados.confirmSenha) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!dados.nome || !dados.email || !dados.senha) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await hashPassword(dados.senha);

        if (!hashedPassword) {
            return res.status(500).json({ message: "Error hashing password" });
        }
        
        try {
            const user = await this.createUseCase.execute({ nome: dados.nome, email: dados.email, passwordHash: hashedPassword });
            
            const token = this.authService.generateToken(user.id?.toString() || "");
 
            return res.status(201).json({
                message: "User registered successfully",
                user: { id: user.id, nome: user.nome, email: user.email },
                token: token
            });
        } catch (error: any) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
