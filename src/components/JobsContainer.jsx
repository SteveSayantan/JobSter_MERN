import { useEffect, useMemo, useRef } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/all-jobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer=function(){

    const ref=useRef(false);

    const{jobs,isLoading,page,totalJobs,numOfPages,search,searchStatus,searchType,sort}=useSelector(store=>store.allJobs);

    const dispatch= useDispatch();

    const debouncedFetch=()=>{

        let timeOutID;

        return ()=>{
            clearTimeout(timeOutID);
            timeOutID=setTimeout(dispatch, 1000,getAllJobs());
        }
    }

     // everytime the component re-renders, debouncedFetch is created again, and the previous closure is lost 
    const optimizedDebounce=useMemo(debouncedFetch,[])  // hence, we need to memoize the return value of debouncedFetch

    useEffect(()=>{
        if(!ref.current){
            dispatch(getAllJobs());
            ref.current=true;
            return;
        }
        
        optimizedDebounce();

    },[page,search,searchStatus,searchType,sort,optimizedDebounce])

    if(isLoading){
        return <Loading center/>
    }
    if(jobs.length==0){
        return <Wrapper>
            <h2>No jobs to display</h2>
        </Wrapper>
    }
    return <Wrapper>
        <h5>{totalJobs} job{jobs.length>1 && 's'} found</h5>
        <div className="jobs">
            {jobs.map(job=>{
                // console.log(job);
                return <Job key={job._id} {...job}/>
            })}
        </div>
        {numOfPages>1&&<PageBtnContainer/>}
    </Wrapper>
}

export default JobsContainer;