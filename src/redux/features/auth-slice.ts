import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: AuthState
}

type AuthState = {
    id: number
    username: string
    email: string
    jwt: string
}

const initialState = {
    value : {
        id: 0,
        username: '',
        email: '',
        jwt: '',
    } as AuthState
} as InitialState

export const auth = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },

        logIn: (state, action: PayloadAction<{jwt: string,
            user: {
                id: number
                username: string,
                email: string,
                jwt: string,
            }
        }>) => {
            return {
                value: {
                    id: action.payload.user.id,
                    username: action.payload.user.username,
                    email: action.payload.user.email,
                    jwt:  action.payload.jwt,
                    blocked: false
                }
            }
        }
    }
})

export const { logOut, logIn,  } = auth.actions
export default auth.reducer