import bcrypt from "bcryptjs";
import { User } from "../models/UserModel.js";
import { tokenGenerate, verifyRefreshToken } from "../utils/tokenUtils.js";
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

            const props = {
                'block_1': {
                    name: 'Текущие',
                    color: '#6cbce9'
                },
                'block_2': {
                    name: 'Важные',
                    color: '#f1e699ba'
                },
                'block_3': {
                    name: 'Срочные',
                    color: '#ff7a7a'
                },
                'block_4': {
                    name: 'Отложенные',
                    color: '#e5e5e5'
                }
            }

            User.create({ name, login, 'password': hashPassword, props }, (err, dataUser) => {
                if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });

                const { accessToken, refreshToken } = tokenGenerate(dataUser);
                res.status(200).json({ user: { id: dataUser._id, name: dataUser.name, login: dataUser.login, props: dataUser.props }, tokens: { access: accessToken, refresh: refreshToken } });
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

            res.status(200).json({ user: { id: dataUser._id, name: dataUser.name, login: dataUser.login, props: dataUser.props }, tokens: { access: accessToken, refresh: refreshToken } });
        });
    } catch (e) {
        res.status(500).json({ 'message': 'Непредвиденная ошибка сервера' });
    }
}

const refresh = (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' });

        const user = verifyRefreshToken(token);
        if (!user) return res.status(500).json({ 'message': 'Верификация не пройдена, токен невалиден' });

        const { accessToken, refreshToken } = tokenGenerate(user); 
        res.status(200).json({ tokens: { access: accessToken, refresh: refreshToken }, message: 'Токены успешно обновлены' });
    } catch (e) {
        res.status(500).json({ 'message': 'Непредвиденная ошибка сервера' });
    }
}

const editProps = (req, res) => {
    try {
        const { type, color, name } = req.body;
        const { id } = req.user;

        User.findById(id, (err, dataUser) => {
            if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' }); 
            const { props } = dataUser;
            props[type] = {
                name,
                color
            }
            User.findByIdAndUpdate(id, { props }, {new: true}, (err, dataUser) => {
                if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' }); 
                res.status(200).json({ user: { id: dataUser._id, name: dataUser.name, login: dataUser.login, props: dataUser.props }, message: 'Плитки успешно обновлены' });
            })
        });
    } catch (e) {
        res.status(500).json({ 'message': 'Непредвиденная ошибка сервера' });
    }
}

const init = (req, res) => {
    const { id } = req.user;

    User.findById(id, (err, dataUser) => {
        if (err) return res.status(500).json({ 'message': 'Непредвиденная ошибка запроса' }); 
        if (!dataUser) return res.status(200).json({ 'message': 'Пользователь не зарегистрирован в системе' }); 

        res.status(200).json({ user: { id: dataUser._id, name: dataUser.name, login: dataUser.login, props: dataUser.props }});
    });
}

export { registration, login, refresh, editProps, init }