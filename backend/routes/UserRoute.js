import { Router } from 'express';
import { registration, login, refresh, editProps, init } from '../controllers/UserController.js';
import { body } from 'express-validator'; 
import { authorizationMiddleware } from '../middleware/authorizationMiddleware.js';

const user = Router();

user.post('/api/user/registration', 
                                    body('login').isEmail(), 
                                    body('password').isLength({ min: 4, max: 8 }), 
                                    registration);
user.post('/api/user/login', 
                                    body('login').isEmail(), 
                                    body('password').isLength({ min: 4, max: 8 }), 
                                    login);
user.get('/api/user', authorizationMiddleware, init);
user.post('/api/user/refresh', refresh);
user.patch('/api/user/props', authorizationMiddleware, editProps);

export { user }