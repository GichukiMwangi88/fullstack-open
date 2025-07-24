import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql `
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`
export const ALL_BOOKS = gql `
    query {
        allBooks {
            title,
            author,
            published
        }
    }
`

export const CREATE_BOOK = gql `
    mutation createBook($title: String!, $author: String!, 
                     $published: Int!, $genres: [String!]!)
            {
                addBook(
                    title: $title,
                    author: $author,
                    published: $published,
                    genres: $genres
                ) {
                    title,
                    author,
                    published,
                    genres
                }
            }

`

export const SET_BIRTHYEAR = gql `
    mutation setBirthYear($name: String!, $setBornTo: Int!)
        {
            editAuthor(name: $name, 
                setBornTo: $setBornTo)
                {
                    name,
                    born
                }
        }
`

/*
Client Side
  |
  |---> mutation setBirthYear($name: String!, $setBornTo: Int!)
             |
             |---> calls `editAuthor` on backend with provided variables
                          |
                          |---> Backend executes resolver logic (e.g., updates DB)
                                      |
                                      |---> returns updated author data
                                                 |
                                                 |---> Client receives `name` and `born`

*/

