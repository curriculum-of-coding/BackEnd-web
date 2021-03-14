import express, { Request, Response, NextFunction } from 'express';
import router from './router/router';
import { HTTPError } from './types/error';
import { HTTPResult } from './types/result';
import cors from 'cors';

class App {
    public application: express.Application;
    constructor() {
        this.application = express();
        this.application.use(express.json());
    }
}

const app: express.Application = new App().application;

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use('/', router);
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new HTTPError(404));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HTTPResult, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 200);
    res.json({
        statusCode: err.statusCode,
        message: err.message,
        data: err.data,
    });
});
// error handle
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500);
    res.json({
        statusCode: err.statusCode,
        message: err.message || err.rawStatusCodeMessage,
        data: err.data,
    });
});

export default app;
