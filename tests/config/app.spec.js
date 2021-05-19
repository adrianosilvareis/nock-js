const supertest = require('supertest');
const nock = require('nock')

const app = require('../../config/express');
const { logger } = require('../../config/logger');

const request = supertest(app)

describe('app', () => {
  beforeEach(() => {
    nock.cleanAll()
  })
  it('should return a list of todos', async () => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/todos/1')
      .reply(200, { id: 'any_id', title: 'any_title' })

    const httpResponse = await request.get('/')
    expect(nock.isDone()).toBeTruthy()
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual({ id: 'any_id', title: 'any_title' })
  });    
  it('should return 500 on http throw', async () => {
    const scope = nock('https://jsonplaceholder.typicode.com')
      .get('/todos/1')
      .reply(500, 'any_error')
    
    const httpResponse = await request.get('/')
    expect(nock.isDone()).toBeTruthy()
    expect(httpResponse.status).toBe(500)
    expect(httpResponse.body.name).toBe('HttpResponseError')
    expect(httpResponse.body.message).toBe('any_error')
  });    
});