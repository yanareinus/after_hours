var chai = require('chai');

var chaiHttp = require('chai-http');
var server = require('../app.js');
// var server = require('../app.js');
var expect = chai.expect;

chai.use(chaiHttp);


describe('User Controller', () => {
  // Create a user & set it equal to testUser.
  it('should render a login form on /login GET', (done) => {
    chai.request(server)
      .get('/login')
      .end((err,res) => {
        expect(res.status).to.equal(200);
        expect(res.text).to.include("User Name:");
        done();
      });
  });

  it('should receive user input on /login POST', (done) => {
    chai.request(server)
      .get('/login')
      .end((err,res) => {
        expect(res.status).to.equal(200);
        // expect(res.text).to.include("User Name:");
        done();
      });
  });


  it('should add a SINGLE article on /articles POST');
  it('should update a SINGLE article on /articles/:title PUT');
  it('should delete a SINGLE article on /articles/:title DELETE');
});
