const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})


blogsRouter.post('/', tokenExtractor, userExtractor,  async (request, response, next) => {
    const body = request.body
    const user = request.user
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // console.log('Token:', decodedToken.id)

    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'token invalid' })
    // }

    // const user = await User.findById(decodedToken.id)
    // console.log('User:', user)

    // if (!user) {
    //     return response.status(400).json({ error: 'userId missing or not valid'})
    // }

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id,
        likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

// Delete a single blog post resource
blogsRouter.delete('/:id', tokenExtractor, userExtractor,  async (request, response) => {
    const user = request.user
    // const token = jwt.verify(request.token, process.env.SECRET)
    console.log('User ID: ', user.id)
    //console.log('Token Id: ', token.id)

    const blog = await Blog.findById(request.params.id)
    console.log('Blog user id: ', blog.user.toString())

    if (blog.user.toString() === user.id)
    {
        await Blog.findByIdAndDelete(request.params.id)
    }
   
    //await Blog.findByIdAndDelete(request.params.id)
    //console.log('Id to delete', request.params.id)
    response.status(204).end()
})

// Update information of an individual blog post
blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body

    const updatedData = { likes }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        updatedData,
        {
            new: true

        })

    response.status(200).json(updatedBlog)

})

module.exports = blogsRouter
