import { useState, useEffect, useContext } from 'react'
import Blog from './components/Blog'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import NotificationContext from './components/NotificationContext'
import LoginContext from './components/LoginContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { Container, TextField, Button, AppBar,
  Toolbar, ButtonGroup, Typography,
  TableContainer, Table, TableBody, TableHead, TableRow,
  TableCell, Paper } from '@mui/material'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogEntryVisible, setBlogEntryVisible] = useState(false)


  // Manage notifications
  const [notification, dispatch] = useContext(NotificationContext)
  console.log('Notification:', notification)


  // Login initial state
  const initialState = {
    user: null, // stores the user data once logged in
    token: null, // stores auth token
    error: null, // stores login error messages
  }

  //console.log('Initial State:', initialState)

  const [login, loginDispatch] = useContext(LoginContext)
  //console.log('Login User:', login.user)
  const user = login.user
  //console.log('Name of logged in user:', user.name)


  // Fetch blogs from the server
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () =>
      axios.get('/api/blogs').then(res => res.data),
    retry: 1
  })

  console.log(JSON.parse(JSON.stringify(result)))

  //console.log('Result:', result)

  const blogs = result.data

  const queryClient = useQueryClient()

  // New Blog Mutation
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] }) // fetch fresh data from the backend where the user is already populated
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
      dispatch({ type: 'SUCCESS',
        payload: `a new blog ${blog.title} by ${blog.author} added`
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      dispatch({ type: 'ERROR', payload: 'Failed to add blog' })
    }
  })

  // Update Blog Mutation
  const updateBlogMutation = useMutation({
    mutationFn: blogService.put, // calls the put service to send the updated blog data
    onSuccess: (data) => { // data is the blog to be updated, ie the number of likes
      queryClient.invalidateQueries({ queryKey: ['blogs'] }) // fetch fresh data from the backend
      // where the user is already populated
      //console.log('Data:', data) // Debug

      const blogs = queryClient.getQueryData(['blogs']) // get the current array of blogs
      //console.log('Blogs:', blogs)
      // Create a new array, updatedBlogs, iterating over the cached blogs
      // for each blog, if its id matches the updated blog's id, replace it with the updated blog(data)
      // Else, keep the blog as is
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === data.id) {
          return data
        }
        return blog
      }

      )
      // Set the new cache with setQueryData to update cache with the new array
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
    onError: (error) => {
      dispatch({ type: 'ERROR', payload: 'Failed to like blog' })
    }
  })

  // Delete Blog Mutation
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (_data, id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== id) )
      dispatch({ type: 'SUCCESS',
        payload: 'Blog delete successfully'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      dispatch({ type: 'ERROR', payload: 'Failed to remove blog' })
    }
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  // Sort blogs by the number of likes
  blogs.sort((a,b) => a.likes - b.likes) // sort the blogs ascending by number of likes

  // blogs.forEach(blog => {
  //   //console.log('Blog user id:', blog)
  // })

  /* Get the number of blogs created by each user:
    1.Create a variable that stores the result of the reduce function —
    this will be an object mapping each user to the number of blogs they've created, e.g. { 'Jane Doe': 1 }.
    2.Call the reduce function on the blogs array,
    using an empty object {} as the initial accumulator.
    3.Extract the username from each blog object and store it in a variable called username.
    4.Iterate through each blog, and for every blog entry, use the username as a key in the accumulator object.
    5.If the username already exists in the accumulator, increment its value by 1.
    If it's the first time the username appears, set the value to 1.
    6.Return the accumulator at the end of the reduce call —
    this final object will contain the total blog counts per user.
  */

  const userBlogCounts = blogs.reduce((acc, blog) => {
    const name = blog.user.name // extract the name we'll use in the acc object
    //console.log('Blog user:',name)
    const userId = blog.user.id
    //console.log('Blog user id:', userId)
    if (acc[userId]) { // check if the userId exists, increase the blog count
      acc[userId].blogCount += 1
    }
    else { // if first time encountering the userId, create an object with name and blogCount as keys
      // and initialize blogCount to 1
      acc[userId] = {
        name: name,
        blogCount: 1
      }
    }
    return acc
  }, {})

  //console.log('Blog counts:', userBlogCounts)

  // Tranform the userBlogCounts into an array for display
  const userList = Object.entries(userBlogCounts)
  //console.log('User List Data type:', Array.isArray(userList)) //--> returns true indicating its an array

  const addBlog = async (blogObject) => {
    newBlogMutation.mutate({ ...blogObject, Likes: 0 })
  }

  const removeBlog = (id) => {
    //console.log('Deleted blog id:', id)
    deleteBlogMutation.mutate(id)
  }

  const updateBlog = async (blogObject) => {
    //console.log('Blog to update:', blogObject)
    //console.log('Blog id:', blogObject.id)
    updateBlogMutation.mutate({ ...blogObject })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      loginDispatch({
        type: 'Login_Success',
        payload: {
          user: user,
          token: user.token
        }
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      //console.log(user.token)
      blogService.setToken(user.token)

      dispatch({ message: `${username} logged in successfully`, type: 'SUCCESS' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })

      }, 5000)

      setUsername('')
      setPassword('')

    } catch (exception) {
      loginDispatch({
        type: 'Login_Failure',
        payload: {
          error: 'Wrong username or password'
        }
      })
      dispatch({ payload: 'Wrong username or password', type: 'ERROR' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    }

  }

  // Handle logging out
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')

    loginDispatch({ type: 'Logout' })
    setUsername('')
    setPassword('')

    // Notify user they have logged out successfully
    dispatch({ type: 'SUCCESS', payload: 'Logged out successfully' })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)


    console.log('Logged out', username)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          margin='normal'
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit"
        variant='contained' color='primary'>
        login
      </Button>
    </form>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: blogEntryVisible ? 'none' : '' }
    const showWhenVisible = { display: blogEntryVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setBlogEntryVisible(true)}
            variant='outlined'>
            Create blog
          </Button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}/>
          <Button onClick={() => setBlogEntryVisible(false)}
            variant='contained'>
              Cancel
          </Button>
        </div>

      </div>

    )
  }

  const padding = {
    padding: 5
  }



  return (
    <Container>
      <div>
        <AppBar position='static'>
          <Toolbar>
            <div className='navbar'>
              <Button color='inherit' component={Link} to='/blogs'>blogs</Button>
              <Button color='inherit' component={Link} to='/users'>users</Button>
              {user &&
          <>
            <span>{user.name} logged in</span>
            <Button onClick={handleLogout} color='inherit'>Logout</Button>
          </>}
            </div>
          </Toolbar>
        </AppBar>
        <Typography level='h1'
          sx={{ mt: 2, fontWeight: 'bold', fontSize: '1.25rem' }}>
            Blog App
        </Typography>
        <Notification />
        {user === null ?
          <div>
            <h3>Login to application</h3>
            {loginForm()}
          </div>
          :
          <>
            <div style={{ marginTop: '1rem' }}>
              {blogForm()}
            </div>
          </>
        }

        <Routes>
          <Route path='/blogs/:id' element={<BlogDetail blogs={blogs}
            handleLike={updateBlog} onRemove={removeBlog} />} />
          <Route path='/blogs' element={
            <div>
              <div className='blogs'>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {blogs.map(blog => <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={updateBlog}
                    onRemove={removeBlog}
                    detailed={false} />
                  )}
                </ul>
              </div>
            </div>

          } />
          <Route path='/users' element={
            <div>
              <Typography sx={{ fontFamily: 'Verdana', fontSize: '1rem', fontWeight: 'Bold' }}>
                Users
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableCell>Users</TableCell>
                    <TableCell>blogs created</TableCell>
                  </TableHead>
                  <TableBody>
                    {userList.map(([id, { name, blogCount }]) => (
                      <TableRow key={id}>
                        <TableCell>
                          <Link to={`/users/${id}`}>{name}</Link>
                        </TableCell>
                        <TableCell>{blogCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </TableContainer>

            </div>
          } />
          <Route path='/users/:id' element={<UserDetail blogs={blogs} />} />
        </Routes>
      </div>
    </Container>

  )
}

export default App
