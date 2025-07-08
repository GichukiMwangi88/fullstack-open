import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useContext } from 'react'
import NotificationContext from "./NotificationContext";

const AnecdoteForm = () => {
    const queryClient = useQueryClient()

    const anecdoteMutation = useMutation({ 
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }})

    const [notification, dispatch] = useContext(NotificationContext)

    const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
        anecdoteMutation.mutate({ content, votes: 0 })
        dispatch({ type: 'CREATE', payload: content })
        setTimeout(() => {
        dispatch({ type: 'CLEAR'})
        }, 5000)
    }
    else if (content.length < 5) {
        dispatch({ type: 'INVALID'})
        setTimeout(() => {
        dispatch({ type: 'CLEAR'})
        }, 5000)

    } 
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
    
  )
}

export default AnecdoteForm
