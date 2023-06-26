// For maintaining cleanliness , the callbacks passed in createAsyncThunk have been moved to jobThunk.js.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

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
export const createJob= createAsyncThunk('job/createJob',createJobThunk)

export const deleteJob=createAsyncThunk('job/deleteJob',deleteJobThunk)

export const editJob=createAsyncThunk('job/editJob',editJobThunk)

export const{handleChange,clearValues,setEditJob}=jobSlice.actions;
export default jobSlice.reducer;