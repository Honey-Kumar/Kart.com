import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { RequestURL } from "../RequestData"

export const AddtoCart = createAsyncThunk('AddtoCart', async ({ id, quantity }) => {
    console.log(id, quantity)
    try {
        const response = await axios.get(`${RequestURL}/product/${id}`, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log(response)
        return { data: response.data, quantity: quantity };
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

const CartSlicer = createSlice({
    name: 'Cart',
    initialState: {
        CartIteams: [],
        shippingDetails: [],
        confirmShipping: {},
        Loading: false,
        Errors: false,
        Errormsg: '',
        iteamadded: false
    },
    reducers: {
        removeProductFromCart: (state, action) => {
            console.log('id product to remove from cart', action.payload)
            //check wheter the id is existing in cart
            console.log('cartiteam before removinging from cart', state.CartIteams)
            state.CartIteams = state.CartIteams.filter(i => i.iteam.response._id.toString() !== action.payload.toString())
            console.log('cartiteam after removinging from cart', state.CartIteams)
        },

        AddShippingAddress: (state, action) => {
            console.log(action.payload);
            const index = state.shippingDetails.findIndex(i => i.phone === action.payload.phone);

            if (index !== -1) {
                // Update the existing shipping address
                state.shippingDetails[index] = action.payload;
            } else {
                // If it doesn't exist, add the new shipping address
                state.shippingDetails.push(action.payload);
            }
        },

        ConfirmShippingAddress: (state, action) => {
            console.log(action.payload);
            state.confirmShipping = action.payload
        },

        clearCartIteams: (state, action) => {
            console.log(action.payload);
            state.CartIteams = state.CartIteams.filter(item => !action.payload.includes(item.iteam.response._id.toString()));
            console.log('Cart after clearing:', state.CartIteams);
        },

        clearCart: (state) => {
            console.log('Clearing the entire cart.');
            state.CartIteams = [];
            state.shippingDetails = [];
            state.confirmShipping = {}
            state.Errormsg = ''
            state.Errors = false
            state.iteamadded = false
            state.Loading = false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(AddtoCart.pending, (state, action) => {
            state.Loading = true
            state.iteamadded = false
            state.Errormsg = ''
            state.Errors = false
        })
        builder.addCase(AddtoCart.fulfilled, (state, action) => {
            state.Loading = false

            let isExisted = false
            state.CartIteams.find(i => {
                console.log('Comparing:', i.iteam.response._id, action.payload.data.response._id);
                if (i.iteam.response._id.toString() === action.payload.data.response._id.toString()) {
                    i.quantity += action.payload.quantity
                    isExisted = true
                }
            });

            if (!isExisted) state.CartIteams.push({ iteam: action.payload.data, quantity: action.payload.quantity });
            state.iteamadded = true;
        })
        builder.addCase(AddtoCart.rejected, (state, action) => {
            state.Loading = false
            state.Errors = true
            state.Errormsg = action.payload
            state.iteamadded = false
        })
    }
})

export const CartActions = CartSlicer.actions
export default CartSlicer