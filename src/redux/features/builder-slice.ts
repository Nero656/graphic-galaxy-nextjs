import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState = {
    value: BuildState
}
type BuildState = {
    processor: {
        name: string
        socket: string
        chipset: string
        ram: string
        img: string
    }
    GPU: {
        name: string
        img: string
    }
    RAM: {
        name: string
        ram: string
        img: string
    }
    MatherBoard: {
        name: string
        socket: string
        chipset: string
        ram: string
        ssd: string
        img: string
    }
    colling: {
        name: string
        img: string
    }
    ssd: {
        name: string
        img: string
    }
    powerUnit: {
        name: string
        img: string
    }
    hdd: {
        name: string
        img: string
    }
    corpus: {
        name: string
        img: string
    }
}

const initialState = {
    value: {
        processor: {
            name: '',
            socket: '',
            chipset: '',
            ram: '',
            img: ''
        },
        GPU: {
            name: '',
            img: ''
        },
        RAM: {
            name: '',
            ram: '',
            img: '',
        },
        MatherBoard: {
            name: '',
            socket: '',
            chipset: '',
            ram: '',
            ssd: '',
            img: ''
        },
        colling: {
            name: '',
            img: ''
        },
        ssd: {
            name: '',
            img: ''
        },
        powerUnit: {
            name: '',
            img: ''
        },
        hdd: {
            name: '',
            img: ''
        },
        corpus: {
            name: '',
            img: ''
        }
    } as BuildState
} as InitialState


export const builder = createSlice({
    name: 'Builder',
    initialState,
    reducers: {
        processor: (state, action: PayloadAction<{
            processor: {
                name: string
                socket: string
                chipset: string
                ram: string
                img: string
            }}>) => {
            state.value.processor = action.payload.processor
        },

        // GPU: (state, action: PayloadAction<{name: string}>) => {
        //     return{
        //         value : {
        //             GPU: {
        //                 name: action.payload.name,
        //                 img: ''
        //             }
        //         }
        //     }
        // },

        // RAM: (state, action: PayloadAction<{
        //     RAM:{name: string, ram: string, img: string}}>) => {
        //     state.Build.RAM = action.payload.RAM
        // },
        //
        // MatherBoard: (state, action: PayloadAction<{
        //     MatherBoard:{
        //         name: string
        //         socket: string
        //         chipset: string
        //         ram: string
        //         ssd: string
        //         img: string
        //     }}>) => {
        //     state.Build.MatherBoard = action.payload.MatherBoard
        // },
        //
        // colling: (state, action: PayloadAction<{
        //     colling:{
        //         name: string
        //         img: string
        //     }}>) => {
        //     state.Build.colling = action.payload.colling
        // },
        //
        // ssd: (state, action: PayloadAction<{
        //     ssd:{
        //         name: string
        //         img: string
        //     }}>) => {
        //     state.Build.ssd = action.payload.ssd
        // },
        //
        // powerUnit: (state, action: PayloadAction<{
        //     powerUnit:{
        //         name: string
        //         img: string
        //     }}>) => {
        //     state.Build.powerUnit = action.payload.powerUnit
        // },
        //
        // hdd: (state, action: PayloadAction<{
        //     hdd:{
        //         name: string
        //         img: string
        //     }}>) => {
        //     state.Build.ssd = action.payload.hdd
        // },
        //
        // corpus: (state, action: PayloadAction<{
        //     corpus:{
        //         name: string
        //         img: string
        //     }}>) => {
        //     state.Build.ssd = action.payload.corpus
        // }
    }
})

// export const {GPU} = builder.actions
// export default builder.reducer
