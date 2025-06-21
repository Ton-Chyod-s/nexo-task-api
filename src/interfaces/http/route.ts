import { Router } from 'express';
import { Controllers } from '@interfaces/controllers';
import { authenticateToken } from '@interfaces/middlewares/auth-middleware';
import { ForgotPasswordUseCase } from '@usecases/user/auth/ForgotPasswordUseCase';
import { PrismaUserRepository } from '@infrastructure/repositories/user-repositories';
import { NodemailerService } from '@infrastructure/services/NodemailerService';
import { ResetPasswordUseCase } from '@usecases/user/auth/ResetPasswordUseCase';

export const router  = Router();

// router.get('/', (req, res) => HomeController.welcome(req, res));    

router.post('/register', async (req, res) => {
    await Controllers.registerController.register(req, res);
});

router.post('/login', async (req, res) => {
    await Controllers.loginController.login(req, res);
});

router.post('/task', authenticateToken, async (req, res) => {
    await Controllers.createTaskController.create(req, res);
});

router.get('/tasks', authenticateToken, async (req, res) => {
    await Controllers.readAllTaskController.getAllTasks(req, res);
});

router.put('/task/:id', authenticateToken, async (req, res) => {
     await Controllers.updateTaskController.update(req, res);
});

const userRepo = new PrismaUserRepository();
const mailer = new NodemailerService();

const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepo, mailer);
const forgotPasswordController = new Controllers.forgotPasswordController(forgotPasswordUseCase);

router.post('/forgot-password', async (req, res) => {
  await forgotPasswordController.forgotPassword(req, res);
});

const resetPasswordUseCase = new ResetPasswordUseCase(userRepo);
const resetPasswordController = new Controllers.resetPasswordController(resetPasswordUseCase);

router.post('/reset-password', async (req, res) => {
    await resetPasswordController.resetPassword(req, res);
});
