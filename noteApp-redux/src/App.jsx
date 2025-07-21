import { useEffect } from 'react'
import noteService from './services/notes'
import { initializeNotes, setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import Notes from "./components/Notes"
import NewNote from "./components/NewNote"
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [])
  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
