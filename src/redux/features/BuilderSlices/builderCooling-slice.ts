import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: builderCPUState
}
type builderCPUState = {
    name: string
    img: string
    tdp: string
    price: number
    chosen: boolean
}

const initialState = {
    value: {
        name: '',
        img: '',
        tdp: '',
        price: 0,
        chosen: true
    } as builderCPUState
} as InitialState


export const builderCooling = createSlice({
    name: 'builderCooling',
    initialState,
    reducers: {
        addNewCooling: (state, action: PayloadAction<{
            name: string, img: string, tdp: string, price: number}>) => {
            return{
                value : {
                    name: action.payload.name,
                    tdp: action.payload.tdp,
                    img: action.payload.img,
                    price: action.payload.price,
                    chosen: false
                }
            }
        },
        clearCooling: () => {return initialState}
    }
})

export const {addNewCooling, clearCooling} = builderCooling.actions
export default builderCooling.reducer
