import React from 'react'

const Persons = ({ filtered, deleteHandler }) => (
    filtered.map(person => 
        <div key={person.id}>
            {person.name} {person.number} <button value={person.id} onClick={deleteHandler}>poista</button>
        </div>
    )
)

export default Persons