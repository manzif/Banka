import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import index from '../db/index';
import myqueries from '../db/myqueries';

chai.should();
chai.use(chaiHttp);

const db = index.runQuery;

let token, user, account_id, account_number;

describe('Account', () => {
  before(async () => {
    const res = await chai.request(app).post('/api/v1/auth/signin') .send({email: 'manzi@gmail.com', password: 'Password12'});
    token = res.body.token;
    user = res.body;
    await db.query(myqueries.deleteAllAccounts);
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
          owner: user.data[0].id,
          type: 'savings'
          
      };
      chai.request(app)
      .post('/api/v1/accounts')
      .send(account)
      .end((err, res) => {
        account_id = res.body.data[0].id;
        account_number = res.body.data[0].accountnumber;
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
      .get('/api/v1/account/' + account_id)
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
      .patch('/api/v1/accounts/'+ account_number +'/activate')
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

  // it('Should not deactivate account if account status is not dormant', (done) => {
  //     chai.request(app)
  //     .patch('/api/v1/accounts/13879909/deactivate')
  //     .set ('Authorization', 'Bearer ' + token)
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('status').eql(400);
  //       res.body.should.have.property('error');
  //       done();
  //     });
  // });

  it('Should deactivate account', (done) => {
      chai.request(app)
      .patch('/api/v1/accounts/'+ account_number +'/deactivate')
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
      .delete('/api/v1/accounts/' + account_number)
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

