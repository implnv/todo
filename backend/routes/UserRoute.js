import { Router } from 'express';
import { registration, login } from '../controllers/UserController.js';

const user = Router();

user.post('/api/user/registration', registration);
user.post('/api/user/login', login);

export { user };