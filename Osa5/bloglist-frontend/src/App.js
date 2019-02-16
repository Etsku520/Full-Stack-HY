import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
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

  const blogFromRef = React.createRef()

  const newBlogHandler = async event => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })

      blogFromRef.current.toggleVisibility()
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

  const updateBlogs = blog => {
    const newBlogs = blogs.map(b =>
      b.id != blog.id ? b : { ...b, likes: blog.likes }
    )
    setBlogs(newBlogs)
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
    <Togglable buttonLabel='kirjaudu'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={loginHandler}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='uusi blogi' ref={blogFromRef}>
      <BlogForm
        title={title}
        author={author}
        url={url}
        titleHandler={({ target }) => setTitle(target.value)}
        authorHandler={({ target }) => setAuthor(target.value)}
        urlHandler={({ target }) => setUrl(target.value)}
        submitHandler={newBlogHandler}
      />
    </Togglable>
  )

  const loggedIn = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user ? <button onClick={logout}>kirjaudu ulos</button> : null}
      {user ? blogForm() : null}
      {showBlogs()}
    </div>
  )

  const showBlogs = () => (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} />
      ))}
    </div>
  )

  return (
    <>
      {user ? <p>{user.name} on kirjautunut</p> : loginForm()}
      {loggedIn()}
    </>
  )
}

export default App
