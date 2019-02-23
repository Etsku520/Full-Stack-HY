export const votedNotification = (content) => {
  return {
    type: 'VOTED',
    data: content
  }
}

export const createdNotification = (content) => {
  return {
    type: 'CREATED',
    data: content
  }
}

export const eraseNotification = () => {
  return {
    type: 'ERASE'
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'VOTED':
    return `you voted '${action.data}'`

    case 'CREATED':
    return `you created a new anecdote '${action.data}'`

    case 'ERASE':
    return null

    default:
    return state
  }
}

export default notificationReducer