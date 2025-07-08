import { createContext, useReducer } from 'react'

// Notification reducer that defines how notification state should
// updated based on dispatched actions
// To note: This reducer should be a pure function 
const notifReducer = (state, action) => {
    switch(action.type) {
        case "CREATE":
            return `"${action.payload}" added`
        case "VOTE":
            console.log('You voted')
            return ` Anecdote"${action.payload}" voted`
        case "CLEAR":
            return null
        case "INVALID":
            return 'too short anecdote, must have length 5 or more'
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notifReducer, 'Welcome Amigos')
    // the parameters in useReducer, first one is the reducer function that handles state changes
    // second one is the initial state

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext 
