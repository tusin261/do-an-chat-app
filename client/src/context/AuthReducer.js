const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                isLoading:true,
                user:null,
                isError:false
            }
        case 'LOGIN_SUCCESS':
            return {
                isLoading:false,
                user:action.payload,
                isError:false
            }
        case 'LOGIN_FAIL':
            return {
                isLoading:false,
                user:null,
                isError:action.payload
            }
        default:
            return state;
    }
}
export default AuthReducer;