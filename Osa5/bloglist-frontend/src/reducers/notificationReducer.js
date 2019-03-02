export const makeNotification = (content, classN) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTE',
      data: {
        content,
        classN
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
        classN: action.data.classN
      }

    case 'ERASE':
      return null

    default:
      return state
  }
}

export default notificationReducer
