import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
    return (
        <h1>
            {course.name}
        </h1>
    )
}

const Content = ({ parts }) => {
    const rows = () => parts.map(part => 
            <Part key={part.name} part={part} />
        )

    return (
        <>
            {rows()}
        </>
    )
}

const Total = ({ parts }) => {

    return (
        <p>
            yhteensä (placeholder) tehtävää
        </p>

    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Course = ({ course }) => (
    <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            },

            {
                name: 'Kokoelmien renderöinti ja moduulit',
                exercises: 5
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
