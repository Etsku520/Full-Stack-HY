import React from 'react';

const App = (props) => {
  const store = props.store
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    store.dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }

  const anecdoteForm = () => {
    const newAnecdote = (event) => {
      event.preventDefault()
      const anecdoteDispatch = {
        type: 'CREATE',
        data: event.target.anecdote.value
      }
      store.dispatch(anecdoteDispatch)
      event.target.anecdote.value = ''
    }
     return (
    <form onSubmit={newAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
     )
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      {anecdoteForm()}
    </div>
  )
}

export default App
