import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface ProductState {
    id: number,
    Name: string,
    Description: string,
    Price: number,
    Image: string
    quantity: number
}


interface OrderList {
    products: ProductState[]
}

const initialState: OrderList = {
    products: []
}


export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<
            { Name: string, Image: string, Description: string, Price: number, quantity: number }>) => {
            state.products.push({
                id: state.products.length,
                Name: action.payload.Name,
                Image: action.payload.Image,
                Description: action.payload.Description,
                Price: action.payload.Price,
                quantity: 1
            })

        },
        deleteProduct: (state, action: PayloadAction<{ id: number }>) => {
            state.products.splice(action.payload.id, 1)
        },
        clearBasket:
            (state) => {
                state.products = []
            }
    }
})

export const {
    addProduct,
    deleteProduct,
    clearBasket
} = order.actions
export default order.reducer
