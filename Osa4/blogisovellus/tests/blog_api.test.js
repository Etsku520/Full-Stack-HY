const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = helper.biggerList
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('return right number of JSON blogs', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(blogs.body.length).toBe(helper.biggerList.length)
})

test('the returned blogs have id field', async () => {
  const blogs = await api.get('/api/blogs')

  console.log(blogs.body[0])
  expect(blogs.body[0].id).toBeDefined()
})

test('adding a blog adds a post', async () => {
  const newBlog = {
    title: "Embedded in Academia",
    author: "John Regehr",
    url: "https://blog.regehr.org/",
    likes: 1
  }

  await api.post('/api/blogs').send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs.length).toBe(helper.biggerList.length + 1)
})

test('adding a blog without likes is automatically 0', async () => {
  const newBlog = {
    title: "Embedded in Academia",
    author: "John Regehr",
    url: "https://blog.regehr.org/"
  }

  await api.post('/api/blogs').send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs[blogs.length - 1].likes).toBe(0)
})

test('adding a blog without url or title returns 400 Bad request', async () => {
  const newTitlelessBlog = {
    author: "John Regehr",
    url: "https://blog.regehr.org/"
  }

  const newUrllessBlog = {
    title: "Embedded in Academia",
    author: "John Regehr"
  }

  api.post('/api/blogs').send(newTitlelessBlog)
    .expect(400)

  api.post('/api/blogs').send(newUrllessBlog)
    .expect(400)
})

test('deleting a blog deletes a post', async () => {
  await api.delete(`/api/blogs/${helper.biggerList[0]._id}`)
    .expect(204)

  blogs = await helper.blogsInDb()
  expect(blogs.length).toBe(helper.biggerList.length - 1)
})

afterAll(() => {
  mongoose.connection.close()
})