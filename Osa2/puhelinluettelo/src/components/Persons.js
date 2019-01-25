import React from 'react'

const Persons = ({ filtered }) => (
    filtered.map(person => 
        <div key={person.name}>
            {person.name} {person.number}
        </div>
    )
)

export default Persons