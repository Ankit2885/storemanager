import { configureStore } from '@reduxjs/toolkit'
import { HeaderAlertReducer } from './Reducers/HeaderAlertReducer'

export const store = configureStore({
    reducer: {
        alert: HeaderAlertReducer
    }
})