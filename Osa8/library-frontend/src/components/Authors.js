import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const EDIT_AUTHOR = gql`
mutation updateAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
  }
}
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const editAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const updateAuhtor = async (e) => {
    e.preventDefault()

    console.log(name, born)
    await editAuthor({
      variables: { name, born: Number(born) }
    })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set Birthday</h3>
      <form onSubmit={updateAuhtor}>
        <div>
          name:
          <input 
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          born:
          <input
            type="number"
            value={born}
            onChange={event => setBorn(event.target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors