import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: builderCPUState
}
type builderCPUState = {
    name: string
    ram: string
    img: string
    price: number
    chosen: boolean
}

const initialState = {
    value: {
        name: '',
        ram: '',
        img: '',
        price: 0,
        chosen: true
    } as builderCPUState
} as InitialState


export const builderRAM = createSlice({
    name: 'builderCPU',
    initialState,
    reducers: {
        addNewRAM: (state, action: PayloadAction<{
            name: string, img: string, ram: string, price: number}>) => {
            return{
                value : {
                    name: action.payload.name,
                    ram: action.payload.ram,
                    img: action.payload.img,
                    price: action.payload.price,
                    chosen: false
                }
            }
        },
        clearRam: () => {return initialState}
    }
})

export const {addNewRAM, clearRam} = builderRAM.actions
export default builderRAM.reducer
