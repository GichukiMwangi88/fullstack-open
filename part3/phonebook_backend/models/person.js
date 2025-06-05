const mongoose = require('mongoose')
require('dotenv').config() // allows us to be able to use the URI

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI



console.log('connecting to', url)
mongoose
    .connect(url)
    .then((result) => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// Defines the structure of the Person object
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// Remove the version number from the Person object
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
