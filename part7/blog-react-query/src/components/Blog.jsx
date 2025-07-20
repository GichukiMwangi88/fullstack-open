import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { Typography, Button, TextField } from '@mui/material'

const Blog = ({ blog, handleLike, onRemove, detailed = false }) => {
  //console.log('Blog likes:', blog.likes)
  //console.log('Handle like: ',handleLike)
  // const [details, showDetails] = useState(false)

  // Keep track of the comments
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([])

  // Handle comment submission
  const handleCommentSubmission = async (event) => {
    event.preventDefault()

    console.log('New comment:', newComment)

    const latestComments = await blogService.addComment(blog.id, newComment)

    console.log('Latest comment:', latestComments)

    setComments(comments.concat(latestComments))

    console.log('Comments:', comments)


    //reset input
    setNewComment('')

  }

  const { title, author, url, likes } = blog

  const increaseLikes = () => {
    //console.log('Initial Blog Likes', blog.likes)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    //console.log('Updated Blog Likes:', updatedBlog.likes)
    handleLike(updatedBlog)

  }

  const handleRemove = () => {
    //console.log('Blog details:', blog)
    //console.log('Blog user username:', blog.user.username)
    // Object.keys(blog).forEach(key => {
    //   console.log(`${key}: ${blog[key]}`)
    // })
    //console.log('Blog details:', blog.user.username)
    //console.log('Blog id:', blog.id)

    let confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmation)
    {
      onRemove(blog.id)
      //console.log('Blog removed')

    }

  }

  // const { id } = useParams()
  // console.log('Params ID:', id)

  // // Grab the blog id that will use to filter
  // const blogDisplayed = blogs.filter(blog => blog.id === id)
  // console.log('Blog displayed:', blogDisplayed)

  const blogDetails = (
    <div>
      <Typography sx={{ mt: 2, fontWeight: 'bold', fontSize: '1.25rem', fontFamily: 'Verdana' }}>
        {title}
      </Typography>
      <Typography level='body-md' sx={{ fontFamily: 'Verdana' }}><Link>{url}</Link></Typography>
      <Typography sx={{ mt: 1.5, fontWeight: 'italic', fontSize: '1rem', fontFamily: 'Verdana' }}>
        {likes} likes
        <Button variant='outlined' onClick={increaseLikes} sx={{ fontSize: '0.75rem', fontFamily: 'Verdana' }} >
          like
        </Button>
      </Typography>
      <Typography sx={{ mt: 1, fontFamily: 'Verdana' }}>added by {blog.user.name}</Typography>
    </div>
  )

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 0.25,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  // const label = details ? 'Hide' : 'View'

  const loggedUser = window.localStorage.getItem('loggedBlogappUser')
  //console.log('Logged user:', loggedUser)
  const user = loggedUser ? JSON.parse(loggedUser) : null
  //console.log('User name:', user.username)

  //console.log(user.username)
  // console.log(blog.user.username)
  const showRemoveButton = user && blog.user && blog.user.username
    ? user.username === blog.user.username
    : false // allows only the one who added the blog to remove it
  //console.log('User name:',user.username)
  //console.log('Blog user:', blog.user.username)


  // Ensures that we only display the title of the blog and no details
  // Details displayed only after user clicks title
  if(!detailed) {
    return (
      <div>
        <Typography level='h3'><Link to={`/blogs/${blog.id}`}>{title}</Link></Typography>
      </div>
    )
  }

  return (
    <div className='blog'>
      {blogDetails}
      {/* <div className='showDetails'>
        <button onClick={toggleDetails}>{label}</button>
      </div> */}
      <div>
        {showRemoveButton && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
      <div>
        <Typography
          sx={{ mt: 2, fontWeight: 'bold', fontSize: '1.25rem', fontFamily: 'Verdana' }}>
          comments
        </Typography>
        <form onSubmit={handleCommentSubmission}>
          <TextField type='text' value={newComment}
            onChange={({ target }) => setNewComment(target.value)}
            sx={{ mt: 1, height: 30 }}
            variant='filled'
          />
          <Button type='submit' variant='contained' sx={{ mt: 2, height: 30 }}>
            add comment
          </Button>
        </form>
        <ul>
          {comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </div>

    </div>
  )

}

export default Blog
