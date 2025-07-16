import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (blogObject) => {
  //const blogId = blogObject.id
  console.log('Debugging PUT')
  console.log('Blog Details: ', blogObject)
  console.log('Blog Likes:', blogObject.likes)
  const { title, author, url, likes, id } = blogObject


  const updatedBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const response = await axios.put(`${baseUrl}/${blogObject.id}`, updatedBlog)
  console.log('Updated Blog:', updatedBlog.likes)
  return response.data
}

const deleteBlog = async (id) => {
  console.log('Debugging DELETE')
  console.log('Blog details:', id)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data


}




export default { getAll, create, put, setToken, deleteBlog }
