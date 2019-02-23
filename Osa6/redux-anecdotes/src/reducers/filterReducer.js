export const changeFilter = (text) => {
  return {
    type: 'FILTER',
    data: text
  }
}

const filterReducer = (state = '', action) => {
  if (action.type === 'FILTER') return action.data
  return state
}

export default filterReducer