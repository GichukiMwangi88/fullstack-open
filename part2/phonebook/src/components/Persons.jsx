import Person from './Person';
import personService from '../services/person'
import Notification from './Notification'

const Persons = (props) => {
    console.log(props)
    const { persons, filterName, setPersons, setNotification } = props
    console.log(setPersons)
    // Filters the persons array, contains a list of only the list that contains the filterName
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    // delete a person from the persons list
    const toggleDelete = id => {
        const person = persons.find(p => p.id === id)
        console.log(person)

        if(window.confirm(`Delete ${person.name} ?`)) {
                    personService
                        .deletePerson(id)
                        .then(response => {
                            setPersons(persons.filter(person => person.id !== id)) // update the UI to only show persons not matching the deleted id
                            console.log(`Deleted person with ID ${id}`)
                            setNotification(`${person.name} deleted.`)
                            setTimeout(() => {
                                setNotification(null)
                            }, 5000)
                            //alert(`${person.name} deleted.`)

                        })
                        .catch(error => {
                            console.log('Failed to delete', error)
                        })
                } else {
                    console.log(`${person.name} not deleted.`)
                }
    }
    console.log(personsToShow)
    return (
        <>
            {personsToShow.map(person =>
                <Person key={person.id} name={person.name} phone={person.number}
                        toggleDelete={() => toggleDelete(person.id)}/>
            )}      
        </>

    )
}

export default Persons


