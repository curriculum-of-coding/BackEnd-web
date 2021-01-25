import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import mongo from '../db/db';
import { inputCase, outputCase } from './case/db.init.case';

describe('db init test', () => {
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

    it('GET /test', async () => {
        await req
            .get('/test')
            .set('node-test-header', 'nodeTest')
            .query(inputCase.test)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(outputCase.test);
    });

    after((done) => {
        mongo.close().then(
            (msg) => console.log(msg ?? 'MongoDB close!!'),
            (err) => console.error(err ?? 'MongoDB close Err')
        );
        done();
    });
});
