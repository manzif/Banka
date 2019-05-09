import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import index from '../db/index';
import myqueries from '../db/myqueries';

chai.should();
chai.use(chaiHttp);

const db = index.runQuery;

let token, user, account_id, account_number;
const trans = { cashier: '', amount: '' };

describe('Transaction', () => {
  before(async () => {
    await db.query(myqueries.makeUserCashier, [ 'cashier', 'manzi1@gmail.com' ]);
    const res = await chai.request(app).post('/api/v1/auth/signin') .send({email: 'manzi1@gmail.com', password: 'Password12'});
    token = res.body.token;
    user = res.body;
    const account = await chai.request(app).post('/api/v1/accounts').send({owner: user.data[0].id, type: 'savings'});
    account_number = account.body.data[0].accountnumber;
    trans.cashier = user.data[0].id;
    trans.amount = 2000;
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

  it('Should not create a credit transaction if account is not valid', (done) => {
    chai.request(app)
    .post('/api/v1/transactions/manzi/credit')
    .set ('Authorization', 'Bearer ' + token)
    .send(trans)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error');
      done();
    });
});

it('Should not create a credit transaction if account does not exist', (done) => {
    chai.request(app)
    .post('/api/v1/transactions/23456789/credit')
    .set ('Authorization', 'Bearer ' + token)
    .send(trans)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error')
      done();
    });
});

it('Should create a credit transaction', (done) => {
      chai.request(app)
      .post('/api/v1/transactions/' + account_number +'/credit')
      .set ('Authorization', 'Bearer ' + token)
      .send(trans)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('Should not create a debit transaction if account is not valid', (done) => {
      chai.request(app)
      .post('/api/v1/transactions/manzi/debit')
      .set ('Authorization', 'Bearer ' + token)
      .send(trans)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should not create a debit transaction if account does not exist', (done) => {
      chai.request(app)
      .post('/api/v1/transactions/234567sg/debit')
      .set ('Authorization', 'Bearer ' + token)
      .send(trans)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error')
        done();
      });
  });

  it('Should create a debit transaction', (done) => {
      chai.request(app)
      .post('/api/v1/transactions/'+ account_number +'/debit')
      .set ('Authorization', 'Bearer ' + token)
      .send(trans)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});