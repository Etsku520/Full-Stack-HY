import React, { useState } from 'react'

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


  const rows = () => filtered.map(person => 
                        <div key={person.name}>
                            {person.name} {person.number}
                        </div>
                    )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
          rajaa näytettäviä 
          <input value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
      </div>
      <h2>Lisää uusi</h2>
      <form onSubmit={addName}>
        <div>
          nimi: 
            <input 
                value={newName} 
                onChange={onChangeName}
            />
        <div>
            numero: 
            <input 
                value={newNumber}
                onChange={onChangeNumber}
            />
        </div>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h3>Numerot</h3>
      {rows()}
    </div>
  )

}

export default App