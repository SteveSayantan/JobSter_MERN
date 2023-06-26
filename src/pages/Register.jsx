import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { FormRow, Logo } from "../components";
import Wrapper from '../assets/wrappers/RegisterPage'
import { toast } from "react-toastify";
import {useDispatch,useSelector}from 'react-redux'
import { loginUser, registerUser } from "../features/user/userSlice";

const initialState={
    name:'',
    email:'',
    password:'',
    isMember:true
}

const Register=()=>{
    const [values,setValues]=useState(initialState)
    const dispatch= useDispatch();
    const {user,isLoading}=useSelector(store=>store.user);
    const navigate= useNavigate()

    
    const handleChange=(e)=>{
        const name= e.target.name;
        const value= e.target.value;
        setValues({...values,[name]:value})
    }


    const onSubmit=(e)=>{
        e.preventDefault()
        const {name,email,password,isMember}=values;
        if(!email|| !password || (!isMember && !name)){
            toast.error("Please Enter All fields");         // Using this toast method we can trigger the pop-up
            return;
        }
        if(!isMember){
            dispatch(registerUser({email,password,name}));
            return;
        }
        dispatch(loginUser({email,password}))
    }


    const toggleMember=()=>{
        setValues({...values,isMember:!values.isMember});
    }

    useEffect(()=>{
      if(user){
        navigate("/")
      }  
    },[user])
    
    return <Wrapper className="full-page">

        <form  className="form" onSubmit={onSubmit}>
            <Logo/>
            <h3>{values.isMember?"Login":"Register"}</h3>
            {/* Name field */}
            {!values.isMember &&<FormRow type='text' name='name' value={values.name} handleChangeFunc={handleChange}/>}
            {/* Email field */}
            <FormRow type='email' name='email' value={values.email} handleChangeFunc={handleChange}/>
            {/* Password field */}
            <FormRow type='password' name='password' value={values.password} handleChangeFunc={handleChange}/>

            {<button type="submit" className="btn btn-block" disabled={isLoading}>{isLoading?'Loading...':"Submit"}</button>}
            {/* Demo User (We can not perform any CRUD activity with this user) */}
            {<button type="button" className="btn btn-block btn-hipster" disabled={isLoading} onClick={()=>dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))}>{isLoading?'Loading...':"Demo"}</button>}
            <p>
                {values.isMember?'Not a member yet?':'Already a member?'}
                <button type="button" onClick={toggleMember} className='member-btn'>
                    {values.isMember? 'Register':'Login'}
                </button>
            </p>
        </form>
    </Wrapper>
}

export default Register;