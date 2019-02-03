import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons.js'
import personService from './sevices/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(people => setPersons(people))
  }, [])

  const onChangeName = event => {
    setNewName(event.target.value)
  }

  const onChangeNumber = event => {
    setNewNumber(event.target.value)
  }

  const deleteName = event => {
    if (window.confirm('Do you really want to delete this?')) {
      const id = event.target.value
      const deletedPerson = persons.find(p => p.id === id)
      const newPersons = persons.filter(person => person.id !== id)
      personService.eradicate(id).then(() => {
        setPersons(newPersons)

        setMessage({
          text: `Onnistuit poistamaan henkilön ${deletedPerson.name}`,
          type: 'message'
        })

        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
    }
  }

  const changeNumber = (id, newPerson) => {
    personService
      .changeNumber(id, newPerson)
      .then(updated => {
        setPersons(persons.map(p => (p.id !== id ? p : updated)))

        setNewName('')
        setNewNumber('')
        setMessage({
          text: `Onnistuit muuttamaan henkilön ${updated.name} numeron`,
          type: 'message'
        })

        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
      .catch(() => {
        setMessage({
          text: `Henkilö ${newPerson.name} ei enää ole tietokannassa`,
          type: 'error'
        })

        setPersons(persons.filter(p => p.id !== id))

        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
  }

  const Messenger = ({ message }) => {
    if (message === null) {
      return null
    }

    return <div className={message.type}>{message.text}</div>
  }

  const addName = event => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const found = persons.filter(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (found.length > 0) {
      const id = found[0].id
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        changeNumber(id, newPerson)
      }
    } else {
      personService.create(newPerson).then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        setMessage({
          text: `Onnistuit lisäämään henkilön ${person.name}`,
          type: 'message'
        })

        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
    }
  }

  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Messenger message={message} />
      <div>
        rajaa näytettäviä
        <Filter searchText={searchText} setSearchText={setSearchText} />
      </div>
      <h2>Lisää uusi</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        onChangeName={onChangeName}
        newNumber={newNumber}
        onChangeNumber={onChangeNumber}
      />
      <h3>Numerot</h3>
      <Persons filtered={filtered} deleteHandler={deleteName} />
    </div>
  )
}

export default App
