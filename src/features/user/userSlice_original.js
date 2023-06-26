/*
----------
This is the whole userSlice before refactoring. Just for reference.
----------
*/ 

import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage'


const initialState={
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage()
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.isSidebarOpen=!state.isSidebarOpen;
        },
        logoutUser:(state)=>{
            state.user=null;
            state.isSidebarOpen=false;
            removeUserFromLocalStorage();
        }
    },
    extraReducers:function(builder) {

        builder
        // for registerUser
        .addCase(registerUser.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(registerUser.fulfilled,  (state,action)=>{
            const {user}=action.payload;
            state.isLoading=false;
            state.user=user;
            addUserToLocalStorage(user)
            toast.success(`Hello There ${user.name}`)
        })
        .addCase(registerUser.rejected,(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload)
        })
        // for loginUser
        .addCase(loginUser.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(loginUser.fulfilled,  (state,action)=>{
            const {user}=action.payload;
            state.isLoading=false;
            state.user=user;
            addUserToLocalStorage(user)
            toast.success(`Welcome Back ${user.name}`)
        })
        .addCase(loginUser.rejected,(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload)
        })
        // for update user
        .addCase(updateUser.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(updateUser.fulfilled,  (state,action)=>{
            const {user}=action.payload;
            state.isLoading=false;
            state.user=user;
            addUserToLocalStorage(user)
            toast.success("User Updated")
        })
        .addCase(updateUser.rejected,(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload)
        })
   }
})

export const registerUser= createAsyncThunk('user/registerUser',async(data,thunkAPI)=>{
    try {
        const res= await customFetch.post('/auth/register',data)
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

export const loginUser= createAsyncThunk('user/loginUser',async(data,thunkAPI)=>{
    try {
        const res= await customFetch.post('/auth/login',data)
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

export const updateUser=createAsyncThunk('user/updateUser',async(user,thunkAPI)=>{
    try {
        const res= await customFetch.patch('/auth/updateUser',user,{
            headers:{
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return res.data;
    } catch (error) {
        // console.log(error.response);
        if(error.response.status==401){
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');            // If there is any issue with authorization, the user will be logged out
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

export const {toggleSidebar,logoutUser}=userSlice.actions;
export default userSlice.reducer;