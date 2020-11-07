const supertest = require('supertest');
// const User = require('../../models/User');
let server;

describe('/api/v1/users', () => {
  beforeEach(() => { server = require('../../server') })
  afterEach( async () => { 
    server.close()
    // await User.remove({})
  })

  describe('GET /', () => {
    it('should return all users', async () => {
      // await User.insertMany([
      //   {
      //     name: "name1",
      //     email: "name1@gmail.com",
      //     password: "password1"
      //   },
      //   {
      //     name: "name2",
      //     email: "name2@gmail.com",
      //     password: "password2"
      //   },
      // ])

      const res = await supertest(server).get('/api/v1/users')
      
      expect(res.status).toBe(200)
      // expect(res.body.length).toBe(6)
      // expect(res.body.some(u => u.name === "name1")).toBeTruthy()
      // expect(res.body.some(u => u.password === "password2")).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    // it('should return a user if valid id is passed', async () => {
    //   const user = new User({
    //     name: "name3",
    //     email: "name3@gmail.com",
    //     password: "password3"
    //   })

    //   await user.save()

    //   const res = await supertest(server).get('/api/v1/users/' + user._id)

    //   expect(res.status).toBe(200)
    //   expect(res.body).toHaveProperty("name", user.name)
    // })

    it('should return a 404 if an invalid id is passed', async () => {
      const res = await supertest(server).get('/api/v1/users/1')

      expect(res.status).toBe(404)
    })
  })
})