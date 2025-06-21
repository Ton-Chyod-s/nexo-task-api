import { authLoginDoc } from "./auth/auth-login.doc";
import { authRegisterDoc } from "./auth/auth-register.doc";

export const swaggerPaths = {
    ...authRegisterDoc,
    ...authLoginDoc
};