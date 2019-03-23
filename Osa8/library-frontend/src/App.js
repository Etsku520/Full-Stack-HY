import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginFrom'
import Recommendations from './components/Recommendations'
import { useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Subscription } from 'react-apollo'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        id
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

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

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {token 
        ? [<button key="this" onClick={() => setPage('add')}>add book</button>,
        <button key="the" onClick={() => setPage("recommendations")}>recommend</button>, 
        <button key="that" onClick={logout}>logout</button>]
        : <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({subscriptionData}) => {
          const addedBook = subscriptionData.data.bookAdded
          window.alert(`${addedBook.title} added`)

          const dataInStore = client.readQuery({ query: ALL_BOOKS })
          if (!dataInStore.allBooks.includes(addedBook)) {
            dataInStore.allBooks.push(addedBook)
            client.writeQuery({
              query: ALL_BOOKS,
              data: dataInStore
            })
          }
        }}
        >
        {() => null}
      </Subscription>
    </div>
  )
}

export default App
