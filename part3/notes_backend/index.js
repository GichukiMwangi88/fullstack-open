require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

// Notes
let notes = []

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('___')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(express.static('dist')) //serve the frontend via the backend
app.use(express.json())
app.use(requestLogger)

// activate json-parser




// Post notes to the server

// const generateId = () => {
//     const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => Number(n.id)))
//         : 0
//     return String(maxId + 1)

// }

app.get('/', (request,response) => {
    response.send('<h1>Hello World</h1>')
})

// Fetch all notes
app.get('/api/notes', (request,response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

// Fetch Note by ID
app.get('/api/notes/:id', (request,response, next) => {
    Note.findById(request.params.id)
        .then((note) => {
            if (note)
            {
                response.json(note)
            }   else 
            {
                response.status(404).end()
            }
        
        })
        .catch(error => next(error))
    
    // // to ensure that if the id doesn't exist, a 404 status is returned
    // if(note) {
    //     response.json(note)
    // } else {
    //     response.statusMessage = `Note with ${id} doesn't exist`
    //     response.status(404).end()
    // }
})

// Create a new note
app.post('/api/notes', (request,response) => {
    const body = request.body

    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,

    }) 

    note.save().then((savedNote) => {
        response.json(savedNote)
    })

})



// deleting resources
app.delete('/api/notes/:id', (request,response) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Update a single note
app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    Note.findById(request.params.id)
        .then(note => {
            if (!note) {
                return response.status(404).end()
            }

            note.content = content
            note.important = important

            return note.save().then((updatedNote) => {
                response.json(updatedNote)
            })
        })
        .catch(error => next(error))
})

// Middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint) // handler of requests with unknown endpoints
app.use(errorHandler) // handler of requests with result to errors


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

