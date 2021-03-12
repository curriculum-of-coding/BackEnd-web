import * as jwt from 'jsonwebtoken';
import config from './config';
import { UserINFO } from './db/schema/userInfo.schema';

interface IJWT {
    email: string;
    nickname: string;
    isSuperUser: string;
}
const createJWT = (user: UserINFO, expires?: string): string => {
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

export { createJWT, veriftJWT, IJWT };
