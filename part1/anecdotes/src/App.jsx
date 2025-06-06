import { useState } from 'react'

const Button = (props) => {
  //console.log('props value is ', props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>{text}</button>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  //const [mostVoted, setMostVoted] = useState(0)
  //console.log(mostVoted)

  //handle Next Anecdote
  const handleNextAnecdote = () => {
    const selectedIndex = Math.floor(Math.random() * anecdotes.length)
    //console.log(selectedIndex)
    setSelected(selectedIndex)
    console.log(selectedIndex)
  }

  // Count votes
  const handleVote = () => {
    //console.log(votes)
    const newVotes = [...votes]
    console.log(newVotes)
    newVotes[selected] += 1
    setVotes(newVotes)
    //mostVotes()
    // setMostVoted(() => votes.indexOf(Math.max(...votes)))
    // console.log(mostVoted)

    //console.log(votes[mostVoted])
    

  }

  // Determine the most voted anecdote
  const mostVotes = () => {
    return votes.indexOf(Math.max(...votes))
  }

  // // Find the most voted anecdote
  // const mostVotes = () => {
  //   votes.indexOf(Math.max(...votes))
    
  // } 


  return (
    <>
    <div>
      <h2>Anecdote of the Day</h2>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
    </div>
    <Button onClick={handleVote} text='Vote' />
    <Button onClick={handleNextAnecdote} text='Next Anecdote' />
    <div>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[mostVotes()]}</p>
      <p>has {votes[mostVotes()]} votes</p>
    </div>
    
      
      
    </>
  )
}

export default App
