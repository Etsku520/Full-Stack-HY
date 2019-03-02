import blogService from '../services/blogs'

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content.newBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: {
        ...newBlog,
        user: {
          username: content.user.username,
          name: content.user.name
        }
      }
    })
  }
}

export const addLike = id => {
  return async dispatch => {
    const all = await blogService.getAll()
    const blog = all.find(b => b.id === id)
    await blogService.update({ ...blog, likes: blog.likes + 1 })

    dispatch({
      type: 'ADD_LIKE',
      data: { id }
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const initBlogs = blogs => {
  return dispatch => {
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  let id
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.data)

    case 'ADD_LIKE':
      id = action.data.id
      return state.map(b => (b.id === id ? { ...b, likes: b.likes + 1 } : b))

    case 'REMOVE_BLOG':
      id = action.data.id
      return state.filter(b => b.id !== id)

    case 'INIT_BLOGS':
      return action.data

    default:
      return state
  }
}

export default blogReducer
