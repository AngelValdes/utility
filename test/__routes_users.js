// make dependancies known
const expect = require('chai').expect;
const request = require('supertest');
const App = require('../models/app');

//
describe('User Routes', () => {
  var server;
  var user;

  beforeEach(() => {
    server = require('../src/server.js');
  });

  afterEach(() => {
    server.close();
  });

// test multiple users
  it('get /api/v1/users multiple users', (done) => {
    request(server)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        const users = res.body;

        this.user = users[0]

        expect(users.length).to.be.above(0)
      })
      .end(done)
  });

  // Test single user
 it('GET /api/v1/users/:id returns an user obj with a id and name property', (done) => {
   request(server)
     .get('/api/v1/users/' + this.user.id)
     .set('Accept', 'application/json')
     .expect('Content-Type', /json/)
     .expect((res) => {
       const user = res.body;
       expect(user).to.have.property('id')
       expect(user).to.have.property('name')
     })
     .end(done)
 });

 // Test app for specific user
 it('GET /api/v1/users/:id/apps should find all apps for a user', (done) => {

   const newApp = {
     'id': 'testId',
     'title': 'Best New Test App',
     'description': 'none',
     'userId': this.user.id
   };

   App.add(newApp, (appData) => {
     request(server)
     .get('/api/v1/users/' + this.user.id + '/apps')
     .set('Accept', 'application/json')
     .expect('Content-Type', /json/)
     .expect((res) => {
       const apps = res.body;
       expect(apps.length).to.be.above(0)
     });

     // remove app
     App.remove(newApp, (data) => {
       // if data exists
       if (data) {
         // let us know
         done();
       } else {
         // else respond with not found
       }
     }, (error) => {
     });
   });
 }, (error) => {

 });
});
