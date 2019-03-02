import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { makeNotification } from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

import blogService from './services/blogs'
import { useField } from './hooks'

const App = ({
  blogs,
  createBlog,
  initBlogs,
  makeNotification,
  login,
  logout,
  user
}) => {
  const username = useField('text')
  const password = useField('password')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFromRef = React.createRef()

  const newBlogHandler = async event => {
    event.preventDefault()

    blogFromRef.current.toggleVisibility()
    createBlog({
      newBlog: { title, author, url },
      user: { username: user.username, name: user.name }
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    makeNotification(`uusi blogi ${title} by ${author} on lisätty`, 'note')
  }

  const logoutHandler = () => {
    logout()
    makeNotification('olet kirjautunut ulos', 'note')
  }

  const loginHandler = async event => {
    event.preventDefault()
    login({
      username: username.value,
      password: password.value
    })

    setTimeout(() => {
      if (!user) {
        makeNotification('käyttäjätunnus tai salasana virheellinen', 'error')
      }
    }, 50)

    username.reset()
    password.reset()
  }

  useEffect(() => {
    blogService.getAll().then(blogs => initBlogs(blogs))
  }, [])

  /*   useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) */

  const loginForm = () => (
    <>
      <Notification />
      <Togglable buttonLabel='kirjaudu'>
        <LoginForm
          username={username}
          password={password}
          handleSubmit={loginHandler}
        />
      </Togglable>
    </>
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
      {user ? <p>{user.name} on kirjautunut</p> : null}
      <h2>blogs</h2>
      <Notification />
      {user ? (
        <button onClick={logoutHandler}>kirjaudu ulos</button>
      ) : (
        loginForm()
      )}
      {user ? blogForm() : null}
      {showBlogs()}
    </div>
  )

  const showBlogs = () => (
    <div>
      {blogs
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )

  return <>{user ? loggedIn() : loginForm()}</>
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  createBlog,
  initBlogs,
  makeNotification,
  login,
  logout
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
