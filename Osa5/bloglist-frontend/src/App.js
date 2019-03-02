import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { makeNotification } from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = ({ blogs, createBlog, initBlogs, makeNotification }) => {
  const username = useField('text')
  const password = useField('password')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  const blogFromRef = React.createRef()

  const newBlogHandler = async event => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url
      }

      blogFromRef.current.toggleVisibility()
      createBlog({
        newBlog,
        user: { username: user.username, name: user.name }
      })
      makeNotification(
        `uusi blogi ${newBlog.title} by ${newBlog.author} on lisätty`,
        'note'
      )
    } catch (error) {
      makeNotification('uuden blogin luonti epäonnistui', 'error')
      console.log('auth error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    makeNotification('olet kirjautunut ulos', 'note')
  }

  const loginHandler = async event => {
    event.preventDefault()
    try {
      console.log('start')
      const logged = await loginService.login({
        username: username.value,
        password: password.value
      })

      console.log('still here')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(logged))
      blogService.setToken(logged.token)
      setUser(logged)
      username.reset()
      password.reset()
    } catch (error) {
      makeNotification('käyttäjätunnus tai salasana virheellinen', 'error')
      console.log('error')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => initBlogs(blogs))
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
      {user ? <button onClick={logout}>kirjaudu ulos</button> : loginForm()}
      {user ? blogForm() : null}
      {showBlogs()}
    </div>
  )

  const showBlogs = () => (
    <div>
      {blogs
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )

  return <>{user ? loggedIn() : loginForm()}</>
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createBlog: createBlog,
  initBlogs: initBlogs,
  makeNotification: makeNotification
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
