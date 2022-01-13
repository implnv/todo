import mongoose from "mongoose";
import { userSchema } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const { model } = mongoose;
const User = model('User', userSchema);

const registration = (req, res) => {
    const { login, password } = req.body;

    User.findOne({ login }, (err, r) => {
        if (r) return res.status(400).json({ 
            status: false,
            massage: 'Пользователь с текущим логином уже зарегистрирован'
        });

        const hashPassword = bcrypt.hashSync(password, 10);
        const user = new User({ login, password: hashPassword });
    
        user.save().then(r => {
            if (r === user) res.status(200).json({ success: true, message: 'Пользователь успешно зарегистрирован' });
            else res.status(400).json({ success: false, message: 'Ошибка регистрации пользователя' });
        });
    });
}

const login = (req, res) => {
    const { login, password } = req.body;

    User.findOne({ login }, (err, r) => {
        if (!r) return res.status(400).json({ 
            status: false,
            massage: 'Пользователь с текущим логином не найден'
        });

        const isValidPassword = bcrypt.compareSync(password, r.password);

        if (!isValidPassword) return res.status(400).json({ success: false, message: 'Введен неверный пароль' });

        const token = jwt.sign({ id: r._id }, process.env.SECRET_KEY, { expiresIn: '6h' });

        res.status(200).json({ success: true, token });
    });
}

export { registration, login }