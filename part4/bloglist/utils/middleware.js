require('express-async-errors')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()

}

const userExtractor = async (request, response, next) => {
  //console.log('Token: ',request.token) // debugging
  let token
  // error handling in case there's an error getting the token
  try {
    token = jwt.verify(request.token, process.env.SECRET)
  } catch (error) {
    return next(error)
  }
  

  if(!token) {throw new Error('Invalid token')}

  //console.log('Token: ', token.id)
  const user = await User.findById(token.id)
  //console.log('User: ', user.id)

  request.user = user
    
  next()

}


module.exports = { requestLogger, 
                  unknownEndpoint, 
                  errorHandler, 
                  tokenExtractor,
                  userExtractor }
