const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../../models/User')
// const Question = require('../../models/Question')
let server;

describe('/api/v1/questions', () => {
  beforeEach(() => { server = require('../../server') })
  afterEach( async () => { 
    server.close();
    // await Question.deleteMany()
  });

  describe('GET /', () => {
    it('should return all questions', async () => {
      // await Question.insertMany([
      //   {
      //     question: "question1",
      //     categories: ["Java", "Python"],
      //     averageRating: 7,
      //     user: "5fa26af2b083ed340263ba77"
      //   },
      //   {
      //     question: "question2",
      //     categories: ["Javascript", "PHP"],
      //     averageRating: 7,
      //     user: "5fa26cb40750e237cfefce1b"
      //   },
      // ])
      
      const res = await supertest(server).get('/api/v1/questions')
      
      expect(res.status).toBe(200)
      // expect(res.body.length).toBe(2)
    })
  })

  describe('GET /:id', () => {
    // it('should return a question if valid id is passed', async () => {
    //   const question = new Question({
    //     name: "name3",
    //     email: "name3@gmail.com",
    //     password: "password3"
    //   })

    //   await question.save()

    //   const res = await supertest(server).get('/api/v1/questions/' + question._id)

    //   expect(res.status).toBe(200)
    //   expect(res.body).toHaveProperty("name", question.name)
    // })

    it('should return a 404 if an invalid id is passed', async () => {
      const res = await supertest(server).get('/api/v1/questions/1')

      expect(res.status).toBe(404)
    })

    // it('should return a 404 if no question with given id exist', async () => {
    //   const id = mongoose.Types.ObjectId()
    //   const res = await supertest(server).get(`/api/v1/questions/`, id)

    //   expect(res.status).toBe(404)
    // })

  })

  describe('POST /', () => {
    it('should return 401 if user is not logged in', async () => {
      const res = await supertest(server)
        .post('/api/v1/questions')
        .send({
          question: "question1",
          categories: ["Java", "Database"]
        })

      expect(res.status).toBe(401)
    })
    
    // it('should return 400 if question is less than 5 characters', async () => {
    //   // Create token
    //   let user = new User()
    //   const token = user.getSignedJwtToken();
      
    //   const res = await supertest(server)
    //     .post('/api/v1/questions')
    //     .set(`Bearer ${token}`, token)
    //     .send({
    //       question: "qu",
    //       categories: ["Java", "Database"]
    //     })

    //   expect(res.status).toBe(400)
    // })

    // it('should return 400 if question is more than 1000 characters', async () => {
    //   // Create token
    //   let user = new User()
    //   const token = user.getSignedJwtToken();

    //   const question = new Array(1002).join('a')
      
    //   const res = await supertest(server)
    //     .post('/api/v1/questions')
    //     .set('x-auth-token', token)
    //     .send({
    //       question: question,
    //       categories: ["Java", "Database"]
    //     })

    //   expect(res.status).toBe(400)
    // })

  })
  


})