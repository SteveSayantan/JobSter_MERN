import authHeader from "../../utils/authHeader";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";


export const getAllJobsThunk= async function(data,thunkAPI){
    const {page,search,searchStatus,searchType,sort}=thunkAPI.getState().allJobs;

    let url=`/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if(search){
      url+=`&search=${search}`
    }
    try {
      const resp= await customFetch.get(url,{headers:{
        authorization:`Bearer ${thunkAPI.getState().user.user.token}`
      }})
    //   console.log(resp.data);
      return resp.data;

    } catch (error) {
      return checkForUnauthorizedResponse(error,thunkAPI);
    }
}

export const showStatsThunk= async(data,thunkAPI)=>{
    try {
      const resp= await customFetch.get('/jobs/stats',authHeader(thunkAPI));
    //   console.log(resp.data);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error,thunkAPI);
    }
}