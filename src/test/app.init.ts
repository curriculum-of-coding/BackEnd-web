import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

describe('app init test', () => {
    const req = request(app);

    it('GET /', async () => {
        const res = await req.get('/').set('node-test-header', 'nodeTest').expect(200);
        expect(res.text).to.equal('main!!!');
    });

    it('POST /', async () => {
        await req
            .post('/')
            .set('node-test-header', 'nodeTest')
            .expect(404)
            .expect('Content-Type', /json/);
        expect({ message: '404 Not Found' });
    });
});
