import { useActionState, useState } from 'react'

// const Hello = ({ name, age }) => {
//   // const name = props.name
//   // const age = props.age
//   // Destructuring instead
//   // const { name, age} = props

//   const bornYear = () => new Date().getFullYear() - age
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// function App() {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26+10} />
//       <Hello name ={name} age={age} />
//     </div>
   
//   )
// }
const App = () => {
  const [ counter, setCounter] = useState(0)

  // const handleClick = () => {
  //   console.log('clicked')
  // }

  // setTimeout(
  //   () => setCounter(counter + 1), 1000
  // )

  // console.log('rendering...', counter)
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>

    </div>
    
  )
}

export default App
