import React from 'react'
import { createAnecdote } from './../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
  const newAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }
   return (
  <form onSubmit={newAnecdote}>
    <div><input name="anecdote"/></div>
    <button>create</button>
  </form>
   )
}

export default AnecdoteForm