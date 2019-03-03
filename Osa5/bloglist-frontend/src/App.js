import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { Container, Table, Button, Form } from 'semantic-ui-react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Navbar from './components/Navbar'
import { removeBlog, addLike, addComment } from './reducers/blogReducer'
import { makeNotification } from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

import blogService from './services/blogs'
import { useField } from './hooks'

const App = ({
  blogs,
  removeBlog,
  addLike,
  createBlog,
  initBlogs,
  addComment,
  makeNotification,
  login,
  user
}) => {
  const username = useField('text')
  const password = useField('password')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFromRef = React.createRef()

  const likeHandler = async blog => {
    addLike(blog.id)
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
      newBlog: { title, author, url, comments: [] },
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
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Users</Table.HeaderCell>
              <Table.HeaderCell>Added Blogs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(stats).map(p => (
              <Table.Row key={p}>
                <Table.Cell>
                  <Link to={`/users/${p}`}>{stats[p].user.name}</Link>
                </Table.Cell>
                <Table.Cell>{stats[p].blogs.length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }

  const showBlog = id => {
    const commentHandler = target => {
      const value = target.comment.value
      addComment(value, id)

      makeNotification(`Comment '${value}' has been added`, 'note')
    }

    const blog = blogs.find(b => b.id === id)
    if (!blog) return null
    return (
      <div>
        <div>{`${blog.title} by ${blog.author}`}</div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {`${blog.likes} tykkäystä`}
          <Button onClick={() => likeHandler(blog)}>tykkää</Button>
        </div>
        <div>lisännyt {blog.user.name}</div>
        {user && user.username === blog.user.username ? (
          <Button onClick={() => deleteHandler(blog)}>poista</Button>
        ) : null}
        <h3>comments</h3>
        <Form onSubmit={({ target }) => commentHandler(target)}>
          <Form.Field>
            <input name='comment' type='text' />
            <Button type='submit'>add comment</Button>
          </Form.Field>
        </Form>
        <ul>
          {blog.comments.map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
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
    <Container>
      <Router>
        <div>
          <Navbar />
          <h2>blogs</h2>
          <Notification />
          <Route
            exact
            path='/'
            render={() => (user ? loggedIn() : <Redirect to='/login' />)}
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
          <Route
            path='/login'
            render={() => (!user ? loginForm() : <Redirect to='/' />)}
          />
        </div>
      </Router>
    </Container>
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
  removeBlog,
  addComment
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default connectedApp
