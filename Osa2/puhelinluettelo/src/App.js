import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchText, setSearchText ] = useState('')

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
      setNewNumber(event.target.value)
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
    : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      <Persons filtered={filtered} />
    </div>
  )

}

export default App