const supertest = require('supertest');
const app = require('../../config/express')

const request = supertest(app)

describe('app', () => {
 fit('should return a list of todos', async () => {
    const httpResponse = await request.get('/')
    expect(httpResponse.status).toBe(200)
    expect(httpResponse.body).toEqual({
      "completed": false,
      "id": 1,
      "title": "delectus aut autem",
      "userId": 1,   
    })
  });    
});