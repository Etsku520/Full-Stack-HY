import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

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

  const showUsers = () => {
    let stats = {}
    blogs.forEach(b => {
      if (b.user.id in stats) {
        stats[b.user.id].blogs.push(b)
      } else {
        stats[b.user.id] = { user: b.user, blogs: [b] }
      }
    })

    return (
      <>
        <h2>Users</h2>
        {Object.keys(stats).map(p => (
          <div key={p}>
            <Link to={`/users/${p}`}>
              {stats[p].user.name} {stats[p].blogs.length}
            </Link>
          </div>
        ))}
      </>
    )
  }

  const loggedIn = () => (
    <div>
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

  const showUser = id => {
    let stats = {}
    blogs.forEach(b => {
      if (b.user.id in stats) {
        stats[b.user.id].blogs.push(b)
      } else {
        stats[b.user.id] = { user: b.user, blogs: [b] }
      }
    })

    const userStats = stats[id]

    return (
      <>
        <h2>{userStats.user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {userStats.blogs.map(b => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <Router>
      <div>
        {user ? <p>{user.name} on kirjautunut</p> : null}
        <h2>blogs</h2>
        <Notification />
        {user ? <button onClick={logoutHandler}>kirjaudu ulos</button> : null}
        <Route
          exact
          path='/'
          render={() => (user ? loggedIn() : loginForm())}
        />
        <Route exact path='/users' render={() => showUsers()} />
        <Route
          path='/users/:id'
          render={({ match }) => showUser(match.params.id)}
        />
      </div>
    </Router>
  )
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
