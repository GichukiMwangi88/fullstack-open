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
          <>
            <li>Url: {url}</li>
            <li>Likes: {likes} <button onClick={increaseLikes}>like</button></li>
          </>
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
  const user = JSON.parse(loggedUser)

  //console.log(user.username)
  // console.log(blog.user.username)
  const showRemoveButton = user.username === blog.user.username // allows only the one who added the blog to remove it


  return (
    <div style={blogStyle}>
      {blogDetails} {handleLike} {onRemove}
      <button onClick={toggleDetails}>{label}</button>
      {showRemoveButton && (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  )

}

export default Blog
