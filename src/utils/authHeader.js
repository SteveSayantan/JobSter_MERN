/* 
    If we want to send authorization token, we need to write the object containing the token again and again,
    this function will make our life easier

    We can either pass the header object manually or call this function to do the same
*/

const authHeader=(thunkAPI)=>{
    return {headers:{
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`
    }}
}

export default authHeader;