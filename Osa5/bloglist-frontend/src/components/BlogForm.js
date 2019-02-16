import React from 'react'

const BlogForm = ({
  title,
  titleHandler,
  author,
  authorHandler,
  url,
  urlHandler,
  submitHandler
}) => (
  <>
    <h2>Luo uusi blogi</h2>
    <form onSubmit={submitHandler}>
      <div>
        otsikko:
        <input type='text' value={title} onChange={titleHandler} />
      </div>
      <div>
        kirjoittaja:
        <input type='text' value={author} onChange={authorHandler} />
      </div>
      <div>
        url:
        <input type='text' value={url} onChange={urlHandler} />
      </div>
      <button type='submit'>luo</button>
    </form>
  </>
)

export default BlogForm
