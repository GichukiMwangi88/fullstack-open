import { useState } from 'react'

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
// const Display = ({ counter }) => <div>{counter}</div>

// const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>
  

// const App = () => {
//   const [ counter, setCounter] = useState(0)
//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => {
//     console.log('increasing, value before', counter)
//     setCounter(counter + 1)}
//   const decreaseByOne = () => {
//     console.log('decreasing, value before', counter)
//     setCounter(counter - 1)}

//   const setToZero = () => {
//     console.log('resetting to zero, value before', counter)
//     setCounter(0)}

//   // const handleClick = () => {
//   //   console.log('clicked')
//   // }

//   // setTimeout(
//   //   () => setCounter(counter + 1), 1000
//   // )

//   // console.log('rendering...', counter)
//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button
//         onClick={increaseByOne}
//         text='plus'
//       />
//       <Button 
//         onClick={setToZero}
//         text='zero'
//       />
//       <Button
//         onClick={decreaseByOne}
//         text='minus' 
//       />

//     </div>
    
//   )
// }

// const History = (props) => {
//   console.log(props)
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = (props) => {
//   console.log('props value is ',props)
//   const { onClick, text } = props
//   return (
//     <button onClick={onClick}>{text}</button>
//   )

// }
// const App = () => {
//   const [left, setLeft] = useState(0)
//   console.log(left)
//   const [right, setRight] = useState(0)
//   console.log(right)
//   const [allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)
//   // const [clicks, setClicks] = useState({
//   //   left: 0, right: 0
//   // })

//   // Event handlers are functions, best defined separately

//   const handleLeftClick = () =>{ 
//     setAll(allClicks.concat('L'))
//     console.log('left before', left)
//     const updatedLeft = left + 1
//     setLeft(updatedLeft)
//     console.log('left after', left)
//     setTotal(updatedLeft + right)
//   } 
//     // const newClicks = {
//     //   ...clicks, // object spread syntax
//     //   left: clicks.left + 1,
//     //   //right: clicks.right
//     // setClicks({...clicks, left: clicks.left + 1})
   
  

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     const updatedRight = right + 1
//     setRight(updatedRight)
//     setTotal(left + updatedRight)
//   } 
//     // const newClicks = {
//     //   //left: clicks.left,
//     //   ...clicks,
//     //   right: clicks.right + 1
    
  

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text='Left' />
//       <Button onClick={handleRightClick} text='Right' />
//       {/* <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button> */}
//       {right}
//       <History allClicks={allClicks} />
//       {/* <p>{allClicks.join(' ')}</p>
//       <p>total {total}</p> */}
//     </div>
//   )
// }

// const Display = props => <div>{props.value}</div>




// const Button = (props) => (
//   <button onClick={props.onClick}>
//     {props.text}
//   </button>
// )

// const App = (props) => {
//   const [value, setValue] = useState(10)

//   const setToValue = (newValue) => {
//     console.log('value now', newValue)
//     setValue(newValue)
//   }

//   return (
//     <div>
//       <Display value={value} />
//       <Button onClick={() => setToValue(1000)} text="Thousand" />
//       <Button onClick={() => setToValue(0)} text="Reset" />
//       <Button onClick={() => setToValue(value + 1)} text="Increment" />
//     </div>
//   )
// }

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )  
}

const Button = (props) => {
  const { onClick, text } = props
  return (
    <button onClick={onClick}>{text}</button>
  )
}

// Statistics Component
const Statistics = (props) => {
  console.log(props.all)
  if (props.all === 0)
  {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>All {props.all}</p>
      <p>Average {props.average} </p>
      <p>Positive {props.positive} %</p>
    </div>
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  // Calculate the average rating
  const calculateAverage = () => {
    
    let average = (good - bad) / total
    if (total === 0)
    {
      average = 0
    }
    console.log(average)
    return average
  }

  const calculatePositive = () => {
    let positive = (good/total) * 100
    if (good === 0)
    {
      positive = 0
    }
    console.log(positive)
    return positive
  }


  

  const handleGoodClick = () => {
  console.log('good before click', good)
  const updatedGood = good + 1
  console.log('good after click', good)
  setGood(updatedGood)
  setTotal(neutral + bad + updatedGood)
  //setAverage(() => (good - bad)/total)
  calculateAverage()
  calculatePositive()
  // handleAverage()
  // console.log(average)
  
 
  
 
  
}

const handleNeutralClick = () => {
  const updatedNeutral = neutral + 1
  setNeutral(updatedNeutral)
  setTotal(good + bad + updatedNeutral)
  calculateAverage()
  //setAverage(() => (good - bad)/total)
}

const handleBadClick = () => {
  console.log('bad before click',bad)
  const updatedBad = bad + 1
  
  setBad(updatedBad)
  console.log('bad after click', bad)
  setTotal(good + neutral + updatedBad)
  calculateAverage()
  // setAverage(() => (good - bad)/total)
}

  return (
    <div>
     <Header text="Give Feedback" />
     <Button onClick={handleGoodClick} text="Good" />
     <Button onClick={handleNeutralClick} text="Neutral" />
     <Button onClick={handleBadClick} text="Bad" />
     
     <Statistics good={good} neutral={neutral} bad={bad} all={total}
                 average={calculateAverage()} positive={calculatePositive()} />
    </div>
  )
}

export default App

// Notes
// Never define components inside another component







