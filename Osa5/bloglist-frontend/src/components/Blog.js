import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {
  const [full, setFull] = useState(false)

  const toggleView = () => setFull(!full)
  const likeHandler = async () => {
    try {
      const updated = await blogService.update({
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      })

      console.log(updated)
      updateBlogs(updated)
      return updated
    } catch (error) {
      console.log(error)
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

export default Blog
