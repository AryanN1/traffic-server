const request = require('supertest');
const app = require('../src/app');


describe('GET Incident endpoints', function () {
  it('Testing /incidents', function (done) {
      request(app)
          .get('/incidents')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
  it('Testing /incidents-geo', function (done) {
    request(app)
        .get('/incidents-geo')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });
});