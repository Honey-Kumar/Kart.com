import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { request, RequestURL } from "../RequestData";

export const FetchProduct = createAsyncThunk('GettingProduct', async ({ keyword = '', page = 1, price = [0, 100000], category = '', ratings = 0 } = {}) => {
    try {

        let link = `${RequestURL}${request.product?.allproduct}?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (category) link = `${RequestURL}${request.product?.allproduct}?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`

        const response = await axios.get(link);
        console.log(link)
        //"http://localhost:4001/product"
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const FetchProductDetails = createAsyncThunk('ProductDetails', async (id) => {
    try {
        const response = await axios.get(`${RequestURL}${request.product?.detailes}/${id}`, {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const AddUpdateProductReview = createAsyncThunk('AddUpdateProductReview', async ({ reviewdata, id }) => {
    console.log('AddUpdateProductReview is called ', reviewdata, id)
    try {
        const response = await axios.put(`${RequestURL}/product/review/${id}`, reviewdata, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

//Admin Actions
//Create New Product
export const CreateNewProduct = createAsyncThunk('CreateNewProduct', async (Productdata) => {
    console.log('Received Product is ', Productdata)
    try {
        const response = await axios.post(`${RequestURL}/product/new`, Productdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true,
            credentials: 'include'
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

// Update Product 
export const UpdateProductData = createAsyncThunk('UpdateProductData', async ({ prductdata, pId }) => {
    console.log('Received Product is ', prductdata, ' id is ', pId)
    try {
        const response = await axios.put(`${RequestURL}/product/${pId}`, prductdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true,
            credentials: 'include'
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

//Delete a Product
export const DeleteProduct = createAsyncThunk('DeleteProduct', async (id) => {
    console.log('id', id)
    try {
        const response = await axios.delete(`${RequestURL}/product/${id}`, {
            withCredentials: true,
            credentials: 'include'
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Something went wrong");
    }

})

const ProductSlicer = createSlice({
    name: 'ProductList',
    initialState: {
        isLoading: false,
        isError: false,
        Errmsg: '',
        product: [],
        productdetails: {},
        isReviewAdded: false,
        isdeleted: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // Get All product Extrareducers
        builder.addCase(FetchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.Errmsg = '';
            state.product = action.payload
            state.isReviewAdded = false
            state.isdeleted = false
        })
        builder.addCase(FetchProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(FetchProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.Errmsg = action.error.message
            state.isReviewAdded = false
            state.isdeleted = false
        })


        // Product Details Extrareducers
        builder.addCase(FetchProductDetails.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(FetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.Errmsg = ''
            state.productdetails = action.payload
            state.isReviewAdded = false
            state.isdeleted = false
        })
        builder.addCase(FetchProductDetails.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.Errmsg = action.error.message
            state.isReviewAdded = false
            state.isdeleted = false
        })

        //handling AddUpdateReview 
        builder.addCase(AddUpdateProductReview.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(AddUpdateProductReview.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.Errmsg = ''
            state.isReviewAdded = true
            state.isdeleted = false
        })
        builder.addCase(AddUpdateProductReview.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.Errmsg = action.error.message
            state.isReviewAdded = false
            state.isdeleted = false
        })


        //Admin Routes
        //Create New product
        builder.addCase(CreateNewProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(CreateNewProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.Errmsg = ''
            state.isReviewAdded = false
            state.isdeleted = false
        })
        builder.addCase(CreateNewProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.Errmsg = action.error.message
            state.isReviewAdded = false
            state.isdeleted = false
        })

        //Update Product
        builder.addCase(UpdateProductData.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(UpdateProductData.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.Errmsg = ''
            state.isReviewAdded = false
            state.isdeleted = false
        })
        builder.addCase(UpdateProductData.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.Errmsg = action.error.message
            state.isReviewAdded = false
            state.isdeleted = false
        })

        //delete Product
        builder.addCase(DeleteProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(DeleteProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.Errmsg = ''
            state.isReviewAdded = false
            state.isdeleted = true
        })
        builder.addCase(DeleteProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.Errmsg = action.error.message
            state.isReviewAdded = false
            state.isdeleted = false
        })

    }
})
export const ProductActions = ProductSlicer.actions;
export default ProductSlicer;