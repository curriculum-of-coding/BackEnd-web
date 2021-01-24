import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import mongo from '../db/db';

describe('app init test', () => {
    before((done) => {
        mongo.connect().then(
            (msg) => {
                console.log(msg ?? 'MongoDB connect!!');
                done();
            },

            (err) => console.error(err ?? 'MongoDB connect Err')
        );
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
        mongo.close().then(
            (msg) => console.log(msg ?? 'MongoDB close!!'),
            (err) => console.error(err ?? 'MongoDB close Err')
        );
        done();
    });
});
