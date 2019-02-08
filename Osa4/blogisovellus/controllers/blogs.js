const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) {
    request.body = { ...request.body, likes: 0}
  }
  const blog = new Blog(request.body)
  if (blog.url && blog.title) {
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(400)
  }
})

module.exports = blogsRouter