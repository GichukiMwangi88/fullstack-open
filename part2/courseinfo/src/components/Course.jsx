const Course = (props) => {
    console.log(props)
    const { course } = props
    console.log(course.parts)
    
    const total = course.parts.reduce((acc, part) => {
                        return acc += part.exercises
    },0)
    console.log(total)
    return (
        <>
        <Header course={course} />
        {course.parts.map(part => 
            <div key={part.id}>
                <Content part={part} />
            </div>
        )}
        <h3>total of {total} exercises</h3>
        </>
        
            // console.log(course)
            // <Header course={course} />
            // console.log(part)
            // <Content part={part} />
        
    ) 
}

// Header component
const Header = ({course}) => {
//   console.log(course)
  return (
    <h2>{course.name}</h2>
    
  )
}

const Content = (props) => {
    // console.log(props)
    const { part } = props
    // console.log(part)
    return (
        <p>{part.name} {part.exercises}</p>
    )
}



export default Course
