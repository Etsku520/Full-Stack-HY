import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const config = { headers: { Authorization: token } }
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const update = async blog => {
  const config = { headers: { Authorization: token } }
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.data
}

const remove = async id => {
  const config = { headers: { Authorization: token } }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request
}

const addComment = async (comment, id) => {
  const config = { headers: { Authorization: token } }
  const request = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  )
  return request
}

export default { getAll, token, setToken, create, update, remove, addComment }
