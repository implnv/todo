import bcrypt from "bcryptjs";
import { User } from "../models/UserModel.js";
import { Token } from "../models/TokenModel.js";
import { tokenGenerate } from "../utils/tokenGenerate.js";
import { validationResult } from "express-validator";

const registration = (req, res) =>  {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ 'message': 'Ошибка валидации данных' });

        const { name, login, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
    
        User.findOne({ login }, (err, dataUser) => {
            if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' }); 
            if (dataUser) return res.status(200).json({ 'message': 'Пользователь зарегистрирован в системе' }); 

            User.create({ name, login, 'password': hashPassword }, (err, dataUser) => {
                if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
                
                const { accessToken, refreshToken } = tokenGenerate(dataUser);
        
                Token.create({ 'user': dataUser._id, refresh: refreshToken }, (err, dataToken) => {
                    if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
                    
                    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                    res.status(200).json({ user: { name: dataUser.name, login: dataUser.login }, tokens: { access: accessToken, refresh: dataToken.refresh } });
                });
            });
        });
    } catch (e) {
        res.status(500).json({ 'message': 'Непредвиденная ошибка сервера' });
    }
}

const login = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ 'message': 'Ошибка валидации данных' });

        const { login, password } = req.body;

        User.findOne({ login }, (err, dataUser) => {
            if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' }); 
            if (!dataUser) return res.status(200).json({ 'message': 'Пользователь не зарегистрирован в системе' }); 

            const isValidPassword = bcrypt.compareSync(password, dataUser.password);

            if (!isValidPassword) return res.status(403).json({ 'message': 'Введен неверный пароль' });

            const { accessToken, refreshToken } = tokenGenerate(dataUser);

            Token.findOne({ 'user': dataUser._id }, (err, dataToken) => {
                if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
                if (!dataToken) {
                    Token.create({ 'user': dataUser._id, 'refresh': refreshToken }, (err, dataToken) => {
                        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });
        
                        res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        res.status(200).json({ 'user': { 'name': dataUser.name, 'login': dataUser.login, 'tasks': dataUser.tasks }, 'tokens': { 'access': accessToken, 'refresh': dataToken.refresh } });
                    });
                }
                else res.status(500).json({ 'message': 'Открыта действующая сессия' });
            });
        });
    } catch (e) {
        res.status(500).json({ 'message': 'Непредвиденная ошибка сервера' });
    }
}

const logout = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ 'message': 'Ошибка валидации данных' });

    const { refreshToken } = req.cookies;
    
    Token.deleteOne({ 'refresh': refreshToken }, (err, dataToken) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });

        res.clearCookie('refreshToken');
        res.status(200).json({ 'message': 'Токен успешно удален' });
    });
}

export { registration, login, logout }