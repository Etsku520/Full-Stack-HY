const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltiness = 10
    const passwordHash = await bcrypt.hash(body.password, saltiness)

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await newUser.save()
    response.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter