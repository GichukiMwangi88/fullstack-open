import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setVote(state, action) {
      const updatedObject = action.payload // Extract the object from the actions payload
      console.log('Updated Object:', updatedObject)
      // const anecdoteToVote = state.find(a => a.id === updatedObject.id) // finds the anecdote with the matching id
      // const changedAnecdote = { // create a new object with the updated number of votes
      //   ...anecdoteToVote,
      //   votes: anecdoteToVote.votes + 1
      // }
      return state.map(anecdote => anecdote.id === updatedObject.id ? updatedObject : anecdote)
    },
    // setNewAnecdote(state,action) {
    //   //const content = action.payload
    //   state.push(action.payload)
    // },
    sortAnecdotes(state, action) {
      //console.log('State:', state)
      return [...state].sort((a,b) =>  a.votes - b.votes) // sorted ascending order
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }

})

export const { setVote, sortAnecdotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const returnedAnecdote= await anecdoteService.updateVote(anecdote.id, updatedAnecdote)
    dispatch(setVote(returnedAnecdote))
  }
}
export default anecdoteSlice.reducer

