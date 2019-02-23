import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { eraseNotification, createdNotification} from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdotes'

const AnecdoteForm = (props) => {
  const newAnecdote = async (event) => {
    event.preventDefault()
    const value = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(value)
    console.log(newAnecdote.content)
    props.createAnecdote(newAnecdote)
    props.createdNotification(newAnecdote.content)
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