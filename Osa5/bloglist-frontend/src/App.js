import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Navbar from './components/Navbar'
import { removeBlog, addLike } from './reducers/blogReducer'
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

  const likeHandler = async blog => {
    try {
      addLike(blog.id)
    } catch (error) {
      makeNotification('jotain meni pieleen', 'error')
    }
  }

  const deleteHandler = async blog => {
    try {
      if (window.confirm()) {
        removeBlog(blog.id)

        makeNotification(
          `blogi ${blog.title} by ${blog.author} on poistettu`,
          'note'
        )
      }
    } catch (error) {
      makeNotification('jotain meni pieleen', 'error')
    }
  }

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

  const showBlog = id => {
    const blog = blogs.find(b => b.id === id)
    if (!blog) return null
    return (
      <div>
        <div>{`${blog.title} by ${blog.author}`}</div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {`${blog.likes} tykkäystä`}
          <button onClick={() => likeHandler(blog)}>tykkää</button>
        </div>
        <div>lisännyt {blog.user.name}</div>
        {user && user.username === blog.user.username ? (
          <button onClick={() => deleteHandler(blog)}>poista</button>
        ) : null}
      </div>
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

    if (!userStats) {
      return null
    }

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
        <Navbar />
        <h2>blogs</h2>
        <Notification />
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
        <Route
          path='/blogs/:id'
          render={({ match }) => showBlog(match.params.id)}
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
  logout,
  addLike,
  removeBlog
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
