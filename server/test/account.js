import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
var token = '';
describe('Account', () => {
  before((done) => {
    chai.request(app)
    .post('/api/v1/auth/signin')
    .send({email: 'manzi@gmail.com', password: 'Password12'})
    .end((err, res) => {
        token = res.body.data.token;
        done();
    });
});

    it('Should get all accounts', (done) => {
        chai.request(app)
        .get('/api/v1/accounts')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should create a new account', (done) => {
        const account = {
            owner: 5,
            type: 'savings'
            
        };
        chai.request(app)
        .post('/api/v1/accounts')
        .send(account)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not create an account if data are not correct', (done) => {
        const account = {
            owner: '',
            type: 'savings'
        };
        chai.request(app)
        .post('/api/v1/accounts')
        .send(account)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should not create an account if the user is not registered', (done) => {
        const account = {
            owner: 900,
            type: 'savings',
            
        };
        chai.request(app)
        .post('/api/v1/accounts')
        .send(account)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should get one account', (done) => {
        chai.request(app)
        .get('/api/v1/accounts/6')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not get one account if the account id does not exist', (done) => {
        chai.request(app)
        .get('/api/v1/accounts/900')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should activate account', (done) => {
        chai.request(app)
        .patch('/api/v1/accounts/43351349/activate')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not activate account if account number does not exist', (done) => {
        chai.request(app)
        .patch('/api/v1/accounts/23456548905/activate')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should not deactivate account if account number does not exist', (done) => {
        chai.request(app)
        .patch('/api/v1/accounts/23456566564/deactivate')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should not deactivate account if account status is not dormant', (done) => {
        chai.request(app)
        .patch('/api/v1/accounts/13879909/deactivate')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should deactivate account', (done) => {
        chai.request(app)
        .patch('/api/v1/accounts/59741854/deactivate')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not delete account if account number does not exist', (done) => {
        chai.request(app)
        .delete('/api/v1/accounts/808848336586')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should delete account', (done) => {
        chai.request(app)
        .delete('/api/v1/accounts/57030983')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          done();
        });
    });
});

