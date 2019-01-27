import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [weather, setWeather] = useState([])
    
    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => setCountries(response.data))

        setWeather(weatherError('ei ole olemassa'))
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

    const specifics = () => {
        if (weather.location.name !== filtered[0].capital) {
            axios
            .get(`http://api.apixu.com/v1/current.json?key=57ee1517bc944a228b4172409192601&q=${filtered[0].capital}`)
            .then(response => setWeather(response.data))
            .catch(() => setWeather(weatherError(filtered[0].capital)))
        }

        return (
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
                <h3>Weather in {filtered[0].capital}</h3>
                <div>
                    <b>temperature: </b> {weather.current.temp_c} Celsius
                </div>
                <img style={{maxHeight: 200}}
                    src={weather.current.condition.icon} 
                    alt={weather.current.condition.text} />
                <div>
                    <b>wind: </b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}
                </div>
            </div>
        )
            }

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

    const weatherError = (capital) => ( {
        current: {
            temp_c: 'sorry, I think my perfect app sent too many fetches at somepoint (like 6000), but lets say the temperature is -1 ',
            condition: {
                icon: 'https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Sad_Emoji_large.png?v=1542436016',
                text: 'sad face'
            },
            wind_kph: 'you can try again, sometimes it might still work. Now going 20',
            wind_dir: 'sadness land'
        },
        location: {
            name: capital
        }
    })

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