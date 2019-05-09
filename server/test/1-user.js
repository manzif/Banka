import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import index from '../db/index';
import myqueries from '../db/myqueries';
import helper from '../helpers/password';

const db = index.runQuery;

chai.should();
chai.use(chaiHttp);
let token;
describe('User', () => {
  before(async () => {
    const user = {
      email: 'manzi@gmail.com',
      firstname: 'Manzi',
      lastname: 'Fabrice' ,
      password: 'Password12',
      type: 'client'
    };
  const hash = helper.hashPasword(user.password);
  const values = [user.firstname, user.lastname, user.email, hash, user.type];
    await db.query(myqueries.deleteAllUsers);
    await db.query(myqueries.signup, values)
    await db.query(myqueries.makeUserAdmin, [ true, 'staff', 'manzi@gmail.com' ]);
  });

  it('Should create a new User', (done) => {
      const user = {
          email: 'manzi1@gmail.com',
          firstname: 'Manzi',
          lastname: 'Fabrice' ,
          password: 'Password12'
      };
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('Should not create a new User if the email already exists', (done) => {
      const user = {
          email: 'manzi@gmail.com',
          firstName: 'Manzi',
          lastName: 'Fabrice' ,
          password: 'Password12'
      };
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should not create a user if data are not correct', (done) => {
      const user = {
          email: '' ,
          firstName: 'Fabrice',
          lastName: 'Manzi' ,
          password: 'pasord',
      };
      chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should login a User', (done) => {
      const user = {
          email: 'manzi@gmail.com' ,
          password: 'Password12'
      };
      chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        token = 'Bearer ' + res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.should.have.property('token');
        done();
      });
  });

  it('Should get all users', (done) => {
      chai.request(app)
      .get('/api/v1/users')
      .set ('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });


  it('Should not login a user if password or email is empty', (done) => {
      const user = {
          email: 'manzif@gmail.com' ,
          password: ''
      };
      chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should not login a user if credentials are not correct', (done) => {
      const user = {
          email: 'manzfif@gmail.com' ,
          password: '123456'
      };
      chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('No account found');
        done();
      });
  });
});

