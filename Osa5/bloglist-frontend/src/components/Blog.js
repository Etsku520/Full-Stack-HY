import React, { useState } from 'react'
import { connect } from 'react-redux'
import { removeBlog, addLike } from './../reducers/blogReducer'
import { makeNotification } from './../reducers/notificationReducer'

const Blog = ({ blog, addLike, removeBlog, makeNotification, user }) => {
  const [full, setFull] = useState(false)
  console.log(blog)
  const toggleView = () => setFull(!full)
  const likeHandler = async () => {
    try {
      addLike(blog.id)
    } catch (error) {
      makeNotification('jotain meni pieleen', 'error')
    }
  }

  const deleteHandler = async () => {
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

  const fullView = () => (
    <>
      <div onClick={toggleView}>{`${blog.title} by ${blog.author}`}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {`${blog.likes} tykkäystä`}
        <button onClick={likeHandler}>tykkää</button>
      </div>
      <div>lisännyt {blog.user.name}</div>
      {user && user.username === blog.user.username ? (
        <button onClick={deleteHandler}>poista</button>
      ) : null}
    </>
  )

  return (
    <div className='blog'>
      {full ? (
        fullView()
      ) : (
        <div onClick={toggleView}>
          {blog.title} by {blog.author}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  removeBlog: removeBlog,
  addLike: addLike,
  makeNotification: makeNotification
}

const connectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default connectedBlog
