import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('User', () => {
    it('Should get all accounts', (done) => {
        chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should create a new User', (done) => {
        const user = {
            email: 'manzif10@gmail.com',
            firstName: 'Fabrice',
            lastName: 'Manzi' ,
            password: 'fgjk45567AAAD5'
        };
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not create a new User if the email already exists', (done) => {
        const user = {
            email: 'manzif@gmail.com',
            firstName: 'Fabrice',
            lastName: 'Manzi' ,
            password: 'fgjk45567AAAD5'
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
            password: 'password',
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
            email: 'manzif@gmail.com' ,
            password: 'password'
        };
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not login a user if password or emil is empty', (done) => {
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
            email: 'manzif@gmail.com' ,
            password: '123456'
        };
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error').eql('Incorrect email or password');
          done();
        });
    });
});