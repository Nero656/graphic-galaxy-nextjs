import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: builderCPUState
}
type builderCPUState = {
    name: string
    socket: string
    chipset: string
    ram: string
    img: string
    price: number
    chosen: boolean
}

const initialState = {
    value: {
        name: '',
        socket: '',
        chipset: '',
        ram: '',
        img: '',
        price: 0,
        chosen: true
    } as builderCPUState
} as InitialState


export const builderMotherboard = createSlice({
    name: 'builderMotherboard',
    initialState,
    reducers: {
        addNewMatherBoard: (state, action: PayloadAction<{
            name: string, img: string, socket: string, chipset: string, ram: string, price: number}>) => {
            return{
                value : {
                    name: action.payload.name,
                    socket: action.payload.socket,
                    chipset: action.payload.chipset,
                    ram: action.payload.ram,
                    img: action.payload.img,
                    price: action.payload.price,
                    chosen: false
                }
            }
        },
        clearMB: () => {return initialState}
    }
})

export const {addNewMatherBoard, clearMB} = builderMotherboard.actions
export default builderMotherboard.reducer
