// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import { createStore } from 'redux'


// const counterReducer = (state = 0, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1
//         case 'DECREMENT':
//             return state - 1
//         case 'ZERO':
//             return 0
//         default: // if none of the above matches, code comes here
//             return state
//     }
  
// }

// const store = createStore(counterReducer)

// store.subscribe(() => {
//   const storeNow = store.getState()
//   console.log(storeNow)
// })

// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'ZERO' })
// store.dispatch({ type: 'DECREMENT' })


// /* Notes
// - Reducer is never supposed to be called directly from the app code
// - Only supposed to be given as a parameter to the createStore function
// - Create store function creates the store
// - The store can use the reducer to handle actions, they are dispatched/sent to 
// store using dispatch method
// - You can find the state of the store using getState()
// - Another method is subscribe(), used to create callback functions thats called by store
// when an action is sent/dispatched to store

// **/

// const App = () =>  {

//   return (
//     <div>
//       <div>
//         {store.getState()}
//       </div>
//       <button
//         onClick={e => store.dispatch({ type: 'INCREMENT'})}
//       >
//         plus
//       </button>
//       <button
//         onClick={e => store.dispatch({ type: 'DECREMENT'})}
//       >
//         minus
//       </button>
//       <button
//         onClick={e => store.dispatch({ type: 'ZERO'})}
//       >
//         zero
//       </button>
      
//     </div>
//   )
// }

export default App
