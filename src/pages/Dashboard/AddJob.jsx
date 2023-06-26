import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearValues, createJob, editJob, handleChange } from '../../features/job/jobSlice';
import { useEffect } from 'react';

const AddJob=()=>{
    const {isLoading,position,company,jobLocation,jobType,jobTypeOptions,status,statusOptions,isEditing,editJobId} = useSelector((store) => store.job);
    const dispatch= useDispatch();
    const {user}= useSelector(store=>store.user);
    const handleSubmit=e=>{
        e.preventDefault();
        if(!position||!jobLocation||!company){
            toast.error('Please Fill Out All Fields');
            return;
        }
        if(isEditing){
             dispatch(editJob({jobId:editJobId,job:{
                position,company,jobLocation,jobType,status
            }}))
            return;
        }
        dispatch(createJob({position,company,jobLocation,status,jobType}));
    }

    const handleJobInput=e=>{
        const name= e.target.name;
        const value= e.target.value;
        // console.log(name,value);
        dispatch(handleChange({name,value}));
    }

    useEffect(()=>{     // Setting up useEffect ensures we get the latest location every time this page loads (but not while editing)
        if(!isEditing){
            dispatch(handleChange({name:'jobLocation',value:user.location}))
        }
    },[])
    return <Wrapper>
        <form  className="form">
            <h3>{isEditing? 'edit job':'add job'}</h3>
            <div className="form-center">
                <FormRow type="text" name="position" value={position} handleChangeFunc={handleJobInput}/>
                <FormRow type="text" name="company" value={company} handleChangeFunc={handleJobInput}/>
                <FormRow type="text" name="jobLocation" value={jobLocation} handleChangeFunc={handleJobInput} labelText='Job Location'/>

                <FormRowSelect name='status' value={status} handleChangeFunc={handleJobInput} list={statusOptions}/>
                <FormRowSelect name='jobType' labelText='Job Type' value={jobType} handleChangeFunc={handleJobInput} list={jobTypeOptions}/>
                
                <div className="btn-container">
                    <button type='button' className='btn btn-block clear-btn' onClick={()=>dispatch(clearValues())}>Clear</button>
                    <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>Submit</button>
                </div>
            </div>
        </form>
        
    </Wrapper>
}

export default AddJob;