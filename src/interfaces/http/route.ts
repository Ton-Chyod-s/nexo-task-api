import { Router } from 'express';
import { authenticateToken } from '@interfaces/middlewares/auth-middleware';
import { factories } from './factories';

export const router  = Router();

// authentication middleware
const forgotPasswordController = factories.makeForgotPasswordController();
const resetPasswordController = factories.makeResetPasswordController();
// user controllers
const registerController = factories.makeRegisterController();
const loginController = factories.makeLoginController();
// task controllers
const createTaskController = factories.makeCreateController();
const updateTaskController = factories.makeUpdateTaskController();
const readAllTaskController = factories.makeReadController();


// router.get('/', (req, res) => HomeController.welcome(req, res));    

router.post('/register', async (req, res) => {
    await registerController.register(req, res);
});

router.post('/login', async (req, res) => {
    await loginController.login(req, res);
});

router.post('/tasks', authenticateToken, async (req, res) => {
    await createTaskController.create(req, res);
});

router.get('/tasks', authenticateToken, async (req, res) => {
    await readAllTaskController.getAllTasks(req, res);
});

router.put('/task/:id', authenticateToken, async (req, res) => {
     await updateTaskController.update(req, res);
});

router.post('/forgot-password', async (req, res) => {
  await forgotPasswordController.forgotPassword(req, res);
});

router.post('/reset-password', async (req, res) => {
    await resetPasswordController.resetPassword(req, res);
});
