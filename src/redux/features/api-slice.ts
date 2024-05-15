import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: PathState
}

type PathState = {
    url: string
    imageUrl: string
}

const initialState = {
    value :{
        url: 'http://192.168.1.90:1337/graphql',
        imageUrl: 'http://192.168.1.90:1337'
    } as PathState
} as InitialState

export const api = createSlice({
    name: 'url',
    initialState,
    reducers: {
        getPath: (state, action: PayloadAction<string>) => {return initialState}
    }
})

export const { getPath } = api.actions
export default api.reducer