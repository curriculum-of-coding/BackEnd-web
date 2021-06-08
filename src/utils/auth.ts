import * as jwt from 'jsonwebtoken';
import config from '../config';
import crypto from 'crypto';

interface IJWT {
    email: string;
    nickname: string;
    isSuperUser: string;
}
const createJWT = (user, expires?: string): string => {
    return jwt.sign(
        {
            email: user.email,
            nickname: user.nickname,
            isSuperUser: user.isSuperUser,
        },
        config['JWT_SECRET'],
        {
            expiresIn: expires ?? '1d',
        }
    );
};

const veriftJWT = (token: string): unknown => {
    return jwt.verify(token, config['JWT_SECRET']);
};

const passwordEncrypt = (password: string): string => {
    if (password) {
        return crypto
            .pbkdf2Sync(password, config['PASSWORD_SALT'], 100000, 64, 'sha512')
            .toString('hex');
    } else {
        return '';
    }
};

export { createJWT, veriftJWT, IJWT, passwordEncrypt };
