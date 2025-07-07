/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { sortAnecdotes } from "../reducers/anecdoteReducer"
//import { setNotification } from "../reducers/notificationReducer";
import { setNotifyWithTimeout } from '../reducers/notificationReducer'
//import { clearNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

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
    // useSelector allows us to access Redux state inside the component
    // the parameters passed are the entire Redux store state managed by the respective reducers
    const anecdotes = useSelector(({filter, anecdotes})=> {
        console.log('Anecdotes List:', anecdotes)
        console.log('Filter:', filter) // --> []
        //console.log(typeof filter) // --> object
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
                        dispatch(voteAnecdote(anecdote))
                        dispatch(setNotifyWithTimeout(`you voted ${anecdote.content}`, 3))
                        dispatch(sortAnecdotes())
                    } 
                    }
                />
            )}
        </div>
    )
}

export default AnecdoteList


