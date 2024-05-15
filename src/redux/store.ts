import {configureStore} from '@reduxjs/toolkit'
import api from './features/api-slice'


export const store = configureStore({
    reducer: {
        api
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch