const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  // Takes two parameters, current state and dispatched action
  console.log('state now: ', state)
  console.log('action', action)
  console.log('Action Type:',action.type)
  switch(action.type) {
    case 'VOTE': {
      const id = action.payload.id // Extract the id from the actions payload
      const anecdoteToVote = state.find(a => a.id === id) // finds the anecdote with the matching id
      const changedAnecdote = { // create a new object with the updated number of votes
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote) // map over the entire state of the array
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.payload]
    }
    default: return state
  }


}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer
