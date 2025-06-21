import { Request, Response } from 'express';
import { PrismaTaskRepository } from '@infrastructure/repositories/task-repositories';
import { UpdateTaskUseCase } from '@usecases/task/update-task-use-case';
import { UpdateTaskDTO } from '@domain/dtos/task/update-task-dto';

export class UpdateTaskController {
    static async update(req: Request, res: Response) {
        try {
            const taskId = req.params.id;
            const taskData = UpdateTaskController.extractTaskData(req.body);

            if (Object.keys(taskData).length === 0) {
                return res.status(400).json({ message: 'At least one field must be provided to update the task.' });
            }

            const updatedTask = await UpdateTaskController.updateTask(taskId, taskData);
            
            if (!updatedTask) {
                return res.status(404).json({ message: 'Failed to update task' });
            }

            return res.status(200).json(updatedTask);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    private static extractTaskData(body: any): Partial<UpdateTaskDTO> {
        const { titulo, descricao, dataPrevista, prioridade, status } = body;
        const taskData: Partial<UpdateTaskDTO> = {};

        if (titulo !== undefined) taskData.titulo = titulo;
        if (descricao !== undefined) taskData.descricao = descricao;
        if (dataPrevista !== undefined) taskData.dataPrevista = dataPrevista;
        if (prioridade !== undefined) taskData.prioridade = prioridade;
        if (status !== undefined) taskData.status = status;

        return taskData;
    }

    private static async updateTask(taskId: string, taskData: Partial<UpdateTaskDTO>) {
        const taskRepository = new PrismaTaskRepository();
        const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

        return await updateTaskUseCase.execute(Number(taskId), taskData);
    }
}
