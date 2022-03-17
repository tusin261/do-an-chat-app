import {createContext,useReducer} from 'react'
import AuthReducer from '../context/AuthReducer';



const user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')): null;
const INITIAL_STATE = {
    user:user?user:null,
    isLoading:false,
    isError:false
}

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);
    return (
        <AuthContext.Provider value={[state,dispatch]}>
            {children}            
        </AuthContext.Provider>
    )
}