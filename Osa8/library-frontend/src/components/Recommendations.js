import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

const ALL_BOOKS = gql`
{
  allBooks {
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

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)
  const result2 = useQuery(ME)
  if (!props.show) {
    return null
  }

  if (result.loading || result2.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genre = result2.data.me.favoriteGenre

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
          {books.filter(b => b.genres.includes(genre))
          .map(a =>
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