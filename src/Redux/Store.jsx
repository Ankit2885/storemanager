import { configureStore } from '@reduxjs/toolkit'
import rootReducers from './Reducers'

export const store = configureStore({
    reducer: rootReducers
})