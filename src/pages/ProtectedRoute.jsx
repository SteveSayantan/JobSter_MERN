import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute=({children})=>{
    const{user}=useSelector((store)=>store.user);           // When 'user' changes, this component re-renders
    if(!user){
        return <Navigate to='/landing'/>
    }
    return children;
}

export default ProtectedRoute;