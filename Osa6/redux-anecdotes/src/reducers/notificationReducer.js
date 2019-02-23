export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTE',
      data: content
    })

    setTimeout(() => {dispatch({type: 'ERASE'})}, time*1000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTE':
    return action.data

    case 'ERASE':
    return null

    default:
    return state
  }
}

export default notificationReducer