import { Router } from 'express';
import { registration, login } from '../controllers/UserController.js';
import { body } from 'express-validator'; 

const user = Router();

user.post('/api/user/registration', 
                                    body('login').isEmail(), 
                                    body('password').isLength({ min: 4, max: 8 }), 
                                    registration);
user.post('/api/user/login', 
                                    body('login').isEmail(), 
                                    body('password').isLength({ min: 4, max: 8 }), 
                                    login);

export { user }