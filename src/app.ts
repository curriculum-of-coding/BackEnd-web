import express, { Request, Response, NextFunction } from 'express';
import router from './router/router';
import { HTTPError } from './types/error';

class App {
    public application: express.Application;
    constructor() {
        this.application = express();
        this.application.use(express.json());
    }
}

const app: express.Application = new App().application;

app.use('/', router);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new HTTPError(404));
});

// error handle
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.rawStatusCode || 500);
    res.json({
        statusCode: err.rawStatusCode,
        message: err.message || err.rawStatusCodeMessage,
        data: err.rawData,
    });
});

export default app;
