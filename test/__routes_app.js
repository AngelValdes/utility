const expect = require('chai').expect;
const request = require('supertest');

describe('App Routes', () => {
  var server;
  var app;

  beforeEach(() => {
    server = require('../src/server.js');
  });

  afterEach(() => {
    server.close();
  });


  /// test multiple apps
  it('GET /api/v1/apps returns multiple apps', (done) => {
    request(server)
      .get('/api/v1/apps')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        const apps = res.body;

        this.app = apps[0]

        expect(apps.length).to.be.above(0)
      })
      .end(done)
  });

  // test single app
  it('GET /api/v1/apps/:id returns an app obj with id, title, description, and releaseDate properties', (done) => {
    request(server)
      .get('/api/v1/apps/' + this.app.id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        const app = res.body;
        expect(app).to.have.property('id')
        expect(app).to.have.property('title')
        expect(app).to.have.property('description')
      })
      .end(done)
  });

});
