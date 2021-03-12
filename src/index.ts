import app from './app';
import mongo from './db/db';
import config from './config';

mongo.connect().then(
    (msg) => console.log(msg ?? 'MongoDB connect!!'),
    (err) => console.error(err ?? 'MongoDB connect Err')
);

const port: number = Number(process.env.PORT) || 3000;
config['githubClientSecret'] = String(process.env.GITHUB_SECRET ?? undefined);
config['kakaoClientSecret'] = String(process.env.KAKAO_SECRET ?? undefined);
config['googleClientSecret'] = String(process.env.GOOGLE_SECRET ?? undefined);
config['JWT_SECRET'] = String(process.env.JWT_SECRET ?? 'TETSET');
config['resetPassword'] = String(process.env.RESETPASSWORD ?? 'TETSET');
app.listen(port, () => console.log(`Express is start at port ${port}!!!`)).on('error', (err) =>
    console.error(err)
);
