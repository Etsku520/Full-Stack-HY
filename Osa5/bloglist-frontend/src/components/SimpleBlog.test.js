import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let blog
  let mockHandler

  beforeEach(() => {
    blog = {
      title: 'Embedded in Academia',
      author: 'John Regehr',
      likes: 5
    }

    mockHandler = jest.fn()

    component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  it('blog title, author and likes, are rendered', () => {
    const name = component.container.querySelector('.name')
    expect(name).toHaveTextContent(`${blog.title} ${blog.author}`)

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(`blog has ${blog.likes} likes`)
  })

  it('pressing like button twice calls funtion twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
