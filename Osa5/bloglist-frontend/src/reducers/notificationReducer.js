export const makeNotification = (content, calssN) => {
  return {
    type: 'SET_NOTE',
    data: {
      content,
      calssN
    }
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTE':
      return {
        content: action.data.content,
        calssN: action.data.calssN
      }

    default:
      return state
  }
}

export default notificationReducer
