import React from 'react'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input {...username} />
        </div>
        <div>
          salasana
          <input {...password} />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm
