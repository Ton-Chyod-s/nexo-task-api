import { Request, Response } from "express";
import { PrismaUserRepository } from "@infrastructure/repositories/user-repositories";
import { LoginUseCase } from "@usecases/user/login-use-case";

export class LoginController {
    static async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const userRepository = new PrismaUserRepository();
        const loginUseCase = new LoginUseCase(userRepository);
        
        try {
            const result = await loginUseCase.execute(email, senha);

            if (!result) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: result.id,
                    nome: result.nome,
                    email: result.email
                },
                token: result.token
            });
        } catch (error: any) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}