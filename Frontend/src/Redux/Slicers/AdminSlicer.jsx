import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestURL } from "../RequestData";

export const AdminAllProduct = createAsyncThunk('AdminAllProduct', async ({ page }) => {
    try {
        const response = await axios.get(`${RequestURL}/product?page=${page}`);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const AdminAllUser = createAsyncThunk('AdminAllUser', async () => {
    try {
        const response = await axios.get(`${RequestURL}/admin/users`, {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const AdminAllOrder = createAsyncThunk('AdminAllOrder', async () => {
    try {
        const response = await axios.get(`${RequestURL}/admin/orders`, {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

const AdminSlice = createSlice({
    name: 'AdminSlice',
    initialState: {
        UserList: [],
        ProductList: [],
        OrderList: [],
        loading: false,
        Error: false,
        Errormsg: ''
    },
    reducers: {

    },
    extraReducers: (builder) => {
        //get all product list
        builder.addCase(AdminAllProduct.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(AdminAllProduct.fulfilled, (state, action) => {
            state.loading = false
            state.ProductList = action.payload.response
            state.Error = false
            state.Errormsg = ''
        })
        builder.addCase(AdminAllProduct.rejected, (state, action) => {
            state.loading = false
            state.Error = true
            state.Errormsg = action.payload
        })

        // get all user list
        builder.addCase(AdminAllUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(AdminAllUser.fulfilled, (state, action) => {
            state.loading = false
            state.UserList = action.payload.response
            state.Error = false
            state.Errormsg = ''
        })
        builder.addCase(AdminAllUser.rejected, (state, action) => {
            state.loading = false
            state.Error = true
            state.Errormsg = action.payload
        })

        // get all order list
        builder.addCase(AdminAllOrder.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(AdminAllOrder.fulfilled, (state, action) => {
            state.loading = false
            state.OrderList = action.payload.response
            state.Error = false
            state.Errormsg = ''
        })
        builder.addCase(AdminAllOrder.rejected, (state, action) => {
            state.loading = false
            state.Error = true
            state.Errormsg = action.payload
        })
    }
})

export const AdminActions = AdminSlice.actions
export default AdminSlice