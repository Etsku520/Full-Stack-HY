import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [ newName, setNewName ] = useState('')

  const onChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {
        name: newName
    }

    const found = 
        persons.filter(person => person.name === newName).length > 0

    found ? 
    alert(`${newName} on jo luettelossa`)
    : setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const rows = () => persons.map(person => 
                        <div key={person.name}>
                            {person.name}
                        </div>
                    )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input 
            value={newName} 
            onChange={onChangeHandler}
        />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App