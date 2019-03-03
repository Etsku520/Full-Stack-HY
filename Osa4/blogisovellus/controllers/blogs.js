const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body.likes) {
      request.body = { ...request.body, likes: 0 }
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user.id
    })

    if (blog.url && blog.title) {
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
    } else {
      response.status(400).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'not authorized for that' })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updated.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const id = request.params.id
  const comment = request.body.comment
  try {
    const blog = await Blog.findById(id)
    const updated = await Blog.findByIdAndUpdate(
      id,
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        comments: blog.comments.concat(comment)
      },
      {
        new: true
      }
    )
    response.json(updated.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
