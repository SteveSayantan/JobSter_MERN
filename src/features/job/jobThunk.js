import { getAllJobs, hideLoading, showLoading } from '../all-jobs/allJobsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';
import authHeader from '../../utils/authHeader';

export const createJobThunk= async(job,thunkAPI)=>{
    try {
      const resp= await customFetch.post('/jobs',job,authHeader(thunkAPI))
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error,thunkAPI);
    } 
}


export const deleteJobThunk= async(jobId,thunkAPI)=>{
    thunkAPI.dispatch(showLoading());
    try {
      const resp= await customFetch.delete(`/jobs/${jobId}`,{
        headers:{
          authorization:`Bearer ${thunkAPI.getState().user.user.token}`
        }
      })
      thunkAPI.dispatch(hideLoading());
      thunkAPI.dispatch(getAllJobs());  // now this reducer will take over the loading
      return resp.data.msg;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return checkForUnauthorizedResponse(error,thunkAPI);
    }
}


export const editJobThunk= async (data,thunkAPI)=>{
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
      return checkForUnauthorizedResponse(error,thunkAPI);
    }
  }
