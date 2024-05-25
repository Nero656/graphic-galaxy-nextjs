import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: BuildGPUState
}
type BuildGPUState = {
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
    } as BuildGPUState
} as InitialState


export const builderGPU = createSlice({
    name: 'builderGPU',
    initialState,
    reducers: {
        addNewGPU: (state, action: PayloadAction<{
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
        clearGPU: () => {return initialState}
    }
})

export const {addNewGPU, clearGPU} = builderGPU.actions
export default builderGPU.reducer
