import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    
    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => setCountries(response.data))
    },[])

    const filtered = 
        countries.filter(country => 
            country.name.toLowerCase()
            .includes(filter.toLowerCase())
        )

    const Languages = ({ languages }) => (
        <ul>
        {languages.map(language =>
            <li key={language.name}>{language.name}</li>)
        }
        </ul>
    )

    const specifics = () => (
        <div>
            <h1>{filtered[0].name}</h1>
            <div>capital {filtered[0].capital}</div>
            <div>population {filtered[0].population}</div>
            <h2>languages</h2>
            <Languages languages={filtered[0].languages} />
            <img style={{maxHeight: 200}}
                src={filtered[0].flag}
                alt={`flag of ${filtered[0].name}`}     
            />
        </div>
    )

    const rows = () => (
        filtered.length > 10 
        ? <div>Too many countries</div>
        : filtered.length === 1 
        ? specifics()
        : filtered.map(country => 
            <div key={country.name}>
                {country.name} 
                <button onClick={() => setFilter(country.name)}>
                    show
                </button>
            </div>
        )
    )

    return (
        <>
        <div>
            Search for a country 
            <input 
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
            />
        </div>
        {rows()}
        </>
    )
}

export default App