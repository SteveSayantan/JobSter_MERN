/* 
--------
To make userSlice a bit less clumsy, we are moving thunk-functions in this module.
--------
*/

import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { clearAllJobsState } from '../all-jobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice'

export const registerUserThunk= async(url,user,thunkAPI)=>{
    try {
        const res= await customFetch.post(url,user)
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const loginUserThunk= async(url,user,thunkAPI)=>{
    try {
        const res= await customFetch.post(url,user)
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

export const updateUserThunk= async(url,user,thunkAPI)=>{
    try {
        const res= await customFetch.patch(url,user,{
            headers:{
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return res.data;
    } catch (error) {
        
        /* 

        // console.log(error.response);
        if(error.response.status==401){
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');            // If there is any issue with authorization, the user will be logged out
        }
        return thunkAPI.rejectWithValue(error.response.data.msg); 
        
        */
       // The code block is replaced by the following line
       return checkForUnauthorizedResponse(error,thunkAPI)
    }
}

export const clearStoreThunk= async(message,thunkAPI)=>{
    try {
        //clear jobs 
        thunkAPI.dispatch(clearAllJobsState())
        // clear jobs input
        thunkAPI.dispatch(clearValues())
        //logout user
        thunkAPI.dispatch(logoutUser(message))
        return Promise.resolve();
    } catch (error) {
        return Promise.reject()
    }
}