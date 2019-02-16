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
})
