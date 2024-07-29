import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};
const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
  };

const allJobsSlice=createSlice({
    name:'allJobs',
    initialState,
    extraReducers:(builder)=>{
      builder
      .addCase(getAllJobs.pending, (state)=>{
        state.isLoading=true;
      })
      .addCase(getAllJobs.fulfilled, (state,{payload})=>{
        state.isLoading=false;
        state.jobs=payload.jobs;
        state.numOfPages=payload.numOfPages;
        state.totalJobs=payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state,{payload})=>{
        state.isLoading=false;
        toast.error(payload);
      })
      // For showing stats
      .addCase(showStats.pending, (state)=>{
        state.isLoading=true;
      })
      .addCase(showStats.fulfilled, (state,{payload})=>{
        state.isLoading=false;
        state.stats=payload.defaultStats;
        state.monthlyApplications=payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state,{payload})=>{
        state.isLoading=false;
        toast.error(payload);
      })
    },
    reducers:{    // Since, we want to implement deleteJob in JobSlice, we have to create these reducers to toggle isLoading (associated with this slice)
      showLoading:(state)=>{
        state.isLoading=true;
      },
      hideLoading:(state)=>{
        state.isLoading=false;
      },
      handleChange:(state,{payload:{name,value}})=>{
        state.page=1;       // Every time a search is performed, we want to change the page back to 1
        state[name]=value;
      },
      changePage:(state,{payload})=>{
        state.page=payload;
      },
      clearFilters:(state)=>{
        return {...state,...initialFiltersState};
      },
      clearAllJobsState: (state)=>initialState   // This will wipe out all the changes done
      
    }
})

// to prevent any fetch call when another fetch call is going on, we can pass a 'condition' cb in the option, https://redux-toolkit.js.org/api/createAsyncThunk#canceling-before-execution
export const getAllJobs= createAsyncThunk('allJobs/getJobs',getAllJobsThunk,{   
  condition:(arg, {getState})=>{    // if this cb returns false, getAllJobsThunk will not be executed
    return !getState().allJobs.isLoading;
  }
})

export const showStats=createAsyncThunk('allJobs/showStats',showStatsThunk)
export const {showLoading,hideLoading,clearFilters,handleChange,changePage,clearAllJobsState}=allJobsSlice.actions;
export default allJobsSlice.reducer;