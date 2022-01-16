import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { User } from "../models/UserModel.js";
import { Token } from "../models/TokenModel.js";

const registration = (req, res) =>  {
    try {
        const { name, login, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
    
        User.findOne({ login }, (err, dataUser) => {
            if (err) return res.status(500).json({ message: 'Непредвиденная ошибка запроса' }); 
            if (dataUser) return res.status(200).json({ message: 'Пользователь зарегистрирован в системе' }); 

            User.create({ name, login, password: hashPassword }, (err, dataUser) => {
                if (err) return res.status(500).json({ message: 'Непредвиденная ошибка запроса' });
        
                const payload = {
                    name: dataUser.name,
                    login: dataUser.login
                };
        
                const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30m' });
                const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' });
        
                Token.create({ user: dataUser._id, refresh: refreshToken }, (err, dataToken) => {
                    if (err) return res.status(500).json({ message: 'Непредвиденная ошибка запроса' });
        
                    res.status(200).json({ user: { name: dataUser.name, login: dataUser.login }, tokens: { access: accessToken, refresh: dataToken.refresh } });
                });
            });
        });
    } catch (e) {
        res.status(500).json({ message: 'Непредвиденная ошибка сервера' });
    }
}

const login = (req, res) => {
    try {
        const { login, password } = req.body;

        User.findOne({ login }, (err, dataUser) => {
            if (err) return res.status(500).json({ message: 'Непредвиденная ошибка запроса' }); 
            if (!dataUser) return res.status(200).json({ message: 'Пользователь не зарегистрирован в системе' }); 

            const isValidPassword = bcrypt.compareSync(password, dataUser.password);

            if (!isValidPassword) return res.status(400).json({ success: false, message: 'Введен неверный пароль' });

            const payload = {
                name: dataUser.name,
                login: dataUser.login
            };

            const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30m' });

            Token.findOne({ user: dataUser._id }, (err, dataToken) => {
                if (err) return res.status(500).json({ message: 'Непредвиденная ошибка запроса' });

                res.status(200).json({ user: { name: dataUser.name, login: dataUser.login, tasks: dataUser.tasks }, tokens: { access: accessToken, refresh: dataToken.refresh } });
            });
        });
    } catch (e) {
        res.status(500).json({ message: 'Непредвиденная ошибка сервера' });
    }
}

export { registration, login }