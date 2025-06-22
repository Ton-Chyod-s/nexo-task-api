import { Usuario } from "@prisma/client";
import { Prioridade } from '@prisma/client';

export class Task {
    public id?: number;
    public createdAt?: Date;
    public usuario?: Usuario;  

    constructor(
        public titulo: string,
        public descricao: string | null,
        public dataPrevista: Date,
        public prioridade: Prioridade,
        public status: boolean,
        usuario?: Usuario,  
        id?: number,
        createdAt?: Date
    ) {
        if (id) this.id = id;
        if (createdAt) this.createdAt = createdAt;
        if (usuario) this.usuario = usuario; 
    }
}
