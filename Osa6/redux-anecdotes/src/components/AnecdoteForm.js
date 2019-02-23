import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { eraseNotification, createdNotification} from './../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const newAnecdote = async (event) => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(value)
    props.createdNotification(value)
    setTimeout(() => {
      props.eraseNotification()
    }, 5000)
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