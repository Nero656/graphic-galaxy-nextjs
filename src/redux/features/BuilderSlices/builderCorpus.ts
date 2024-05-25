import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: builderCPUState
}
type builderCPUState = {
    name: string
    img: string
    price: number
    chosen: boolean
}

const initialState = {
    value: {
        name: '',
        img: '',
        price: 0,
        chosen: true
    } as builderCPUState
} as InitialState


export const builderCase = createSlice({
    name: 'builderCooling',
    initialState,
    reducers: {
        addNewCase: (state, action: PayloadAction<{
            name: string, img: string, price: number}>) => {
            return{
                value : {
                    name: action.payload.name,
                    img: action.payload.img,
                    price: action.payload.price,
                    chosen: false
                }
            }
        },
        clearCorpus: () => {return initialState}
    }
})

export const {addNewCase, clearCorpus} = builderCase.actions
export default builderCase.reducer
