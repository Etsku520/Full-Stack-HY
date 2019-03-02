import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  if (props.notification === null) {
    return null
  }

  const { content, classN } = props.notification

  return <div className={classN}>{content}</div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
