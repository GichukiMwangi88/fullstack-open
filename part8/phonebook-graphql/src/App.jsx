import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm.jsx'
import PhoneForm from './components/PhoneForm.jsx'

import { ALL_PERSONS } from './queries.js'
import { useState } from 'react'

const App = () =>  {
  const [errorMessage, setErrorMessage] = useState('')

  const result = useQuery(ALL_PERSONS, {
    // For updating the cache every 2 seconds
    //pollInterval: 2000 // this is polling that provides near real-time synchronization with the server
                      // by executing your query periodically at a specified interval
  })

  if (result.isloading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  console.log('Result:', result)

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App
