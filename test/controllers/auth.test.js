import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';

describe('Authenticated Controller Test', () => {
  let refreshToken = '';
  it('should return login success', done => {
    let user =  {email: 'jane@gmail.com',
    password: 'janepassword',}
    request(app)
      .post('/api/login')
      .set('Accept','application/json')
      .send(user)
      .end((err, res) => {
        let { data } = res.body
        refreshToken = data.token.refresh;
        
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
    console.log("obtained token",refreshToken)
    request(app)
      .delete('/api/logout')
      .set('Authorization', 'Bearer ' + refreshToken)
      // .send(refreshToken)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201)
      })
  })
});