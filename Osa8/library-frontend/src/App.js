import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginFrom'
import Recommendations from './components/Recommendations'
import { useApolloClient } from 'react-apollo-hooks'

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

    </div>
  )
}

export default App
