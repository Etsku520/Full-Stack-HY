import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
        <>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </>
    )
}

const App = () => {
    console.log('Hello from komponentti')
    const now = new Date()
    const a = 17
    const b = 455
    const ika = 12

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Jaska" age={11 +14}/>
            <Hello name="Joku" age={ika}/>
            <p>It is now {now.toString()}</p>
            <p>
                {a} plus {b} is {a + b}
            </p>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
