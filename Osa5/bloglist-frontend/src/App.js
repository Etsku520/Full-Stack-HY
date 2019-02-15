import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  const newBlogHandler = async event => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })

      setBlogs(blogs.concat(newBlog))
    } catch (error) {
      console.log(error)
    }
  }

  const loginHandler = async event => {
    event.preventDefault()
    try {
      const logged = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(logged))
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

  const blogForm = () => (
    <>
      <h2>Luo uusi blogi</h2>
      <form onSubmit={newBlogHandler}>
        <div>
          otsikko:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          kirjoittaja:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>luo</button>
      </form>
    </>
  )

  const loggedIn = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} on kirjautunut</p>
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
        }}
      >
        kirjaudu ulos
      </button>
      {blogForm()}
      {showBlogs()}
    </div>
  )

  const showBlogs = () => (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return <>{user ? loggedIn() : loginForm()}</>
}

export default App
