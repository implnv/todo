import jwt from 'jsonwebtoken';

const tokenGenerate = (dataUser) => {
    try {
        const payload = {
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

export { tokenGenerate }