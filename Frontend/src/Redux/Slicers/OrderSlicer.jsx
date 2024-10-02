import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestURL } from "../RequestData";

export const CreateOrderThunk = createAsyncThunk("CreateOrderThunk", async (Orderdata) => {
    try {
        const response = await axios.post(`${RequestURL}/order/new`, Orderdata, {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const GetMyOrdersThunk = createAsyncThunk('GetMyOrdersThunk', async () => {
    try {
        const response = await axios.get(`${RequestURL}/me/orders`, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const OrderDetailsThunk = createAsyncThunk('OrderDetailsThunk', async (id) => {
    console.log(id)
    try {
        const response = await axios.get(`${RequestURL}/order/${id}`, {
            withCredentials: true,
            credentials: 'include'
        })
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

//Admin Action to Change Status of Order
export const ChangeOrderStatus = createAsyncThunk('ChangeOrderStatus', async ({ status, id }) => {
    console.log('status and id ', status, id)
    try {
        const response = await axios.put(`${RequestURL}/admin/order/${id}`, { status }, {
            withCredentials: true,
            credentials: 'include'
        })
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})


const OrderSlicer = createSlice({
    name: 'OrderSlicer',
    initialState: {
        OrderList: [],
        OrderDetail: {},
        OrderLoading: false,
        OrderError: false,
        OrderErrmsg: ''
    },
    reducers: {
        clearOrders: (state) => {
            console.log('Clearing the entire WishList.');
            state.OrderList = [];
            state.OrderDetail = {};
            state.OrderErrmsg = ''
            state.OrderError = false
            state.OrderLoading = false
        }
    },
    extraReducers: (builder) => {
        //handling Create Order
        builder.addCase(CreateOrderThunk.pending, (state, action) => {
            state.OrderLoading = true;
        })
        builder.addCase(CreateOrderThunk.fulfilled, (state, action) => {
            state.OrderList.push(action.payload.response)
            state.OrderLoading = false
            state.OrderError = false
            state.OrderErrmsg = ''
        })
        builder.addCase(CreateOrderThunk.rejected, (state, action) => {
            state.OrderLoading = false
            state.OrderError = true
            state.OrderErrmsg = action.payload
        })

        // handling Login User orders
        builder.addCase(GetMyOrdersThunk.pending, (state, action) => {
            state.OrderLoading = true;
        })
        builder.addCase(GetMyOrdersThunk.fulfilled, (state, action) => {
            state.OrderLoading = false
            const data = [...action.payload.response]
            state.OrderList = data
            state.OrderErrmsg = ''
            state.OrderError = false
        })
        builder.addCase(GetMyOrdersThunk.rejected, (state, action) => {
            state.OrderLoading = false
            state.OrderError = true
            state.OrderErrmsg = action.payload
        })

        // Order Details
        builder.addCase(OrderDetailsThunk.pending, (state, action) => {
            state.OrderLoading = true;
        })
        builder.addCase(OrderDetailsThunk.fulfilled, (state, action) => {
            state.OrderLoading = false
            state.OrderDetail = action.payload.response
            state.OrderErrmsg = ''
            state.OrderError = false
        })
        builder.addCase(OrderDetailsThunk.rejected, (state, action) => {
            state.OrderLoading = false
            state.OrderError = true
            state.OrderErrmsg = action.payload
        })

        //Admin Action to change Order Status
        builder.addCase(ChangeOrderStatus.pending, (state, action) => {
            state.OrderLoading = true;
        })
        builder.addCase(ChangeOrderStatus.fulfilled, (state, action) => {
            state.OrderLoading = false
            state.OrderErrmsg = ''
            state.OrderError = false
        })
        builder.addCase(ChangeOrderStatus.rejected, (state, action) => {
            state.OrderLoading = false
            state.OrderError = true
            state.OrderErrmsg = action.payload
        })
    }
})

export const OrderActions = OrderSlicer.actions
export default OrderSlicer