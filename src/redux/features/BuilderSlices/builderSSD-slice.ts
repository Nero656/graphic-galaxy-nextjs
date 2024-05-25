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


export const builderSSD = createSlice({
    name: 'builderCooling',
    initialState,
    reducers: {
        addNewSDD: (state, action: PayloadAction<{
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
        clearSSD: () => {return initialState}
    }
})

export const {addNewSDD, clearSSD} = builderSSD.actions
export default builderSSD.reducer
