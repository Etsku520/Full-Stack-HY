import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog
  let user
  let mockUpdate = jest.fn()
  let mockRemove = jest.fn()
  let mockNotice = jest.fn()

  beforeEach(() => {
    blog = {
      title: 'Embedded in Academia',
      author: 'John Regehr',
      url: 'https://blog.regehr.org/',
      likes: 4,
      user: { username: 'mario', name: 'bros', id: '5c5f3f8e634e241de068941e' },
      id: '5c67dcec6aeaa4725f22fd87'
    }

    user = {
      username: 'HerraK',
      name: 'Kernel'
    }

    mockUpdate = jest.fn()
    mockRemove = jest.fn()
    mockNotice = jest.fn()

    component = render(
      <Blog
        blog={blog}
        updateBlogs={mockUpdate}
        removeBlog={mockRemove}
        noticeHandler={mockNotice}
        user={user}
      />
    )
  })

  it('Only title and author are shown first', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title} by ${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
    expect(div).not.toHaveTextContent(`${blog.likes} tykkäystä`)
    expect(div).not.toHaveTextContent(`lisännyt ${blog.user.name}`)
  })

  it('Shows all information after clicking', () => {
    const button = component.getByText(`${blog.title} by ${blog.author}`)
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title} by ${blog.author}`)
    expect(div).toHaveTextContent(`${blog.url}`)
    expect(div).toHaveTextContent(`${blog.likes} tykkäystä`)
    expect(div).toHaveTextContent(`lisännyt ${blog.user.name}`)
  })
})
