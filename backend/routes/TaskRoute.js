import { Router } from 'express';
import { tasksGet, taskCreate, taskEdit, taskDelete, taskMove } from '../controllers/TaskController.js'
import { authorizationMiddleware } from '../middleware/authorizationMiddleware.js';

const task = Router();

task.use(authorizationMiddleware);

task.get('/api/tasks', tasksGet);
task.post('/api/tasks/create', taskCreate);
task.patch('/api/tasks/edit', taskEdit);
task.delete('/api/tasks/delete', taskDelete);
task.patch('/api/tasks/move', taskMove);

export { task };

