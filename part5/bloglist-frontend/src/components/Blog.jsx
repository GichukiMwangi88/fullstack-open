import { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, onRemove }) => {
  //console.log('Blog likes:', blog.likes)
  //console.log('Handle like: ',handleLike)
  const [details, showDetails] = useState(false)

  const toggleDetails = () => {
    showDetails(!details)
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
    console.log('Blog details:', blog.user.username)
    console.log('Blog id:', blog.id)

    let confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirmation)
    {
      onRemove(blog.id)
      //console.log('Blog removed')

    }

  }

  const blogDetails = (
    <div>
      <ul>
        <li>Title: {title}</li>
        <li>Author: {author}</li>
        {details ? (
          <div className='moreDetails'>
            <li>Url: {url}</li>
            <li>Likes: {likes} <button onClick={increaseLikes}>like</button></li>
          </div>
        ) : null}
      </ul>

    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 0.25,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = details ? 'Hide' : 'View'

  const loggedUser = window.localStorage.getItem('loggedBlogappUser')
  //console.log('Logged user:', loggedUser)
  const user = loggedUser ? JSON.parse(loggedUser) : null
  //console.log('User name:', user.username)

  //console.log(user.username)
  // console.log(blog.user.username)
  const showRemoveButton = user.username === blog.user.username // allows only the one who added the blog to remove it
  console.log(user.username)

  return (
    <div style={blogStyle} className='blog'>
      {blogDetails} {handleLike} {onRemove}
      <div className='showDetails'>
        <button onClick={toggleDetails}>{label}</button>
      </div>
      <div>
        {showRemoveButton && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>

    </div>
  )

}

export default Blog
