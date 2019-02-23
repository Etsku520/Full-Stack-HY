import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

const createNew = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async id => {
  const all = await getAll()
  const anec = all.find(a => a.id === id)
  const response = await axios
    .put(`${baseUrl}/${anec.id}`, {...anec, votes: anec.votes + 1} )
  return response.data
}

export default { getAll, createNew, addVote }