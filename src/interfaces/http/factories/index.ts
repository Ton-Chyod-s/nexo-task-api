import { makeForgotPasswordController } from "./controllers/forgot-password-controller.factory";
import { makeResetPasswordController } from "./controllers/reset-password-controller.factory";


export const factories = {
  // Controllers
  makeResetPasswordController,
  makeForgotPasswordController,

}