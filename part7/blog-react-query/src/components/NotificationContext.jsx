import { createContext, useReducer } from 'react'

const notifyReducer = (state, action) => {
  switch(action.type) {
  case 'SUCCESS':
  case 'ERROR':
    return {
      message: action.payload,
      type: action.type
    }
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notifyReducer, null)
  // the parameters in useReducer, first one is the reducer function that handles state changes
  // second one is the initial state

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
