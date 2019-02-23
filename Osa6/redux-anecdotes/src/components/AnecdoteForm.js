import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { eraseNotification, createdNotification} from './../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const newAnecdote = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    props.createdNotification(event.target.anecdote.value)
    setTimeout(() => {
      props.eraseNotification()
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

const mapDispatchToProps = {
  createAnecdote,
  eraseNotification,
  createdNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)