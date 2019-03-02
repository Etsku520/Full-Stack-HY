import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, username, password }) => {
  const { reset: reset1, ...noResetUser } = username
  const { reset: reset2, ...noResetPassword } = password

  return (
    <div>
      <h2>Kirjaudu</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>käyttäjätunnus</label>
          <input {...noResetUser} />
        </Form.Field>
        <Form.Field>
          <label>salasana</label>
          <input {...noResetPassword} />
        </Form.Field>
        <Button type='submit'>kirjaudu</Button>
      </Form>
    </div>
  )
}

export default LoginForm
