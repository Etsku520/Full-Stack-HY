import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [full, setFull] = useState(false)
  const toggleView = () => setFull(!full)

  const fullView = () => (
    <>
      <div onClick={toggleView}>{`${blog.title} by ${blog.author}`}</div>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {`${blog.likes} tykkäystä`}
        <button onClick={() => console.log('tykätty')}>tykkää</button>
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
