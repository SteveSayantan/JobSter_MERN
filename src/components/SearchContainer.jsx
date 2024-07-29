import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters, handleChange } from '../features/all-jobs/allJobsSlice';


const SearchContainer=function(){

    const {search,isLoading,searchStatus, searchType,sort,sortOptions}=useSelector(store=>store.allJobs);
    const {jobTypeOptions,statusOptions}=useSelector(store=>store.job);

    const dispatch= useDispatch()

    const handleSearch =(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        dispatch(handleChange({name,value}))
    }    


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
                <FormRow type='text' name='search' value={search} handleChangeFunc={handleSearch}/>
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