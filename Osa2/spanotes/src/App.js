import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {  
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect (() => {
        noteService
        .getAll()
        .then(response => setNotes(response))

    }, [])

    console.log('render', notes.length, 'notes')

    const notesToShow = showAll    
        ? notes    
        : notes.filter(note => note.important)

    const toggleImportanceOf = id => {    
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(note.id, changedNote)      
            .then(response => {        
                setNotes(notes.map(note => 
                    note.id !== id ? note : response))      
            })
            .catch(error => {      
                alert(        
                        `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`      
                    )      
                    setNotes(notes.filter(n => n.id !== id))    })
    }

    const rows = () => notesToShow.map(note => 
            <Note 
                key={note.id} 
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )

    
    
    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        noteService      
        .create(noteObject)      
        .then(response => {        
            setNotes(notes.concat(response.data))        
            setNewNote('')      
        })
    }

    const handleNoteChange = (event) => {   
        setNewNote(event.target.value)  
    }

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <div>        
          <button onClick={() => setShowAll(!showAll)}>          
            näytä {showAll ? 'vain tärkeät' : 'kaikki' }        
          </button>      
      </div>
      <ul>
       {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input 
            value={newNote}
            onChange={handleNoteChange}
        />
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default App