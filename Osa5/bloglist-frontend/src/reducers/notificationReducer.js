export const makeNotification = (content, calssN) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTE',
      data: {
        content,
        calssN
      }
    })

    clearTimeout()

    setTimeout(() => {
      dispatch({ type: 'ERASE' })
    }, 10 * 1000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTE':
      return {
        content: action.data.content,
        calssN: action.data.calssN
      }

    case 'ERASE':
      return null

    default:
      return state
  }
}

export default notificationReducer
