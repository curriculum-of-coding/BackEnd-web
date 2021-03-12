import app from './app';
import mongo from './db/db';
import config from './config';

mongo.connect().then(
    (msg) => console.log(msg ?? 'MongoDB connect!!'),
    (err) => console.error(err ?? 'MongoDB connect Err')
);

const port: number = Number(process.env.PORT) || 3000;

config['GITHUB_CLIENT_SECRET'] = String(process.env.GITHUB_SECRET ?? undefined);
config['KAKAO_CLIENT_SECRET'] = String(process.env.KAKAO_SECRET ?? undefined);
config['GOOGLE_CLIENT_SECRET'] = String(process.env.GOOGLE_SECRET ?? undefined);
config['JWT_SECRET'] = String(process.env.JWT_SECRET ?? 'TETSET');
config['RESET_PASSWORD_KEY'] = String(process.env.RESET_PASSWORD_KEY ?? 'TETSET');
config['PASSWORD_SALT'] = String(process.env.PASSWORD_SALT ?? 'TETSET');

app.listen(port, () => console.log(`Express is start at port ${port}!!!`)).on('error', (err) =>
    console.error(err)
);
