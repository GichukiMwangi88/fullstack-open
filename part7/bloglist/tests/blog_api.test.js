const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') // import the express app from the app.js module
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app) // superagent object thats assigned to the api variable

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

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

//test that makes an HTTP GET request to the /api/blogs URL
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


// test that verifies that the unique identifier prop of the blog posts is named id
// testing the transform feature
test('test that blogs have the unique identifier id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        console.log('Blog details:', blog)
        assert.notStrictEqual(blog.id, undefined) // ensure that blog.id is defined
        assert.strictEqual(blog._id, undefined) // check to see if blog._id is undefined
    })
        
})

// test HTTP POST request to /api/blogs
test('test a valid blog can be added', async () => {
    const newBlog = {
        title: "Test test",
        author: "Marcus Doe",
        url: "https://testing6.com/",
        likes: 1,
    }

    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(201)
     .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('Test test'))
})

// test that a blog with missing likes prop defaults to 0
test('blog without like, like defaults to 0', async () => {
    const newBlog = {
        title: 'Testing 7',
        author: 'Hans Doe',
        url: 'http://testing4.com',
        //likes: 78,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    
    const response = await api.get('/api/blogs')
    console.log(response.body[2].likes)

    assert.strictEqual(response.body[2].likes, 0)
})

// test that verifies if title prop is missing from the request data, backend
// responds with status code 400
test('blog missing title property', async () => {
    const newBlog = {
        author: 'Hans Doe',
        url: 'http://testing4.com',
        likes: 78,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

// test a blog can be deleted
test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log('Blogs at the start', blogsAtStart)
    const blogToDelete = blogsAtStart[0]

    console.log('Blog Id to delete', blogToDelete.id)
    console.log('Blog to delete', blogToDelete)

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
})

// test updating an individual blog
test('update an individual blog', async () => {
    // Get initial blogs
    const blogs = await helper.blogsInDb()
    console.log('Blogs:', blogs)
    console.log('Blog 1 likes before update:', blogs[0].likes)
    
    //console.log('Blog 1: ', blogs[0])

    // update the number of likes
    await api
        .put(`/api/blogs/${blogs[0].id}`)
        .send({ likes: 42})
        .expect(200)

    //fetch the updated data
    const blogsAfterUpdate = await helper.blogsInDb()

    console.log('Blog 1 likes after update:',blogsAfterUpdate[0].likes)
    assert.strictEqual(blogsAfterUpdate[0].likes, 42)

})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'gichuki88',
            name: 'Eli Mwangi',
            password: 'thestig88',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message ', 
        'if username already taken', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            const usersAtEnd = await helper.usersInDb()
            assert(result.body.error.includes('expected `username` to be unique'))

            assert.strictEqual(usersAtEnd.length, usersAtStart.length)


        })
})


after(async () => {
    await mongoose.connection.close()
})
