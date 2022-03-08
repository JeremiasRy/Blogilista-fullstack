const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

  blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  })
 
  blogRouter.get('/:id', async (request, response) => {
   const blog = await Blog.findById(request.params.id)
   response.json(blog.toJSON())
  })

  blogRouter.post('/', middleware.userGetter, async (request, response) => {
    const body = request.body
    const user = request.user
    if (body.likes === undefined) {
      body.likes = 0
    }
    const blog = new Blog ({
       title: body.title,
       author: body.author,
       url: body.url,
       likes: body.likes,
       user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  })

  blogRouter.delete('/:id', middleware.userGetter, async (request, response) => {
   const blog = await Blog.findById(request.params.id)
   const user = request.user
   if (blog.user.toString() === user.id) {
    await blog.delete()
    response.status(204).end()
   }
   response.status(401).end()
  })

  blogRouter.put('/:id', async (request, response) => {
    const upBlog = request.body
    const blog = await Blog.findByIdAndUpdate(upBlog.id, upBlog)
    response.json(blog.toJSON()).end()
  })

  blogRouter.post('/:id/comments', async (request, response) => {
    const randId = () => {
      return Math.floor(Math.random() * 1000000)
    }
    const blog = await Blog.findById(request.body.id)
    console.log(blog)
    const comment = {
      comment: request.body.comment,
      id: randId()
    }
    blog.comments.push(comment)
    await blog.save()
    response.json(blog.toJSON()).end()
  })


module.exports = blogRouter