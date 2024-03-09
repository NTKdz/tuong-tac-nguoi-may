import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices'

export default configureStore({
  reducer: {
    counter: counterSlice
  }
})