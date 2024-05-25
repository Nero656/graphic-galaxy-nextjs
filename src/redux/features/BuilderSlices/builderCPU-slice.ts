import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: builderCPUState
}
type builderCPUState = {
    name: string
    socket: string
    ram: string
    img: string
    price: number
    chosen: boolean
}

const initialState = {
    value: {
        name: '',
        socket: '',
        ram: '',
        img: '',
        price: 0,
        chosen: true
    } as builderCPUState
} as InitialState


export const builderCPU = createSlice({
    name: 'builderCPU',
    initialState,
    reducers: {
        addNewCPU: (state, action: PayloadAction<{
            name: string, img: string, socket: string, ram: string, price: number}>) => {
            return{
                value : {
                    name: action.payload.name,
                    socket: action.payload.socket,
                    ram: action.payload.ram,
                    img: action.payload.img,
                    price: action.payload.price,
                    chosen: false
                }
            }
        },
        clearCPU: () => {return initialState}
    }
})

export const {addNewCPU, clearCPU} = builderCPU.actions
export default builderCPU.reducer
