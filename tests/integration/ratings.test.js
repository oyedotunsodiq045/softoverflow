const supertest = require('supertest');
// const Rating = require('../../models/Rating');
let server;

describe('/api/v1/ratings', () => {
  beforeEach(() => { server = require('../../server') })
  afterEach( async () => { 
    server.close()
    // await Rating.remove({})
  })

  describe('GET /', () => {
    it('should return all ratings', async () => {
      const res = await supertest(server).get('/api/v1/ratings')
      expect(res.status).toBe(200)
    })
  })

  describe('GET /:id', () => {
    // it('should return a rating if valid id is passed', async () => {
    //   const rating = new Rating({
    //     name: "name3",
    //     email: "name3@gmail.com",
    //     password: "password3"
    //   })

    //   await rating.save()

    //   const res = await supertest(server).get('/api/v1/ratings/' + rating._id)

    //   expect(res.status).toBe(200)
    //   expect(res.body).toHaveProperty("name", rating.name)
    // })

    it('should return a 404 if an invalid id is passed', async () => {
      const res = await supertest(server).get('/api/v1/ratings/1')

      expect(res.status).toBe(404)
    })
  })

  describe('POST /', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await supertest(server)
        .post('/api/v1/ratings')
        .send({
          rating: 7
        })

      expect(res.status).toBe(401)
    })
  })

})