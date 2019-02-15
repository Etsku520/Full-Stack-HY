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
  const [message, setMessage] = useState(null)
  const [classN, setClassN] = useState('error')
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
      setClassN('note')
      setMessage(`uusi blogi ${newBlog.title} by ${newBlog.author} on lisätty`)

      setTimeout(() => {
        setMessage(null)
      }, 7000)
    } catch (error) {
      setClassN('error')
      setMessage('uuden blogin luonti epäonnistui')

      setTimeout(() => {
        setMessage(null)
      }, 7000)
      console.log('auth error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    setClassN('note')
    setMessage(`olet kirjautunut ulos`)

    setTimeout(() => {
      setMessage(null)
    }, 7000)
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
      setClassN('error')
      setMessage('käyttäjätunnus tai salasana virheellinen')

      setTimeout(() => {
        setMessage(null)
      }, 7000)
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

  const Notification = () => {
    if (message === null) {
      return null
    }

    return <div className={classN}>{message}</div>
  }

  const loginForm = () => (
    <div>
      <h1>Kirjaudu sisään</h1>
      <Notification />
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
      <Notification />
      <p>{user.name} on kirjautunut</p>
      <button onClick={logout}>kirjaudu ulos</button>
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
