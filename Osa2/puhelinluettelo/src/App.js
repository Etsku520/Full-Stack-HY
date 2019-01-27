import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons.js'
import personService from './sevices/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(people => setPersons(people))
  }, [])

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
      setNewNumber(event.target.value)
  }

  const deleteName = (event) => {
    if (window.confirm("Do you really want to delete this?")) {
      const id = parseInt(event.target.value, 10)
      const deletedPerson = persons.find(p => p.id === id)
      const newPersons = persons.filter(person => person.id !== id)
      personService.eradicate(id)
      .then(() => {
        setPersons(newPersons)
        
        setMessage(`Onnistuit poistamaan henkilön ${deletedPerson.name}`)

        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
    }
  }

  const changeNumber = (id, newPerson) => {
    personService.changeNumber(id, newPerson)
      .then(updated =>  {
        setPersons(persons.map(p => 
          p.id !== id ? p: updated))

        setNewName('')
        setNewNumber('')
        setMessage(`Onnistuit muuttamaan henkilön ${updated.name} numeron`)

        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
  }

  const Messenger = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className='message'>
        {message}
      </div>
    )
  }

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {
        name: newName,
        number: newNumber
    }

    const found = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

    if (found.length > 0) {
      const id = found[0].id
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        changeNumber(id, newPerson)
      }
      
    } else {
       personService.create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        setMessage(`Onnistuit lisäämään henkilön ${person.name}`)

        setTimeout(() => {
          setMessage(null)
        }, 6000)
      })
    }
    
  }

  const filtered = persons.filter(person => 
    person.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Messenger message={message} />
      <div>
          rajaa näytettäviä 
          <Filter 
            searchText={searchText} 
            setSearchText={setSearchText}
          />
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