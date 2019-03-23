import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

const BOOKS_OF_GENRE = gql`
query books($genre: String!){
  allBooks (genre: $genre) {
    title
    published
    author {name, born, bookCount}
    genres
  }
}
`

const ME = gql`
{
  me {
    favoriteGenre
  }
}
`

const getGenre = () => {
  const result2 = useQuery(ME)
  if (result2.loading) {
    return null
  }
  return result2.data.me.favoriteGenre
}

const Recommendations = (props) => {
  const genre = getGenre()
  const result = useQuery(BOOKS_OF_GENRE, {variables: {genre: genre}})

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <div>books in your favorite genre <b>{genre}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations