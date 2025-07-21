const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  const blogCountBefore = await Blog.countDocuments({})
  console.log('Blog count before delete:', blogCountBefore)

  await Blog.deleteMany({})

  const blogCountAfter = await Blog.countDocuments({})
  console.log('Blog count after delete:', blogCountAfter)

  await User.deleteMany({})

  console.log('Reset endpoint hit!')
  response.status(204).end()
})

module.exports = testingRouter
