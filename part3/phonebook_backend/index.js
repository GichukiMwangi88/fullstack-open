require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()
const morgan = require('morgan')
const cors = require('cors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('____')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(message)

  if (error.name === 'CastError')
  {
    return response.status(400).send({ error: 'malformatted id'})
  }

  next(error)
}
app.use(express.static('dist'))
// Middleware to parse JSON
app.use(express.json())
app.use(requestLogger)
app.use(cors())


// create a custom token for the POST request
morgan.token('bodyName', (request, response) =>  {
    const body = request.body
    if(request.method === 'POST' && request.body && request.body.name && request.body.number) {
        console.log(body)
        return JSON.stringify({ name: request.body.name, number: request.body.number })}
    return ' '
})


// Log messages regarding requests using morgan middleware
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyName'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
  })
  // response.json(persons)

// GET single person based on ID parameter
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    
    })
    .catch(error => next(error))
  // const id = request.params.id
  // const person = persons.find((note) => note.id === id)

  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }
})

// // Generate user ids using Math.random()
// const generateId = () => {
//     return Math.floor(Math.random() * 1000)
// }

// POST a person to the persons array
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })

  // let newId = generateId()
  // // Avoid duplicate ids
  // for (const person of persons){
  //   if(newId === person.id)
  //   {
  //       // generate another user id
  //       newId = generateId()
  //   }

  // }

  // const person = {
  //   id: newId,
  //   name: body.name,
  //   number: body.number,
  // }

  // persons = persons.concat(person)

  // response.json(person)
})

// DELETE a single person entry based on their id
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Update single phonebook entry using PUT
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person)
      {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
