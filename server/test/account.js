import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Account', () => {
    it('Should get all accounts', (done) => {
        chai.request(app)
        .get('/api/v1/accounts')
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
            type: 'savings',
            user: 2
        };
        chai.request(app)
        .post('/api/v1/accounts')
        .send(account)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not create an account if data are not correct', (done) => {
        const account = {
            type: 'savings',
            user: ''
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
            type: 'savings',
            user: 4
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
        .get('/api/v1/accounts/1')
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
        .get('/api/v1/accounts/100')
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
        .patch('/api/v1/accounts/23456546/activate')
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
        .patch('/api/v1/accounts/2345654/activate')
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
        .patch('/api/v1/accounts/2345654/deactivate')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should not deactivate account if account status is not active', (done) => {
        chai.request(app)
        .patch('/api/v1/accounts/23412346/deactivate')
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
        .patch('/api/v1/accounts/23454566/deactivate')
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
        .delete('/api/v1/accounts/2345654')
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
        .delete('/api/v1/accounts/23454566')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message');
          done();
        });
    });
});