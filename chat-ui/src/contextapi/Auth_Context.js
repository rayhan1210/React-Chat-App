import { createContext, useReducer } from "react";
import AuthReducer from "./Auth_Reducer";
const INIT_STATE = {
    user: null,
    isFetch: false,
    error: false
}


export const AuthContext = createContext(INIT_STATE);
// in ({''}) -> Parenthesis are used in an arrow function to return an object.
export const AuthContextProvide = ({children}) => {
    // useReducer hook takes two parameters, 
    // a reducer (which is simply a function that takes in state and action as parameters 
    // and returns a new state based on an action) and an initial state which will be passed into the reducer
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE);
    //useReducer is used to handle what state the website is currently, e.x, state such as init state(signing in), signed successfully,
    // signout or signinfalied. and later using different state to different things like forwarding page or showing error message.
    

    return (
        <AuthContext.Provider 
            value ={{
                user: state.user, 
                isFetch: state.isFetch, 
                error: state.error,
                dispatch
            }} 
        >
            {children} 
            {/* /to wrap the application use children here and take chicldren as function paramas
            children ere can be anything like login, sign up messages or convo  */}
        </AuthContext.Provider>
    )
}