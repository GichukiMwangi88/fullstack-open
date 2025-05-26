import { useState } from 'react'
//import Note from './components/Note'


// const App = (props) => {
//   //console.log(props) // stores an array of notes
//   // If we want to start with an empty array of notes
//   // const [notes,setNotes] = useState([])
//   const [notes, setNotes] = useState(props.notes)
//   //console.log(props.notes)
//   // state for storing user-submitted input and set it as the value of input in the form
//   const [newNote, setNewNote] = useState('a new note...')
//   //console.log(newNote)
//   const [showAll, setShowAll] = useState(true)

//   // Add a note component, an event handler to the form element, called
//   // when the form is submitted
//   // event parameter triggers the call to the event handler function
//   const addNote = (event) => {
//     event.preventDefault() // prevents page reload when submitting a form
//     console.log('Button clicked', event.target)

//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: String(notes.length + 1),
//     }

//     console.log(noteObject)
    

//     setNotes(notes.concat(noteObject))
    
//     setNewNote('') // resets the value of the controlled input element
//   }

//   //console.log(notes)

//   // Enable note change, allows changes to be made to the input field
//   // Event handler synchronizes the changes made to the input with the component's state
//   // Called every time a change occurs to the input element
//   const handleNoteChange = (event) => {
//     console.log(event.target.value) // => the input value entered by user
//     setNewNote(event.target.value)
//   }
  
//   // Filtering displayed elements
//   // Display notes that the important property is set to True
//   const notesToShow = showAll ? notes : notes.filter(note => note.important)

//   // console.log(notesToShow)
//   // console.log(showAll)

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote}
//                onChange={handleNoteChange}
//          />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   )
// }

// Phone Book

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '480-487-6352'},
    { name: 'Ada Lovelace', phone: '789-789-9696'},
    { name: 'Dan Oboma', phone: '789-852-8520'}
  ]) 
  //console.log(persons)
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setPhone] = useState('')
  //console.log(newPhone)
  //console.log(newName)

  // const filterName = persons.find(person => person.name === 'Ada Lovelace')
  // console.log(filterName)

  const handleFilter = (event) => {
    console.log(event.target.value)
    const targetValue = event.target.value
    console.log(persons.filter(person => person.name === targetValue))
    setFilterName(targetValue)
    
  }

  // Names to display to user based on the filtered name
  const personsToDisplay = filterName 
                           ? persons.filter(person => person.name === filterName) : persons
  console.log(personsToDisplay)

  

  // Adding new name
  const addNewName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
    // Find a single person
    // const name = persons.find(person => person.name ==='Arto Hellas')
    // console.log(name)
    // const isDuplicate = (person) => person.name === newName
    // console.log(persons.some(isDuplicate))

    //console.log(persons.some(person => person.name === newName))

    // Person object
    const personObj = {
      name: newName,
      phone: newPhone
    }
    //console.log(newName.length)
    if(newName.length === 0 ) // ensures empty strings aren't added to the phonebook
    {
      alert('Please enter a name')
    }
    else if (newPhone.length === 0)
    {
      alert('Please enter a phone number')
    }
    else if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) // check for duplicates in phonebook
    {
      alert(`${newName} has already been added to the Phonebook`)
      setNewName('')
    }
    else
    {
      
      setPersons(persons.concat(personObj)) // Add the new person to the persons array
      setNewName('')
      setPhone('')
    }

    

  }

  // Need to be able to edit the input and add to numbers
  const handleNewNameChange = (event) => {
    //console.log('Value of input', event.target.value)
    //console.log(persons)
    // if (event.target.value === '')
    // {
    //   alert('Please enter a name')
    // }
    setNewName(event.target.value)
    //console.log(persons)
  }

  // Adding phone numbers
  const handlePhoneNumber = (event) => {
    
    //console.log('Input value', event.target.value)
    setPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterName} 
                                 onChange={handleFilter}/>
      </div>
      <h2>Add New Person and Phone number</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} 
                       onChange={handleNewNameChange}/>
        </div>
        <div>number: <input value={newPhone} 
                            onChange={handlePhoneNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToDisplay.map(person => 
          <li key={person.name}>{person.name}:{person.phone}</li>
        )}
      </ul>
    </div>
  )
}

export default App

