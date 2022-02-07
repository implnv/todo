import { verifyAccessToken } from "../utils/tokenUtils.js";

const authorizationMiddleware = (req, res, next) => {
    const bearer = req.headers.authorization;
    const token = bearer.split(' ')[1];

    if (token === 'null') return res.status(500).json({ 'message': 'Токен не обнаружен' });

    const user = verifyAccessToken(token);
    
    if (!user) return res.status(500).json({ 'message': 'Верификация не пройдена, токен невалиден' });

    req.user = user;
    next();
}

export { authorizationMiddleware }