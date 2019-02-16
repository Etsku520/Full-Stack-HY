import React from 'react'

const LoginForm = ({ handleSubmit, username, password }) => {
  const { reset: reset1, ...noResetUser } = username
  const { reset: reset2, ...noResetPassword } = password

  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input {...noResetUser} />
        </div>
        <div>
          salasana
          <input {...noResetPassword} />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm
