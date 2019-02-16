import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('kirjaudu'))
    // expectations here
    const blogs = component.container.querySelector('.blog')
    expect(blogs).toBe(null)
  })

  it('if user is logged in blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText(''))
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(4)
    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).toHaveTextContent('Canonical string reduction')
  })
})
