import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { User } from "../models/UserModel.js";
import { Token } from "../models/TokenModel.js";
import { Exception } from "../utils/Exception.js";

const registration = (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
    
        User.create({ name, email, password: hashPassword }, (err, dataUser) => {
            if (err) throw Exception.UnauthorizedError();

            const payload = {
                name: dataUser.name,
                login: dataUser.login
            };

            const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30m' });
            const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' });

            Token.create({ user: dataUser._id, tokens: { access: accessToken, refresh: refreshToken }}, (err, dataToken) => {
                if (err) throw Exception.UnauthorizedError();

                return res.status(200).json({ token: dataToken.tokens.access });
            });
        });
    } catch (e) {
        next(e);
    }
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

        const token = jwt.sign({ id: r._id }, process.env.SECRET_KEY, { expiresIn: '30min' });
        res.status(200).json({ success: true, token });
    });
}

export { registration, login }