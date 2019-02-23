import React from 'react'
import { connect } from 'react-redux'
import { giveVoteTo } from './../reducers/anecdoteReducer'
import { eraseNotification, votedNotification} from './../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.giveVoteTo(id)
    const content = props.anecdotes.find(a => a.id === id).content
    props.votedNotification(content)
    setTimeout(() => {
      props.eraseNotification()
    }, 5000)
  }

  return (
    props.anecdotes
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
  )
}

const toShow = (state) => {
  return (
    state.anecdotes.filter(a => 
        a.content.toLowerCase()
        .includes(state.filter.toLowerCase())
      ).sort((a, b) => b.votes - a.votes)
  )
}
const mapStateToProps = (state) => {
  return {
    anecdotes: toShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  giveVoteTo,
  eraseNotification,
  votedNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)