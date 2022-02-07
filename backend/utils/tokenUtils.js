import jwt from 'jsonwebtoken';

const tokenGenerate = (dataUser) => {
    try {
        const payload = {
            id: dataUser.id,
            name: dataUser.name,
            login: dataUser.login
        };
    
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' });

        return { accessToken, refreshToken }
    } catch (e) {
        console.log(e);
    }
}

const verifyAccessToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        return data;
    } catch (e) {
        console.log('Токен не валиден');
    }
}

const verifyRefreshToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
        return data;
    } catch (e) {
        console.log('Токен не валиден');
    }
}

export { tokenGenerate, verifyAccessToken, verifyRefreshToken }