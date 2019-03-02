import React from 'react'
import { Form, Button } from 'semantic-ui-react'

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
    <Form onSubmit={submitHandler}>
      <Form.Field>
        <label>otsikko:</label>
        <input type='text' value={title} onChange={titleHandler} />
      </Form.Field>
      <Form.Field>
        <label>kirjoittaja:</label>
        <input type='text' value={author} onChange={authorHandler} />
      </Form.Field>
      <Form.Field>
        <label>url:</label>
        <input type='text' value={url} onChange={urlHandler} />
      </Form.Field>
      <Button type='submit'>luo</Button>
    </Form>
  </>
)

export default BlogForm
