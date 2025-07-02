/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { sortAnecdotes, vote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            {anecdote.content}
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotes = useSelector(({filter, anecdotes})=> {
        console.log('Anecdotes List:', anecdotes)
        if (filter === '') {
            return anecdotes
        }
        return filter !== ''
         ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
         : anecdotes
    })

    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(vote(anecdote.id))
                        dispatch(sortAnecdotes())
                    } 
                    }
                />
            )}
        </div>
    )
}

export default AnecdoteList


