import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters, handleChange } from '../features/all-jobs/allJobsSlice';
import { useState } from 'react';
import { useMemo } from 'react';

const SearchContainer=function(){
    const [localSearch,setLocalSearch]=useState('')

    const {isLoading,searchStatus, searchType,sort,sortOptions}=useSelector(store=>store.allJobs);
    const {jobTypeOptions,statusOptions}=useSelector(store=>store.job);

    const dispatch= useDispatch()

    const handleSearch =(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        dispatch(handleChange({name,value}))
    }

    const debounce= ()=>{  // This debounce is only for the search input field
        let timeOutID;
        return (e)=>{

            setLocalSearch(e.target.value)
            clearTimeout(timeOutID)
            timeOutID= setTimeout(()=>{
                dispatch(handleChange({name:'search',value:e.target.value}))    // In 'value', we can not pass 'localSearch', as the returned function would always hold its initial value (i.e. '')      
            },1000)
        }
    }

    /* 
    If we do not use useMemo hook and use debounce function in the search input field,
    the function returned by debounce re-renders the SearchContainer component, as a result the search input component also re-renders.
    Therefore, the debounce function is called again.
    
    To prevent this and memoize the returned value of debounce function, we use useMemo hook  
    */
   const optimizedDebounce= useMemo(debounce, []);    


    const handleReset=(e)=>{
        // e.preventDefault()           // As we are using type='button' attribute, we do not need this

        setLocalSearch('')              // While reseting the form, we must clear search input field also
        dispatch(clearFilters());
    }
    return <Wrapper>
        <form  className="form">
            <h4>search form</h4>
            <div className="form-center">
                {/* Search by position */}
                <FormRow type='text' name='search' value={localSearch} handleChangeFunc={optimizedDebounce}/>
                {/* Search by status */}
                <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChangeFunc={handleSearch} list={['all',...statusOptions]}/>
                {/* Search by type */}
                <FormRowSelect labelText='type' name='searchType' value={searchType} handleChangeFunc={handleSearch} list={['all',...jobTypeOptions]}/>
                {/* sort */}
                <FormRowSelect  name='sort' value={sort} handleChangeFunc={handleSearch} list={sortOptions}/>

                
                {/* Without this type=button, it will reload the page whenever this button is clicked */}
                <button type='button' className="btn btn-block btn-danger" disabled={isLoading} onClick={handleReset}>Clear Filters</button>

            </div>
        </form>
    </Wrapper>
}

export default SearchContainer;