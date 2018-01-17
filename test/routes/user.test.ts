import * as supertest from 'supertest'
import { should, assert } from 'chai'
import { baseUrl } from '../../src/apis/user.router'

const user = {
  username: 'test',
  password: 'password',
  email: 'test@mail.com',
}

export default function userTest(request: supertest.SuperTest<supertest.Test>) {
  describe('User Route', () => {
    describe('Should response new user data.', () => {
      it('should return 200 OK', async () => {
        const result = await request.post(`${baseUrl}/user`)
          .send({ user })
          .expect(200)
      })
    })
  })
}
