import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>
            {course.name}
        </h1>
    )
}

const Content = ({ parts }) => {
    const rows = () => parts.map(part => 
            <Part key={part.id} part={part} />
        )

    return (
        <>
            {rows()}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce( (s, p) => {
        if (isNaN(s.exercises)) {
            return s + p.exercises
        }
        return s.exercises + p.exercises
    })

    return (
        <p>
            yhteensä { total } tehtävää
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

export default Course