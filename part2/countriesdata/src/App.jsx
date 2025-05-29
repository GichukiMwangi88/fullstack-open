import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  //const [countryInfo, setCountryInfo] = useState({})

  //Fetch data from the API
  useEffect(() => {
    console.log('Effect run, country/countries...', query)

    if(query)
    {
      console.log('Fetching country/countries data...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          // Filter the response based on the user input(query)
          let result = response.data.filter(country => 
              country.name.common.toLowerCase().includes(query.toLowerCase())
            )
          if(Array.isArray(response.data))
          {
            setCountries(result)
          }
          else 
          {
            setCountries([result])
          }
          console.log(result)
          setCountries(result)
          //console.log(countries.name.common)
      })

    }

  }, [query])

  //Get the query from the input box
  const handleChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  // Conditionally render to the screen based on the number of returned results

  let content

  if(countries.length > 10)
  {
    content = <p>Too many matches</p>
  }
  else if(countries.length > 1)
  {
    content = countries.map(country => <p key={country.name.common}>
        {country.name.common}
    </p>)
  }
  else if(countries.length === 1)
  {
    content = <div>
      <h1>{countries[0].name.common}</h1>
        <p>Capital: {countries[0].capital}</p>
        <p>Area: {countries[0].area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countries[0].languages).map(
          language => (
            <li key={language}>{language}</li>
          )
        )} 
      </ul>
      <p>{countries[0].flag}</p>

    </div>
  }

  return (
    <>
    <div>
      <form>
        find countries: <input value={query} onChange={handleChange} />
      </form>
    </div>
    <div>
      {content}
    </div>
    <div>
    </div>
    </>
  )
}

export default App
