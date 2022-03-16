import {createContext,useReducer} from 'react'
import AuthReducer from '../context/AuthReducer';
const INITIAL_STATE = {
    user:null,
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