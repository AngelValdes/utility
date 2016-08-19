
const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const User = require('../models/user');

describe('User Model', () => {
  // test data

  let tempUser;
  let testUser;

  // find all users
  it('GET /api/v1/users - Find All users', (done) => {
    User.all( (users) => {
      expect(users.length).to.be.above(0);
      this.testUser = users[0].dataValues;
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

  // create users
  it('POST /api/v1/users - Create User', (done) => {
    const fakeUser = { 'name': faker.name.firstName() };
    User.add(fakeUser, (user) => {
      user = user.dataValues;
      expect(user.name).to.be.equal(fakeUser.name);
      this.tempUser = user;
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

// get user by id
  it('GET /api/v1/users/:id - Find User By ID', (done) => {
    User.one(this.testUser, (user) => {
      user = user.dataValues;
      expect(user.name).to.be.equal(this.testUser.name);
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

  // update user
  it('POST /api/v1/users/:id - Update A User', (done) => {
    this.tempUser.name = 'This Is Not A Real Name';
    User.update(this.tempUser, (user) => {
      user = user.dataValues;
      expect(user.name).to.be.equal(this.tempUser.name);
      this.tempUser = user;
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

  // delete user
  it('DELETE /api/v1/users/:id - Delete User by Id', (done) => {
    this.tempUser.force = true;
    User.remove(this.tempUser, (response) => {
      expect(response).to.be.equal(1);
      done();
    }, (error) => {
      throw new Error(error);
    });
  });

});
