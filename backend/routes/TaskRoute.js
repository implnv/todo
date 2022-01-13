import { Router } from 'express';
import { getTaskById, saveTask } from '../controllers/TaskController.js'

const task = Router();

task.get('/api/task/', getTaskById);
task.post('/api/task/save', saveTask);

export { task };

