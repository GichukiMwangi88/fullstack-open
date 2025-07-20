import { useParams, Link } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

const UserDetail = (props) => {
  //console.log(props)
  const { blogs } = props
  const { id } = useParams()

  const result = blogs.filter(blog => blog.user.id === id)
  //console.log('Result Blog:', result)
  result.forEach(r => console.log('Blog creator:', r.user.name))

  const name = result.length > 0 ? result[0].user.name : 'No blogs found for user'

  return (
    <div>
      <Typography sx={{ fontFamily: 'Verdana', fontSize: '1.2rem',
        fontWeight: 'Bold', marginTop: '10px' }}>
        {name}
      </Typography>
      <Typography sx={{ fontFamily: 'Verdana', fontSize: '1.1rem',
        fontWeight: 'Bold', marginTop: '10px' }}>
        added blogs
      </Typography>
      {result.map(r =>
        <List key={r.id}>
          <ListItemText>
            {r.title}
          </ListItemText>
        </List>
      )}
      <Typography sx={{ ontFamily: 'Verdana', fontSize: '1rem' }}>
        <Link to={'/users'} >Back to table</Link>
      </Typography>
    </div>
  )










}

export default UserDetail
