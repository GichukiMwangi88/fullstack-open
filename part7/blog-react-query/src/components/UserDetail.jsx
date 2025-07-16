import { useParams, Link } from 'react-router-dom'

const UserDetail = (props) => {
  console.log(props)
  const { blogs } = props
  const { id } = useParams()

  const result = blogs.filter(blog => blog.user.id === id)
  console.log('Result Blog:', result)
  result.forEach(r => console.log('Blog creator:', r.user.name))

  const name = result.length > 0 ? result[0].user.name : 'No blogs found for user'

  return (
    <div>
      <h2><strong>{name}</strong></h2>
      <h3><strong>added blogs</strong></h3>
      {result.map(r =>
        <ul key={r.id}>
          <li>
            <strong>{r.title}</strong>
          </li>
        </ul>
      )}
      <p><Link to={'/users'}>Back to table</Link></p>
    </div>
  )










}

export default UserDetail
