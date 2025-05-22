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
  const course = 
  {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => 
          <Course key={part.id} course={part.name} />
      )}
      </ul>
    </div>
    
  ) 
}


export default App
