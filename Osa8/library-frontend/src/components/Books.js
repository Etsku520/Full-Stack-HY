import React, { useState } from 'react'
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

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const allBooksResult = useQuery(ALL_BOOKS)
  const result = !filter ? useQuery(ALL_BOOKS) : useQuery(BOOKS_OF_GENRE, {
    variables: {genre: filter}
  })
  if (!props.show) {
    return null
  }

  if (result.loading || allBooksResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = []
  allBooksResult.data.allBooks.forEach(book => {
    book.genres.forEach(genre => {
      !genres.includes(genre) ? genres.push(genre): console.log("duplicate")
    })
  });

  return (
    <div>
      <h2>books</h2>

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
      <div>
        <button onClick={() => setFilter(null)}>all genres</button>
        {genres.map(g => <button key={g} onClick={() => setFilter(g)}>{g}</button>)}
      </div>
    </div>
  )
}

export default Books