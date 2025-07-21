const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  
  enum YesNo {
    YES
    NO
  }

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
        ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
        ): Author
    }
    
`

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root,args) => {
        // if no matching author and genre is provided(args not provided),
        //  just return all books
        if (!args.author && !args.genre) {
            return books
        }

        // Create a starting point so don't have to reset books again and again 
        // when applying the filter logic
        let filteredBooks = books

        // If author matches, return only books by author
        if (args.author) {
            filteredBooks = filteredBooks.filter(b => b.author === args.author)
        }
        // Only return books of that genre specified in the parameters
        if (args.genre) {
            filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
        }

        return filteredBooks
  
    },
    allAuthors: () => {
        return authors.map(author => {

            return {
                name: author.name,
                born: author.born,
                bookCount: books.filter(b => b.author === author.name).length
            }  
        })
    }
  },
  Mutation: {
    addBook: (root, args) => {
        // Check if author is in system
        const authorInDatabase = authors.find(author => author.name === args.author)
        if (authorInDatabase) {
            // Create the new book object
            const book = {...args, id: uuid() }

            // Add the book to the books array of objects
            books = books.concat(book)

            // Increment author's book count
            authorInDatabase.bookCount += 1

            return book
        } else {
            // Author doesn't exist
            const newAuthor = {
                name: args.author,
                id: uuid(),
                born: null,
                bookCount: 1
            }

            // Add the new author to the authors array
            authors = authors.concat(newAuthor)

            // Create the new book object
            const book = { ...args, id: uuid() }
            books = books.concat(book)

            return book
        }

    }, 
    editAuthor: (root, args) => {
        // Look for author in db
        const authorInDB = authors.find(author => author.name === args.name)
        
        // If author not in db, just return null
        if(!authorInDB) {
            return null

        }

        // Update the author in db
        const updatedAuthor = {...authorInDB, born: args.setBornTo }
        authors = authors.map(author => author.name === args.name 
                    ? updatedAuthor : author)
        return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
