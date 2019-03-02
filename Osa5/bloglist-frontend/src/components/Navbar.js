import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from './../reducers/userReducer'
import { makeNotification } from './../reducers/notificationReducer'

const Navbar = ({ user }) => {
  const logoutHandler = () => {
    logout()
    makeNotification('olet kirjautunut ulos', 'note')
  }

  const style = {
    backgroundColor: 'grey',
    padding: 5
  }

  return (
    <div style={style}>
      <Link to='/'>blogs</Link> <Link to='/users'>users</Link>{' '}
      {user ? <span>{user.name} on kirjautunut</span> : null}{' '}
      {user ? <button onClick={logoutHandler}>kirjaudu ulos</button> : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const ConnectedNavbar = connect(
  mapStateToProps,
  { logout, makeNotification }
)(Navbar)

export default ConnectedNavbar
