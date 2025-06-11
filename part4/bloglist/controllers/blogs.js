const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

// Delete a single blog post resource
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    console.log('Id to delete', request.params.id)
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
