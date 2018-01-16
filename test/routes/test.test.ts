import * as supertest from 'supertest'
import { should, assert } from 'chai'
import { baseUrl } from '../../src/apis/test.router'

export default function sampleTest(request: supertest.SuperTest<supertest.Test>) {
  describe('Test Route', () => {
    describe('Should response message hello world :: $NODE_ENV', () => {
      it('should return 200 OK', async () => {
        const result = await request.get(`${baseUrl}/hello`).expect(200)
        assert.equal(result.body.message, 'Hello :: test')
      })
    })
  })
}
