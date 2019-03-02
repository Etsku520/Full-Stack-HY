import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import { logout } from './../reducers/userReducer'
import { makeNotification } from './../reducers/notificationReducer'

const Navbar = ({ user, logout, makeNotification }) => {
  const logoutHandler = () => {
    logout()
    makeNotification('olet kirjautunut ulos', 'note')
  }

  return (
    <Menu inverted>
      <Menu.Item link>
        <Link to='/'>blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to='/users'>users</Link>
      </Menu.Item>
      <Menu.Item link>
        {user ? (
          <em>
            {user.name} logged in{' '}
            <Button animated secondary onClick={logoutHandler}>
              <Button.Content visible>kirjaudu ulos</Button.Content>
              <Button.Content hidden>logout</Button.Content>
            </Button>
          </em>
        ) : (
          <Link to='/login'>login</Link>
        )}
      </Menu.Item>
    </Menu>
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
