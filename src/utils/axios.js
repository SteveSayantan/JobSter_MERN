import axios from 'axios'
import { clearStore } from '../features/user/userSlice';

// Now we can use this customFetch as our base url, instead of typing this whole url everytime
const customFetch= axios.create({
    baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})


// When we get an unauthorized request (due to invalid token or some other reason), we shall force logout the user from our app. 
// This function is created so that we don't have to repeat this code for every request

export const checkForUnauthorizedResponse= (error,thunkAPI)=>{
    if(error.response.status==401){
        thunkAPI.dispatch(clearStore())
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
}


// We can add authorization header to this customFetch like this. In that case we do not need to send the headers from our requests (either explicitly or by using the authHeader function), it will be sent by default.

/*  
    ## Just for reference, go through Axios Tutorial before using it. ** Also remember to remove all the header objects from all the Thunk functions **
    -----------------

    customFetch.interceptors.request.use((config)=>{
        const user= getUserFromLocalStorage();
        if(user){
            config.header.common['Authorization']=`Bearer ${user.token}`
        }
        return config
    })

*/

export default customFetch;