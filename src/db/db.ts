import mongoose from 'mongoose';

class DB {
    public db: mongoose.Connection;
    constructor() {
        const connect = async () =>
            mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err) => {
                if (err) {
                    // TODO: if error to connect
                    console.error('mongodb connection error', err);
                    return;
                }
                console.log('mongodb connected');
            });
        connect().then(
            () => undefined,
            () => undefined
        );
        this.db = mongoose.connection;
        require('./schema/test.schema.ts');
        // this.db.on('disconnected', connect);
    }
}

const db: mongoose.Connection = new DB().db;
export default db;
