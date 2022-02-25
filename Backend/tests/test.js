const { restart } = require('nodemon')

const helper = require('../utils/list_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

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

test('delete specific blog', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDeleteId = blogs[0].id
  console.log(blogToDeleteId)
  await api
   .delete(`/api/blogs/${blogToDeleteId}`) 
   const blogAtEnd = await helper.blogsInDb()
   expect(blogAtEnd).toHaveLength(blogs.length - 1)
 })

describe('adding blogs', () => {
  test('blog is posted to database', async () => {
    const blog = helper.testPostBlog
    await api
     .post('/api/blogs')
     .send(blog)
     .expect(200)
     .expect('Content-Type', /application\/json/)

     const blogAtEnd = await helper.blogsInDb()
     expect(blogAtEnd).toHaveLength(helper.testBlogs.length + 1)

     const title = blogAtEnd.map(b => b.title)
     expect(title).toContain('Täh')
    })
 
  test('if blogs likes are not defined set to 0', async () => {
  const blog = helper.likesUndefinedBlog
  console.log(blog)
   await api
   .post('/api/blogs')
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
