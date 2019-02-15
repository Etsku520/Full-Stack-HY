import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loginHandler = async event => {
    event.preventDefault()
    try {
      console.log(username, password)
      const logged = await loginService.login({
        username,
        password
      })

      blogService.setToken(logged.token)
      setUser(logged)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('käyttäjätunnus tai salasana virheellinen')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const loginForm = () => (
    <div>
      <h1>Kirjaudu sisään</h1>
      <form onSubmit={loginHandler}>
        <div>
          käyttäjätunnus:
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana:
          <input
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} on kirjautunut</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return <>{user ? showBlogs() : loginForm()}</>
}

export default App
