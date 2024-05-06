import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../feature/filter.slice'

export const store = configureStore({
  reducer: {
    filter:filterReducer
  },
})