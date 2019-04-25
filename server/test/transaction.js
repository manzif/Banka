import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Transaction', () => {
  before((done) => {
    chai.request(app)
    .post('/api/v1/auth/signin')
    .send({email: 'fly@gmail.com', password: 'Password12'})
    .end((err, res) => {
        token = res.body.data.token;
        done();
    });
});
    it('Should get all transactions', (done) => {
        chai.request(app)
        .get('/api/v1/transactions')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not create a transaction if account is not valid', (done) => {
        chai.request(app)
        .post('/api/v1/transactions/manzi/debit')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should not create a transaction if account does not exist', (done) => {
        const transaction = {
            cashier: 8,
            amount: 4000
        };
        chai.request(app)
        .post('/api/v1/transactions/23456789/debit')
        .set ('Authorization', 'Bearer ' + token)
        .send(transaction)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('Account not found');
          done();
        });
    });

    it('Should create a debit transaction', (done) => {
        const transaction = {
            cashier: 8,
            amount: 4000
        };
        chai.request(app)
        .post('/api/v1/transactions/23456546/debit')
        .set ('Authorization', 'Bearer ' + token)
        .send(transaction)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          done();
        });
    });

    it('Should not create a transaction if account is not valid', (done) => {
        chai.request(app)
        .post('/api/v1/transactions/manzi/credit')
        .set ('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should not create a transaction if account does not exist', (done) => {
        const transaction = {
            cashier: 8,
            amount: 4000
        };
        chai.request(app)
        .post('/api/v1/transactions/23456789/credit')
        .set ('Authorization', 'Bearer ' + token)
        .send(transaction)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('Account not found');
          done();
        });
    });
});

