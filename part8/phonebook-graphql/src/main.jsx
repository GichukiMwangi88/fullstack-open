import ReactDOM from 'react-dom/client'
import App from './App'

import { ApolloClient, ApolloProvider,
         InMemoryCache, gql } from '@apollo/client'

// The app can communicate with a GraphQL server using the client object
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})


const query = gql `
  query {
    allPersons {
      name,
      phone,
      address {
        street,
        city
      }
      id
      }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
