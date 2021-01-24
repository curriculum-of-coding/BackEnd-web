import app from './app';
import mongo from './db/db';

mongo.connect().then(
    (msg) => console.log(msg ?? 'MongoDB connect!!'),
    (err) => console.error(err ?? 'MongoDB connect Err')
);

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Express is start at port ${port}!!!`)).on('error', (err) =>
    console.error(err)
);
