import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Account', () => {
    it('Should create a new account', (done) => {
        const account = {
            Type: 'savings' ,
            user: 4
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
});