import loginService from './../services/login'
import blogService from './../services/blogs'

export const login = content => {
  return async dispatch => {
    const logged = await loginService.login({
      username: content.username,
      password: content.password
    })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(logged))
    blogService.setToken(logged.token)

    dispatch({
      type: 'LOGIN',
      data: logged
    })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch({
      type: 'LOGOUT'
    })
  }
}

const initialState = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const logged = JSON.parse(loggedUserJSON)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(logged))
    blogService.setToken(logged.token)
    return logged
  }

  return null
}

const userReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data

    case 'LOGOUT':
      return null

    default:
      return state
  }
}

export default userReducer
