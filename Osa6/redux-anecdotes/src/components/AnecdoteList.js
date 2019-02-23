import React from 'react'
import { connect } from 'react-redux'
import { giveVoteTo } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.giveVoteTo(id)
    const content = props.anecdotes.find(a => a.id === id).content
    props.setNotification(`you voted '${content}'`, 10)
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
  console.log(state.anecdotes)
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
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)