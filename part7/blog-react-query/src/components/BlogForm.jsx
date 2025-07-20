import { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Typography level='title-lg' sx={{ mt: 0.5, fontWeight: 'bold', fontSize: '1.1rem' }}>
        Create a new blog entry
      </Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="Title"
            type="text"
            value={title}
            name="Title"
            placeholder='enter title'
            onChange={event => setTitle(event.target.value)}
            margin='normal'
          />
        </div>
        <div>
          <TextField
            label="Author"
            type="text"
            value={author}
            name="Author"
            placeholder='enter author'
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="URL"
            type="text"
            value={url}
            name="URL"
            placeholder='enter url'
            onChange={event => setUrl(event.target.value)}
            margin='normal'
          />
        </div>
        <Button type='submit' variant='contained' sx={{ my: 0.5 }}>Create</Button>
      </form>
    </div>
  )
}

export default BlogForm
