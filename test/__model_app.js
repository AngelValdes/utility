const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const App = require('../src/models/app');

describe('App Model', () => {
  let testApp;
  // find all apps
  it('GET /api/v1/app - Find All Apps', (done) => {
    App.all( (apps) => {
      expect(apps.length).to.be.above(0);
      this.testApp = apps[0].dataValues;
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

  // create an app
  it('POST /api/v1/app - Create App', (done) => {
    const fakeApp = { 'title': faker.name.firstName() };
    App.add(fakeApp, (app) => {
      app = app.dataValues;
      expect(app.title).to.be.equal(fakeApp.title);
      this.tempApp = app;
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

  // get app by id
  it('GET /api/v1/app/:id - Find App By ID', (done) => {
    App.one(this.testApp, (app) => {
      app = app.dataValues;
      expect(app.title).to.be.equal(this.testApp.title);
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

  // update app
  it('POST /api/v1/app/:id - Update A App', (done) => {
    this.tempApp.title = 'That Is Not A Real Name';
    App.update(this.tempApp, (app) => {
      app = app.dataValues;
      expect(app.title).to.be.equal(this.tempApp.title);
      this.tempApp = app;
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

  // delete an app
  it('DELETE /api/v1/app/:id - Delete App By ID', (done) => {
    this.tempApp.force = true;
    App.remove(this.tempApp, (response) => {
      expect(response).to.be.equal(1);
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

});
