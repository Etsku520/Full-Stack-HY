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
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    ...body
  }
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updated.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter