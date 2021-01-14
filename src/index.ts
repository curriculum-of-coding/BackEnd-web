import app from './app';

const port: number = Number(process.env.PORT) || 3000;

app
  .listen(port, () => console.log(`Express is start at port ${port}!!!`))
  .on('error', (err) => console.error(err));
