const supertest = require('supertest')
// const Answer = require('../../models/Answer');
let server;

describe('/api/v1/answers', () => {
  beforeEach(() => { server = require('../../server') })
  afterEach( async () => { 
    server.close()
    // await Answer.remove({})
  })
  
  describe('GET /', () => {
    it('should return all answers', async () => {
      const res = await supertest(server).get('/api/v1/answers')
      expect(res.status).toBe(200)
    })
  })

  describe('GET /:id', () => {
    // it('should return an answer if valid id is passed', async () => {
    //   const answer = new Answer({
    //     name: "name3",
    //     email: "name3@gmail.com",
    //     password: "password3"
    //   })

    //   await answer.save()

    //   const res = await supertest(server).get('/api/v1/answers/' + answer._id)

    //   expect(res.status).toBe(200)
    //   expect(res.body).toHaveProperty("name", answer.name)
    // })

    it('should return a 404 if an invalid id is passed', async () => {
      const res = await supertest(server).get('/api/v1/answers/1')

      expect(res.status).toBe(404)
    })

  })

  describe('POST /', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await supertest(server)
        .post('/api/v1/answers')
        .send({
          solution: "solution1"
        })

      expect(res.status).toBe(401)
    })
  })

})