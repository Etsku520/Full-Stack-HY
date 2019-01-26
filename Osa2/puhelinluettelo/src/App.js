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
      const newPersons = persons.filter(person => person.id !== id)
      personService.eradicate(id)
      .then(setPersons(newPersons))
    }
  }

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {
        name: newName,
        number: newNumber
    }

    const found = 
        persons.filter(person => person.name === newName).length > 0

    found ? 
    alert(`${newName} on jo luettelossa`)
    : personService.create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
    
  }

  const filtered = persons.filter(person => 
    person.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div>
      <h2>Puhelinluettelo</h2>
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