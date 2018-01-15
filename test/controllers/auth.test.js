import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import bookshelf from '../../src/db';

describe('Authenticated Controller Test', () => {
 before(done => {
    bookshelf.knex.raw('TRUNCATE TABLE users, todo CASCADE').then(() => done()
);
});

  let refreshToken = '';
  it('should return register credentials', done => {
    let user = {
    "name": "test1",
    "email": "test1@gmail.com",
    "password": "test1pass",
    }
     request(app)
      .post('/api/register')
      .set('Accept','application/json')
      .send(user)
      .end((err, res) => {
       let { body:{data}} = res
        expect(res.statusCode).to.be.equal(201);
        expect(data).to.have.property('email');
        expect(data).to.have.property('name');
        expect(data).to.have.property('password');
        done();
      });
  });
  it('should return login success', done => {
    let user =  {email: 'test1@gmail.com',
    password: 'test1pass',}
    request(app)
      .post('/api/login')
      .set('Accept','application/json')
      .send(user)
      .end((err, res) => {
        let { data } = res.body
        refreshToken = data.token.refresh;
       console.log(refreshToken); 
        expect(res.statusCode).to.be.equal(201);
        expect(data.user).to.have.property('email');
        expect(data.user).to.have.property('name');
        expect(data.user).to.have.property('password');
        expect(data.token).to.have.property('access');
        expect(data.token).to.have.property('refresh');

        done();
      });
  });
  
  it('should return logout success',done => {
    let header = { Authorization: 'Bearer ' + refreshToken }
    console.log(header);
    request(app)
      .delete('/api/logout')
      .set('Authorization','Bearer '+refreshToken)
      //.auth('Authorization', 'Bearer ' + refreshToken)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201)
      })
  })
});
