import axios from 'axios'
const baseUrl = '/api/notes'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const nonExisting = {
    id: 10000,
    content: 'Tätä muistiinpanoa ei ole palvelimelta',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  }

  return axios.get(baseUrl).then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const config = { headers: { Authorization: token } }
  return axios.post(baseUrl, newObject, config).then(response => response.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
}

export default { getAll, create, update, setToken }
