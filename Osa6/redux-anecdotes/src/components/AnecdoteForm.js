import React from 'react'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { eraseNotification, createdNotification} from './../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const newAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    store.dispatch(createdNotification(event.target.anecdote.value))
    setTimeout(() => {
      store.dispatch(eraseNotification())
    }, 5000)
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