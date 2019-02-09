const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

describe('when there is initially one user at db', async () => {
  beforeEach(async () => {
    await User.remove({})
    const passwordHash = await bcrypt.hash('sekret', 10) 
    const user = new User({
      username: 'root',
      name:"roo",
      passwordHash
    })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'r',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)

    expect(result.body.error).toContain('`username`')
    expect(result.body.error).toContain('is shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'raaaaad',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body.error)

    expect(result.body.error).toContain('password must be at least')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})
