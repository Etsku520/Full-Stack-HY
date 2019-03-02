import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = props => {
  if (props.notification === null) {
    return null
  }

  const { classN, content } = props.notification
  if (classN === 'note') {
    return <Message success>{content}</Message>
  }

  return <Message error>{content}</Message>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
