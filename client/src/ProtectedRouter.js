import { useAuth } from "./context/hooks";
import { Routes, Route, Navigate } from 'react-router-dom'

const ProtectedRoute = ({roleAdmin,children})=>{
    const [state, dispatch] = useAuth();
    const {user} = state;
    if(!user){
        return <Navigate to='/' replace /> 
    }
    else if(user.isAdmin === roleAdmin){
        return children
    }else{
        return <Navigate to='/' replace /> 
    }
}
export default ProtectedRoute