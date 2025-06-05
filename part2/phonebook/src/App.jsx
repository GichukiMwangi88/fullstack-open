import { useState, useEffect } from 'react'
import personService from './services/person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import person from './services/person'
import Notification from './components/Notification'

// Phone Book

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterName, setFilterName] = useState('')
  console.log(filterName)
  const [newName, setNewName] = useState('')
  const [newPhone, setPhone] = useState('')
  const [notification, setNotification] = useState('notification..')

  

  // Returned list of persons from the server
  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])


  const handleFilter = (event) => {
    setFilterName(event.target.value)
    
  }

  // Adding new name
  const addNewName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)

    // Person object
    const personObj = {
      name: newName,
      number: newPhone
    }

    //To check for duplicate and update a single phonebook entry number
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    //console.log(existingPerson.id)
    
    if(newName.length === 0 ) // ensures empty strings aren't added to the phonebook
    {
      alert('Please enter a name')
    }
    else if (newPhone.length === 0)
    {
      alert('Please enter a phone number')
    }
    else if(existingPerson) // check for duplicates in phonebook
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `))
      {
        personService
          .update(existingPerson.id, {...existingPerson, number: newPhone })
          .then(updatedPerson => {
            console.log(updatedPerson)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
            setNotification(`Updated ${updatedPerson.name} telephone number.`)
            setTimeout(() => {setNotification(null)}, 5000)
            setNewName('')
            setPhone('')
          })
          .catch(error => {
            console.error(error)
          })
      }
      
    }
    else
    {
      // Post the new person to the backend server using axios
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(
          `Added ${personObj.name}`
          )
          setTimeout(() => {setNotification(null)}, 5000)
        // alert(`${personObj.name} has been added to the phonebook`)
          setNewName('')
          setPhone('')
        })
      
      //setPersons(persons.concat(personObj)) // Add the new person to the persons array
      setNewName('')
      setPhone('')
    }
    
  }

  // Need to be able to edit the input and add to numbers
  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Adding phone numbers
  const handlePhoneNumber = (event) => {
    setPhone(event.target.value)
  }

  return (
    <div>
      
      <h2 className='heading'>Phonebook App</h2>
      <Notification message={notification} />
      <h3>Filter by Name</h3>
      <div>
        <Filter filterName={filterName} handleFilter={handleFilter} />
      </div>
      <h3>Add a new contact</h3>
        <PersonForm name={newName} number={newPhone} 
                  addContact={addNewName} handleName={handleNewNameChange}
                  handlePhone={handlePhoneNumber} />
      <h3>Numbers</h3>
      <ul>
        <Persons persons={persons} filterName={filterName} setPersons={setPersons}
                 setNotification={setNotification} />
      </ul>
      <p>Version: version 1.2.3</p>
    </div>
  )
}

export default App

