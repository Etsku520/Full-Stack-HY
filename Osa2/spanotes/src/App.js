import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('virhe...')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(response => setNotes(response))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return <div className='error'>{message}</div>
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science 2019</em>
      </div>
    )
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(note.id, changedNote)
      .then(response => {
        setNotes(notes.map(note => (note.id !== id ? note : response)))
      })
      .catch(error => {
        setErrorMessage(`muistiinpano '${note.content}' poistettu palvelimelta`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const rows = () => {
    return notesToShow.map(note => {
      return (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
        />
      )
    })
  }

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService.create(noteObject).then(response => {
      setNotes(notes.concat(response))
      setNewNote('')
    })
  }

  const handleNoteChange = event => {
    setNewNote(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>kirjaudu</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type='submit'>tallenna</button>
    </form>
  )

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <Notification message={errorMessage} />
      <h2>Kirjaudu</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki'}
        </button>
      </div>
      <ul>{rows()}</ul>
      <Footer />
    </div>
  )
}

export default App
