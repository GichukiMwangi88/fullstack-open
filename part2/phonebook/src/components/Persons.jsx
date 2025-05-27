import Person from './Person';

const Persons = (props) => {
    console.log(props)
    const { persons, filterName} = props
    // Filters the persons array, contains a list of only the list that contains the filterName
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    console.log(personsToShow)
    return (
        <>
            {personsToShow.map(person =>
                <Person key={person.name} name={person.name} phone={person.phone} />
            )}      
        </>

    )
}

export default Persons


