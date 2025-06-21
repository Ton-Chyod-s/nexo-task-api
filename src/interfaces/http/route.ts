import { Router } from 'express';
import { Controllers } from '@interfaces/controllers';
import { authenticateToken } from '@interfaces/middlewares/auth-middleware';
import { factories } from './factories';

export const router  = Router();

const forgotPasswordController = factories.makeForgotPasswordController();
const resetPasswordController = factories.makeResetPasswordController();

// router.get('/', (req, res) => HomeController.welcome(req, res));    

router.post('/register', async (req, res) => {
    await Controllers.registerController.register(req, res);
});

router.post('/login', async (req, res) => {
    await Controllers.loginController.login(req, res);
});

router.post('/tasks', authenticateToken, async (req, res) => {
    await Controllers.createTaskController.create(req, res);
});

router.get('/tasks', authenticateToken, async (req, res) => {
    await Controllers.readAllTaskController.getAllTasks(req, res);
});

router.put('/task/:id', authenticateToken, async (req, res) => {
     await Controllers.updateTaskController.update(req, res);
});

router.post('/forgot-password', async (req, res) => {
  await forgotPasswordController.forgotPassword(req, res);
});

router.post('/reset-password', async (req, res) => {
    await resetPasswordController.resetPassword(req, res);
});
