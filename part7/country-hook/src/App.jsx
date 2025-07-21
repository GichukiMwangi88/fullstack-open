import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

// Custom hook thats responsible for grabbing user input
const useField = (type) => {
  const [value, setValue] = useState('')
  console.log(value)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook thats responsible for fetching data based on the userInput
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  // Fetches info on the name of the country and only re-renders if the name changes
  useEffect(() => {
    if (!name) return // validate to ensure the effect doesn't re-render page if input is empty
    axios.get(`${baseUrl}/${name}`)
      .then(response => {
        let result = response.data
        setCountry({ data: result, found: true })
        console.log(result)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setCountry({ data: null, found: false })
      })

      }, [name]) // the effect won't run unless the name variable changes

  
  console.log('Country object: ',country)

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital: {country.data.capital} </div>
      <div>population: {country.data.population}</div> 
      <img src={country.data.flags.svg} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  // until the name is set, useCountry won't run until the form is submitted and fetch function runs
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
