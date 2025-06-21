import { Request, Response } from "express";
import { CreateTaskUseCase } from "@usecases/task/create-use-case";

export class CreateTaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        const { titulo, descricao, dataPrevista, prioridade } = req.body;
        
        if (!titulo || !descricao || !dataPrevista || !prioridade) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const usuarioId = req.user?.id;
        
        if (!usuarioId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        try {
            const task = await this.createTaskUseCase.execute({
                titulo,
                descricao,
                dataPrevista,
                prioridade,
                status: true,
                usuarioId: Number(usuarioId)
            });

            return res.status(201).json({ message: "Task successfully created!", task });
        } catch (error: any) {
            return res.status(500).json({ message: "Error creating task", error: error.message });
        }
    }
}