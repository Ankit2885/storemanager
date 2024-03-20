import { configureStore } from '@reduxjs/toolkit'
import UserAction from '../src/Redux/Actions/UserAction'

export const store = configureStore({
    reducer: {
        user: UserAction
    }
})