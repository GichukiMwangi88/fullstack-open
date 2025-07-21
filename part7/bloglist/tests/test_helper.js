const Blog = require('../models/blog')
const User = require('../models/user')

// test data
const initialBlogs = [
    {
        title: 'Test test 1',
        author: 'Jane Doe',
        url: 'http://test1.com',
        likes: 4,
    },
    {
        title: 'Test test 2',
        author: 'John Doe',
        url: 'http://test2.com',
        likes: 5,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
}
