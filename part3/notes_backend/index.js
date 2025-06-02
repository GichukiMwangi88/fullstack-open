const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

// Notes
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('___')
    next()
}

// activate json-parser
app.use(express.json())

app.use(requestLogger)



// Post notes to the server

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)

}
app.post('/api/notes', (request,response) => {
    const body = request.body

    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }

    notes = notes.concat(note)
    console.log(note)
    response.json(note)
})


app.get('/', (request,response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request,response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request,response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    
    // to ensure that if the id doesn't exist, a 404 status is returned
    if(note) {
        response.json(note)
    } else {
        response.statusMessage = `Note with ${id} doesn't exist`
        response.status(404).end()
    }
})

// deleting resources
app.delete('/api/notes/:id', (request,response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

// Middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

