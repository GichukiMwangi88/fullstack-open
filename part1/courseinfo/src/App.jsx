const Header = (props) => {
  console.log(props)
  console.log(props.course)
  const course = props.course

  return (
    <>
     <h1>{course}</h1>
    </>
  )
}

const Part = (props) => {
  console.log(props.part)
  console.log(props.part.name)
  const part = props.part
  const exercise = props.exercises
  return (
    <div>
      <p>{part} {exercise}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props.parts)
  console.log(props.parts[0].name)
  console.log(props.parts[0].exercises)
  const part1 = props.parts[0].name
  const exercise1 = props.parts[0].exercises
  const part2 = props.parts[1].name
  const exercise2 = props.parts[1].exercises
  const part3 = props.parts[2].name
  const exercise3 = props.parts[2].exercises
  
  return (
    <div>
      <Part part={part1} exercises={exercise1} />
      <Part part={part2} exercises={exercise2} />
      <Part part={part3} exercises={exercise3} />
    </div>
  )
}

const Total = (props) => {
  console.log(props.parts[0].exercises)
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  console.log(total)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
