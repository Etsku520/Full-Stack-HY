import React from 'react'
import { render } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let blog

  beforeEach(() => {
    blog = {
      title: 'Embedded in Academia',
      author: 'John Regehr',
      likes: 5
    }

    const mockHandler = jest.fn()

    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  it('blog title, author and likes, are rendered', () => {
    const name = component.container.querySelector('.name')
    expect(name).toHaveTextContent(`${blog.title} ${blog.author}`)

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(`blog has ${blog.likes} likes`)
  })
})
