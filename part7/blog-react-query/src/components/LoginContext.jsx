import { createContext, useReducer } from 'react'
import { useEffect } from 'react'
import blogService from '../services/blogs.js'

const loginReducer = (state, action) => {
  switch(action.type) {
  case 'Login_Success':
    return {
      user: action.payload.user,
      token: action.payload.token,
      error: null
    }
  case 'Logout':
    return {
      user: null,
      token: null,
      error: null
    }
  case 'Login_Failure':
    return {
      user: null,
      token: null,
      error: action.payload.error
    }
  default:
    return state
  }
}

const LoginContext = createContext()

const initialState = {
  user: null,
  token: null,
  error: null
}

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, initialState)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      // Set the token globally for blog requests
      blogService.setToken(user.token)

      // Dispatch to context so that the app knows user is logged in
      loginDispatch({
        type: 'Login_Success',
        payload: {
          user,
          token: user.token
        }
      })
    }
  }, [])

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginContext
