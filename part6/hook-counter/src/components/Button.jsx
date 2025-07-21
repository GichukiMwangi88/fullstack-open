import { useContext } from 'react'
import CounterContext from '../CounterContext'
import { useCounterDispatch } from '../CounterContext'

const Button = ({ type, label }) => {
  const [dispatch] = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}

export default Button
