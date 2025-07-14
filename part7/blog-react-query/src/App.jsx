import { useState, useEffect, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import NotificationContext from './components/NotificationContext'


const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [sortedBlogs, setSortedBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [notification, setNotification] = useState({ message: null, type: null })
  const [blogEntryVisible, setBlogEntryVisible] = useState(false)

  const [notification, dispatch] = useContext(NotificationContext)
  console.log('Notification:', notification)




  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      //console.log('Blogs:', initialBlogs)
      setBlogs(initialBlogs)
    )
  }, [])

  blogs.sort((a,b) => a.likes - b.likes) // sort the blogs ascending by number of likes
  // console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Sort blogs based on the number of likes
  // console.log('Blogs:', blogs)
  // const sortBlogs = (blogs) => {
  //   blogs.sort((a,b) => a.likes - b.likes)
  //   setSortedBlogs(blogs)
  // }
  //sortBlogs(blogs)

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('Returned Blog:', returnedBlog)
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        setBlogEntryVisible(false)
        //console.log('Blog Entry Visibility: ',blogEntryVisible)
        dispatch({ type: 'SUCCESS',
          payload: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        })
        setTimeout(() => {
          dispatch({ type: 'CLEAR' })
        }, 5000)

      })
      .catch(error => {
        dispatch({ payload: 'Error adding blog', type: 'ERROR' })
        setTimeout(() => {
          dispatch({ type: 'CLEAR' })
        }, 5000)
      })
  }

  const updateBlog = (blogObject) => {
    blogService
      .put(blogObject)
      .then(returnedBlog => {
        console.log('Returned Blog: ', returnedBlog)
        const updatedBlogs = blogs.map(blog => {
          if(blog.id === returnedBlog.id)
          {
            return returnedBlog
          }
          return blog
        }

        )

        setBlogs(updatedBlogs)
      })
      .catch(error => {
        dispatch({ payload: 'Error increasing likes', type: 'ERROR' })
        setTimeout(() => {
          dispatch({ type: 'CLEAR' })
        }, 5000)
      })
  }

  //Remove blog based on logged in user
  const removeBlog = (blogObject) => {
    //console.log('Logged in user:', user.username)
    // blogs.forEach(blog => {
    //   console.log(blog.user.username)
    // })
    // const updatedBlogs = blogs.filter(blog => blog.user.username !== user.username)
    // console.log('Updated Blogs:', updatedBlogs)
    console.log('Blog ID:', blogObject)
    blogService
      .deleteBlog(blogObject)
      .then(response => {
        //console.log(response.data)
        const updatedBlogs = blogs.filter(blog => blog.id !== blogObject)
        setBlogs(updatedBlogs)
      })
      .catch(error => {
        dispatch({ payload: 'Error deleting blog', type: 'ERROR' })
        setTimeout(() => {
          dispatch({ type: 'CLEAR' })
        }, 5000)
      })

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
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

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
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
    //setNotification({ message: `${username} logged in successfully`, type: 'success' })
    setUser(null)
    setUsername('')
    setPassword('')


    console.log('Logged out', username)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: blogEntryVisible ? 'none' : '' }
    const showWhenVisible = { display: blogEntryVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogEntryVisible(true)}>Create blog entry</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setBlogEntryVisible(false)}>Cancel</button>
        </div>
      </div>

    )
  }

  return (
    <div>
      <h2>Blog App</h2>
      <Notification />

      {user === null ?
        <div>
          <h3>Login to application</h3>
          {loginForm()}
        </div>
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
        </div>
      }
      <div className='blogs'>
        <h3>Blogs</h3>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={updateBlog}
              onRemove={removeBlog}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
