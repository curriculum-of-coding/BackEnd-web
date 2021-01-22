import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import db from '../db/db';

describe('app init test', () => {
    before((done) => {
        db;
        done();
    });
    const req = request(app);

    it('GET /', async () => {
        const res = await req.get('/').expect(200);
        expect(res.text).to.equal('main!!!');
    });

    it('POST /', async () => {
        await req.post('/').expect(404).expect('Content-Type', /json/);
        expect({ message: '404 Not Found' });
    });

    it('GET /test', async () => {
        const testEmail = `testUser${Math.floor(Math.random() * 142534)}`;
        await req
            .get('/test')
            .query({ email: testEmail, password: '1asdfw2', nickname: '123qwer' })
            .expect(200)
            .expect('Content-Type', /json/);
        expect({ email: testEmail, password: '1asdfw2', nickname: '123qwer' });
    });

    after((done) => {
        db.close().then(
            () => {
                console.log('DB is closed');
            },
            () => undefined
        );
        done();
    });
});
