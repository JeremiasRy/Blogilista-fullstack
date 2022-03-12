const { restart } = require('nodemon')

const helper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
   const blogObjects = helper.testBlogs
   .map(blog => new Blog(blog))
   const promiseArray = blogObjects.map(blog => blog.save())
   await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('send new user', async () => { //Tällä luon vain käyttäjän testejä varten
  await User.deleteMany({})
  await api
  .post('/api/users')
  .send(helper.user)
})


describe('adding/deleting blogs', () => {
  let currentUser = ''
 beforeEach(async () => {  //Tällä testillä saan tokenin tuleviin testeihin
    const user = { username: helper.user.username, password: helper.user.password }
    const response = await api
    .post('/api/login')
    .send(user)

    currentUser = response.body
  })
  test('blog is posted to database', async () => {
    const blog = helper.testPostBlog
    await api
     .post('/api/blogs')
     .set('authorization', `bearer ${currentUser.token}`)
     .send(blog)
     .expect(200)
     .expect('Content-Type', /application\/json/)

     const blogAtEnd = await helper.blogsInDb()
     expect(blogAtEnd).toHaveLength(helper.testBlogs.length + 1)

     const title = blogAtEnd.map(b => b.title)
     expect(title).toContain('Täh')
    })
  test('delete specific blog', async () => { //testi ei toiminut aikaisemmin koska vain blogin luonut käyttäjä voi poistaa blogin!! 
    const blogs = await helper.blogsInDb()   //joten tässä testissä eka lähetän blogin ja sitten poistan sen.
    const blog = helper.testPostBlog  
    const request = await api
    .post('/api/blogs')
    .set('authorization', `bearer ${currentUser.token}`)
    .send(blog)

    const blogToDelete = request.body.id

    await api
     .delete(`/api/blogs/${blogToDelete}`)
     .set('authorization', `bearer ${currentUser.token}`)
     .expect(204)
     const blogAtEnd = await helper.blogsInDb()
     expect(blogAtEnd).toHaveLength(blogs.length) //Mikä muuttaa testin vähän oudoksi koska lopussa listan pituus on sama kuin alussa.. 
                                                  //Mutta sehän tarkoittaa että postaus ja poisto toimivat!
   })
  test('if blogs likes are not defined set to 0', async () => {
  const blog = helper.likesUndefinedBlog
   await api
   .post('/api/blogs')
   .set('authorization', `bearer ${currentUser.token}`)
   .send(blog)
   const blogsAtend = await helper.blogsInDb()
   expect(blogsAtend[(blogsAtend.length - 1)].likes).toBe(0)
  })
  test('_id is set to id', async () => {
  const blog = helper.testPostBlog
  await api
   .post('/api/blogs')
   .send(blog)

   const blogAtEnd = await helper.blogsInDb()
   expect(blogAtEnd[0].id).toBeDefined()
  })
   test('sending blog without all parametres doesnt go thorugh', async () => {
    const blog = helper.malformBlog
    await api
     .post('/api/blogs')
     .send(blog)
     .expect(blog).rejects
  })
})

afterAll(() => {
  mongoose.connection.close()
})
