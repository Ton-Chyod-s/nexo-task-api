import { authLoginDoc } from "./auth/auth-login.doc";
import { authRegisterDoc } from "./auth/auth-register.doc";
import { taskDoc } from "./task/task-doc.doc";

export const swaggerPaths = {
    ...authRegisterDoc,
    ...authLoginDoc,
    ...taskDoc
};