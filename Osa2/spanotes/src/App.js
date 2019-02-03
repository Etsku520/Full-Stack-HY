import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('virhe...')

  useEffect(() => {
    noteService.getAll().then(response => setNotes(response))
  }, [])

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

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? 'vain tärkeät' : 'kaikki'}
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>tallenna</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
