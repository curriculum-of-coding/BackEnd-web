import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

describe('app init test', () => {
  const req = request(app);

  it('GET /', async () => {
    const res = await req.get('/').expect(200);
    expect(res.text).to.equal('main!!!');
  });

  it('POST /', async () => {
    const res = await req.post('/').expect(404);
    expect(res.body.message).to.equal('404 Not Found');
  });
});
