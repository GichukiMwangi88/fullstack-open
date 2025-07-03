import { createSlice } from '@reduxjs/toolkit'

// Create a filterSlice that combines the filter reducer and setFilter
// action creator

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, action) {
          return action.payload
        }

    }
})

export const { setFilter } = filterSlice.actions // For dispatch
export default filterSlice.reducer

