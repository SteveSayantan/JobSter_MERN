/* 
--------
    This is the original jobSlice file before refactoring, just for reference
--------
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { getAllJobs, hideLoading, showLoading } from '../all-jobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

const jobSlice= createSlice({
    name:'job',
    initialState,
    reducers:{
      handleChange:(state,{payload:{name,value}})=>{
        state[name]=value;
      },
      clearValues:()=>{
        return {...initialState,jobLocation:getUserFromLocalStorage()?.location||''};
      },
      setEditJob:(state,{payload})=>{
        return {...state,isEditing:true,...payload}
      } 
    },
    extraReducers(builder){
      builder.
      // for creating job
      addCase(createJob.pending, (state,action)=>{
        state.isLoading=true;
      })
      .addCase(createJob.fulfilled,(state,action)=>{
        state.isLoading=false;
        toast.success('Job Created');
      })
      .addCase(createJob.rejected,(state,action)=>{
        state.isLoading=false;
        toast.error(action.payload);
      })

      // for deleting job (We are not interested in the isLoading associated with this slice,hence we shall only display toast messages)
      .addCase(deleteJob.fulfilled,(state,action)=>{
        toast.success(action.payload)
      })
      .addCase(deleteJob.rejected,(state,action)=>{
        toast.error(action.payload)
      })

      // for editing the job
      .addCase(editJob.pending, (state,action)=>{
        state.isLoading=true;
      })
      .addCase(editJob.fulfilled,(state,action)=>{
        state.isLoading=false;
        toast.success('Changes Updated...');
      })
      .addCase(editJob.rejected,(state,action)=>{
        state.isLoading=false;
        toast.error(action.payload);
      })
    }
}
)
export const createJob= createAsyncThunk('job/createJob',async(job,thunkAPI)=>{
  try {
    const resp= await customFetch.post('/jobs',job,{
      headers:{
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if(error.response.status==401){
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("UnAuthorized! Logging Out...")
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  } 
})

export const deleteJob=createAsyncThunk('job/deleteJob',async(jobId,thunkAPI)=>{
  thunkAPI.dispatch(showLoading());
  try {
    const resp= await customFetch.delete(`/jobs/${jobId}`,{
      headers:{
        authorization:`Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    thunkAPI.dispatch(getAllJobs());  // now this reducer will handle the loading
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
})

export const editJob=createAsyncThunk('job/editJob',async (data,thunkAPI)=>{
  const {jobId,job}=data;
  try {
    const resp= await customFetch.patch(`/jobs/${jobId}`,job,{
      headers:{
        authorization:`Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    thunkAPI.dispatch(clearValues())
    return resp.data;   
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
})
export const{handleChange,clearValues,setEditJob}=jobSlice.actions;
export default jobSlice.reducer;