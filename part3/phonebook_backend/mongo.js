const mongoose = require('mongoose')

if (process.argv.length < 3)
{
    console.log('give password as argument')
    process.exit(1)
    
}


const password = process.argv[2]

const url = 
`mongodb+srv://gichuki88:${password}@phonebookcluster.kj6ysuy.mongodb.net/Phonebook?
 retryWrites=true&w=majority&appName=PhonebookCluster`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// Create new person from the input in the console
const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

// Save the new person to phonebook and display the result to user
if (process.argv.length === 5)
{
    person.save().then(result => {
    console.log(`added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
})

}
// else if (process.argv.length > 3 && process.argv.length < 5)
// {

// }


// Display all entries to phonebook if no name or number is provided
if (process.argv.length === 3)
{
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
         mongoose.connection.close()
    })
   
}


