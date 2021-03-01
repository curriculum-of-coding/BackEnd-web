import mongoose from 'mongoose';

class DB {
    public db: mongoose.Connection;
    private static readonly DB_URL = 'mongodb://localhost:27017';
    private static readonly DB_OPTION = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    };
    constructor() {
        this.db = mongoose.connection;
        require('./schema/test.schema');
        // this.db.on('disconnected', connect);
    }

    async connect(url?: string) {
        return mongoose.connect(url ?? DB.DB_URL, DB.DB_OPTION).then(
            () => `[${url ?? DB.DB_URL}] mongoDB connection Success!!!`,
            (err: Error) =>
                new Error(`[${url ?? DB.DB_URL}]mongoDB connection Error: ${err.message}`)
        );
    }

    async close(focus?: boolean) {
        return this.db.close(focus).then(
            () => `[${this.getHost()}] DB is closed`,
            (err: Error) => new Error(`[${this.getHost()}] mongoDB close Error: ${err.message}`)
        );
    }

    getHost = (databaseName?: boolean) =>
        `mongodb://${this.db.host}:${this.db.port}${
            databaseName ? `/${this.db.db.databaseName}` : ''
        }`;
}

const mongo: DB = new DB();
export default mongo;
