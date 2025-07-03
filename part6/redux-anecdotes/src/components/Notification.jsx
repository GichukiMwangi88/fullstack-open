
import { useSelector } from "react-redux"
//import { useDispatch } from "react-redux";
//import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  //const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => {
    console.log('Notification:', notification)
    //console.log(typeof notification)
    return notification
  })

  // const clearNotification = useSelector(({ notification }) => {
  //   setTimeout(() => {
  //     notification
  //   }, 3000)
  //})
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
      {/* //{clearNotification} */}
    </div>
  )
}

export default Notification
