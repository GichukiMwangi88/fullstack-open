const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
        const goodCounter = {
            ...state,
            good: state.good + 1
        }
        
      return goodCounter
    case 'OK':
        const okCounter = {
            ...state,
            ok: state.ok + 1
        }
        
      return okCounter
      
    case 'BAD':
        const badCounter = {
            ...state,
            bad: state.bad + 1
        }
      return badCounter
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
