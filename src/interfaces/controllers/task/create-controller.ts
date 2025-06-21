import { Request, Response } from "express";
import { CreateTaskUseCase } from "@usecases/task/create-use-case";
import { PrismaTaskRepository } from "@infrastructure/repositories/task-repositories";

export class CreateTaskController {
    static async create(req: Request, res: Response) {
        const { titulo, descricao, dataPrevista, prioridade } = req.body;
        
        if (!titulo || !descricao || !dataPrevista || !prioridade) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const usuarioId = req.user?.id;
        
        if (!usuarioId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const taskRepository = new PrismaTaskRepository(); 
        const createTaskUseCase = new CreateTaskUseCase(taskRepository);
        
        try {
            const task = await createTaskUseCase.execute({
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