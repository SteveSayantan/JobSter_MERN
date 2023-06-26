import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage'
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk'


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
        logoutUser:(state,{payload})=>{
            state.user=null;
            state.isSidebarOpen=false;
            removeUserFromLocalStorage();
            if(payload){
                toast.success(payload)
            }
        }
    },
    extraReducers(builder){

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
        // for clearing store
        .addCase(clearStore.rejected,()=>{
            toast.error('There was an error');
        })
   }
})

export const registerUser= createAsyncThunk('user/registerUser',(data,thunkAPI)=>{          // As returned function is already async, we don't need to make this cb function async
   return registerUserThunk('/auth/register',data,thunkAPI);
})

export const loginUser= createAsyncThunk('user/loginUser',(data,thunkAPI)=>{
    return loginUserThunk('/auth/login',data,thunkAPI);
})

export const updateUser=createAsyncThunk('user/updateUser',(data,thunkAPI)=>{
    return updateUserThunk('/auth/updateUser',data,thunkAPI)
})

export const clearStore= createAsyncThunk('user/clearStore',clearStoreThunk);

export const {toggleSidebar,logoutUser}=userSlice.actions;
export default userSlice.reducer;