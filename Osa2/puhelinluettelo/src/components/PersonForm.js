import React from 'react'

const PersonForm = ({ addName, newName, onChangeName, newNumber, onChangeNumber }) => (
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
)

export default PersonForm