import { Router } from 'express';
import { tasks, taskCreate, taskMove } from '../controllers/TaskController.js'

const task = Router();

task.get('/api/tasks/:id', tasks);
task.post('/api/tasks/create', taskCreate);
task.post('/api/tasks/move', taskMove);

export { task };

