const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.use(cors())

// create a custom token for the POST request
morgan.token('bodyName', (request, response) =>  {
    if(request.method === 'POST') {
        return JSON.stringify({ name: request.body.name, number: request.body.number })}
    else {return ''}
})


// Log messages regarding requests using morgan middleware
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyName'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// GET all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// GET single person based on ID parameter
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((note) => note.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Generate user ids using Math.random()
const generateId = () => {
    return Math.floor(Math.random() * 1000)
}

// POST a person to the persons array
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  let newId = generateId()
  // Avoid duplicate ids
  for (const person of persons){
    if(newId === person.id)
    {
        // generate another user id
        newId = generateId()
    }

  }

  const person = {
    id: newId,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

// DELETE a single person entry based on their id
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
