/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { sortAnecdotes, setVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer";
import { clearNotification } from "../reducers/notificationReducer";

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

   const notify = ({ anecdote }) => {
    console.log('Anecdote Content: ',anecdote.content)
    dispatch(setNotification(`you voted '${anecdote.content}'`))

    setTimeout(() => {dispatch(clearNotification())}, 5000)

   }

    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        dispatch(setVote(anecdote.id))
                        notify({ anecdote })
                        //dispatch(setNotification(`you voted '${anecdote.content}'`))
                        //dispatch(clearNotification())
                        dispatch(sortAnecdotes())
                    } 
                    }
                />
            )}
        </div>
    )
}

export default AnecdoteList


