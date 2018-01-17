import * as supertest from 'supertest'
import { should, assert } from 'chai'
import { baseUrl } from '../../src/apis/auth.router'

const login = {
  username: 'test',
  password: 'password',
}

export default function userTest(request: supertest.SuperTest<supertest.Test>) {
  describe('Authentication Route', () => {
    describe('Login', () => {
      it('Should login fail 401', async () => {
        const result = await request.post(`/api${baseUrl}/login`)
          .send({ ...login, username: 'testFail' })
          .expect(401)
      })
      it('Should login success 200', async () => {
        const result = await request.post(`/api${baseUrl}/login`)
          .send({ ...login })
          .expect(200)
      })
    })
  })
}
