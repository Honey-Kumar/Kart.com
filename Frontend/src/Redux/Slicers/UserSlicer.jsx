import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestURL } from "../RequestData";

export const LoginUser = createAsyncThunk("LoginUser", async ({ email = "", password = "" }) => {
    try {
        console.log(email, typeof (email), password, typeof (password))
        const data = {
            email,
            password
        }
        console.log(data)
        const response = await axios.post(`${RequestURL}/user/login`, data, {
            withCredentials: true,
            credentials: 'include'
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const LogoutUser = createAsyncThunk("LogoutUser", async () => {
    try {
        const response = await axios.get(`${RequestURL}/logout`, {
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

export const RegisterUser = createAsyncThunk('RegisterUser', async (data) => {
    try {
        console.log(data)
        const response = await axios.post(`${RequestURL}/user/new`, data, {
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})


export const UpdateUserData = createAsyncThunk('UpdateUserData', async ({ userdata, id }) => {
    try {
        console.log(userdata)
        console.log(id)
        const response = await axios.put(`${RequestURL}/user/${id}`, userdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            },
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


export const DeleteUser = createAsyncThunk('DeleteUser', async (id) => {
    try {
        console.log("id is ", id)
        const response = await axios.delete(`${RequestURL}/user/${id}`, {
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


export const ForgetPassThunk = createAsyncThunk('ForgetPassThunk', async (data) => {
    console.log(data)
    try {

        const response = await axios.post(`${RequestURL}/password/forget`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            withCredentials: true,
            credentials: 'include'
        })
        console.log('response is ', response)
        return response.data

    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response?.data?.message || "Something went wrong");
    }
})

export const ResetPasswordThunk = createAsyncThunk('ResetPasswordThunk', async ({ data, token }) => {
    console.log(data, token)
    try {
        const response = await axios.put(`${RequestURL}/user/password/${token}`, data, {
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

const UserSlicer = createSlice({
    name: "User",
    initialState: {
        User: {},
        isLoading: false,
        isError: false,
        Errmsg: '',
        isAuthenticate: false,
        isLogout: false,
        isUpdated: false,
        isDeleted: false,
        isforget: false,
        message: {},
        isResetPass: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        //loginUser
        builder
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticate = true;
                state.User = action.payload;
                state.isError = false;
                state.Errmsg = '';
                state.isUpdated = false;
                state.isDeleted = false;
                state.isLogout = false;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.Errmsg = action.error.message;
                state.User = {}
                state.isLoading = false;
                state.isError = true;
                state.isUpdated = false;
                state.isDeleted = false;
                state.isAuthenticate = false
            })

        //logoutUser
        builder.addCase(LogoutUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(LogoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticate = false;
            state.isError = false;
            state.Errmsg = "";
            state.User = {};
            state.isLogout = true;
            state.isDeleted = false;
        })
        builder.addCase(LogoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.Errmsg = action.error.message;
            state.isAuthenticate = false;
            state.User = {};
            state.isLogout = false
            state.isDeleted = false
        })


        // RegisterUser
        builder.addCase(RegisterUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticate = true;
            state.isError = false;
            state.Errmsg = "";
            state.User = action.payload;
            state.isLogout = false;
            state.isDeleted = false

        })
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.Errmsg = action.error.message;
            state.isAuthenticate = false;
            state.User = {}
            state.isDeleted = false
            state.isLogout = false
        })

        //UpdateUserData
        builder.addCase(UpdateUserData.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(UpdateUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticate = true;
            state.isError = false;
            state.Errmsg = "";
            state.User = action.payload;
            state.isLogout = false;
            state.isUpdated = true;
        })
        builder.addCase(UpdateUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.Errmsg = action.error.message;
            state.isAuthenticate = false;
            state.User = {};
            state.isUpdated = false
            state.isDeleted = false
        })

        // DeleteUser
        builder.addCase(DeleteUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(DeleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticate = false;
            state.isError = false;
            state.Errmsg = "";
            state.User = {};
            state.isLogout = false;
            state.isUpdated = false;
            state.isDeleted = true;
        })
        builder.addCase(DeleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.Errmsg = action.error.message;
            state.isAuthenticate = false;
            state.User = {};
            state.isUpdated = false;
            state.isLogout = false;
            state.isDeleted = false;
        })

        //Forgetpassthunk
        builder.addCase(ForgetPassThunk.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(ForgetPassThunk.fulfilled, (state, action) => {
            console.log('action.payload', action.payload)
            state.isLoading = false;
            state.isAuthenticate = true;
            state.isError = false;
            state.Errmsg = "";
            state.isLogout = false;
            state.isUpdated = false;
            state.isDeleted = false;
            state.isforget = true;
            state.message = action.payload
        })
        builder.addCase(ForgetPassThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.Errmsg = action.error.message;
            state.isAuthenticate = false;
            state.isUpdated = false;
            state.isLogout = false;
            state.isDeleted = false;
            state.isforget = false;
            state.message = ''
        })

        //ResetPasswordThunk
        builder.addCase(ResetPasswordThunk.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(ResetPasswordThunk.fulfilled, (state, action) => {
            console.log('action.payload', action.payload)
            state.isLoading = false;
            state.isAuthenticate = true;
            state.isError = false;
            state.Errmsg = "";
            state.isLogout = false;
            state.isUpdated = false;
            state.isDeleted = false;
            state.isforget = true;
            state.message = action.payload;
            state.User = action.payload;
            state.isResetPass = true;
        })
        builder.addCase(ResetPasswordThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.Errmsg = action.error.message;
            state.isAuthenticate = false;
            state.isUpdated = false;
            state.isLogout = false;
            state.isDeleted = false;
            state.isforget = false;
            state.message = '';
            state.isResetPass = false;
        })
    }
})

export const UserActions = UserSlicer.actions
export default UserSlicer