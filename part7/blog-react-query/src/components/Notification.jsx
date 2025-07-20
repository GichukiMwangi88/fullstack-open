import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import { Alert } from '@mui/material'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notification, dispatch] = useContext(NotificationContext)

  if(!notification) return null

  return (
    // <div style={style}>
    //   {notification.message}
    // </div>
    <Alert severity='success'>
      {notification.message}
    </Alert>
  )
}

export default Notification
