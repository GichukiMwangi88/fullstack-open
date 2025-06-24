import { useState } from 'react'

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
      <h2>Create a new blog entry</h2>

      <form onSubmit={addBlog}>
        <div>
                    Title:
          <input
            type="text"
            value={title}
            name="Title"
            placeholder='enter title'
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
                    Author:
          <input
            type="text"
            value={author}
            name="Author"
            placeholder='enter author'
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
                    URL:
          <input
            type="text"
            value={url}
            name="URL"
            placeholder='enter url'
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
