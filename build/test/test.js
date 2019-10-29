"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _index = _interopRequireDefault(require("../index"));

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe('Testing the user endpoints:', function () {
  it('It should create a user', function (done) {
    var user = {
      firstName: 'Phalla',
      lastName: 'Mot',
      email: 'motthearith@gmail.com'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/users').set('Accept', 'application/json').send(user).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.data).to.include({
        id: 1,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
      done();
    });
  });
  it('It should not create a user with incomplete parameters', function (done) {
    var book = {
      firstName: 'Mot',
      email: 'motthearith@gmail.com'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/users').set('Accept', 'application/json').send(book).end(function (err, res) {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('It should get all users', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/users').set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('firstName');
      res.body.data[0].should.have.property('lastName');
      res.body.data[0].should.have.property('email');
      done();
    });
  });
  it('It should get a particular user', function (done) {
    var userId = 1;

    _chai["default"].request(_index["default"]).get("/api/v1/users/".concat(userId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('firstName');
      res.body.data.should.have.property('lastName');
      res.body.data.should.have.property('email');
      done();
    });
  });
  it('It should not get a particular user with invalid id', function (done) {
    var userId = 8888;

    _chai["default"].request(_index["default"]).get("/api/v1/users/".concat(userId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find user with the id ".concat(userId));
      done();
    });
  });
  it('It should not get a particular user with non-numeric id', function (done) {
    var userId = 'aaa';

    _chai["default"].request(_index["default"]).get("/api/v1/users/".concat(userId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value');
      done();
    });
  });
  it('It should update a user', function (done) {
    var userId = 1;
    var updatedUser = {
      id: userId,
      firstName: 'Thearith',
      lastName: 'Mot',
      email: 'avb@yahoo.com'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/users/".concat(userId)).set('Accept', 'application/json').send(updatedUser).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.id).equal(updatedUser.id);
      expect(res.body.data.firstName).equal(updatedUser.firstName);
      expect(res.body.data.lastName).equal(updatedUser.lastName);
      expect(res.body.data.email).equal(updatedUser.email);
      done();
    });
  });
  it('It should not update a user with invalid id', function (done) {
    var userId = '9999';
    var updatedUser = {
      id: userId,
      firstName: 'Thearith',
      lastName: 'Mot',
      email: 'motthearith@gmail.com'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/users/".concat(userId)).set('Accept', 'application/json').send(updatedUser).end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("Cannot find user with the id: ".concat(userId));
      done();
    });
  });
  it('It should not update a user with non-numeric id value', function (done) {
    var userId = 'ggg';
    var updatedUser = {
      id: userId,
      firstName: 'Thearith',
      lastName: 'Mot',
      email: 'motthearith@gmail.com'
    };

    _chai["default"].request(_index["default"]).put("/api/v1/users/".concat(userId)).set('Accept', 'application/json').send(updatedUser).end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please input a valid numeric value');
      done();
    });
  });
  it('It should delete a user', function (done) {
    var userId = 1;

    _chai["default"].request(_index["default"])["delete"]("/api/v1/users/".concat(userId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.include({});
      done();
    });
  });
  it('It should not delete a user with invalid id', function (done) {
    var userId = 777;

    _chai["default"].request(_index["default"])["delete"]("/api/v1/users/".concat(userId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(404);
      res.body.should.have.property('message').eql("User with the id ".concat(userId, " cannot be found"));
      done();
    });
  });
  it('It should not delete a user with non-numeric id', function (done) {
    var userId = 'bbb';

    _chai["default"].request(_index["default"])["delete"]("/api/v1/users/".concat(userId)).set('Accept', 'application/json').end(function (err, res) {
      expect(res.status).to.equal(400);
      res.body.should.have.property('message').eql('Please provide a numeric value');
      done();
    });
  });
});
//# sourceMappingURL=test.js.map