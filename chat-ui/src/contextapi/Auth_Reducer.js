const AuthReducer = (state, action ) => {
    switch(action.type){
        case "SIGNIN_START":
            return {
                user: null, 
                isFetch: false,
                error: false,
            };
        case "SIGNIN_SUCCESS":
            // localStorage.setItem("user", JSON.stringify(action.payload.user));
            return {
                user: action.payload,
                isFetch: true,
                error: false,
            }
        case "SIGNIN_FAILED":
            return { 
                user: null,
                isFetch: false,
                error: true,
            }
            //case is used for signing out upon signout, localstorage is cleared and state is back to initial.
        case "SIGN_OUT":
            localStorage.clear();
            return {
                user: null,
                isFetch: false,
                error: false
            }
        default:
            // console.log("in state: " + state);
            return state; //return the initial state if nothing occured
    }
}

export default AuthReducer;