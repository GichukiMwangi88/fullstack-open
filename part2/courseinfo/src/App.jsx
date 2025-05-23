//import Note from './components/Note'
import Course from './components/Course'

// const App = ({ notes }) => {
//   console.log(notes)
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//     </div>
//   )
// }





const App = () => {
  
  const courses = 
  [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // const total = courses.parts.reduce(
  //   (accumulator, part, i) => {return accumulator += courses[i].parts[i].exercises},0
  // )

  // console.log(total)

  // const total = parts.reduce((acc, part, i) => {return acc += part[i].exercises}, 0)
  // console.log(total)

  // const result = courses.map(course => course.name)
  // console.log(result)

  // const result = courses.map(course => course.name)
  // console.log(result)
  
  // const result2 = courses.map(course => 
  //   courses.map(course => 
  //     course.parts.map(part => 
  //       part.name
  //     )
  //   )
  // )
  // console.log(result2)

  return (
    <div>
      {courses.map(course =>
        <Course key={course.id} course={course} /> 
      )}
      
    </div>
   
      /* {courses.map(course => (
        <div key={course.id}>
          <Header course={course} />
          {courses.map(course => 
            course.parts.map(part => 
              <Content key={part.id} part={part} />
            )
          )} */
        
      
      
      /* <h2>{courses.name}</h2> */
      /* <Header key={course.id} courses={courses.name}  /> */
      /* <p>
        {courses.parts.map(part => 
          <Course key={part.id} courses={part.name} exercises={part.exercises} />
      )}
      <p>total of {total} exercises</p>
      </p> */
    
)

}


export default App
