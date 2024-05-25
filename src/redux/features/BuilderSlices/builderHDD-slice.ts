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


export const builderHDD = createSlice({
    name: 'builderCooling',
    initialState,
    reducers: {
        addNewHDD: (state, action: PayloadAction<{
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
        clearHDD: () => {return initialState}
    }
})

export const {addNewHDD, clearHDD} = builderHDD.actions
export default builderHDD.reducer
