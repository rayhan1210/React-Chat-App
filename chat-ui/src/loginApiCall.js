import axios from "axios";

export const LoginApiCall = async (userCred, dispatch) => {
    // const [user, setUser ] = useState("");
    dispatch({type: "SIGNIN_START"});
    try{
        const res = await axios.post("/auth/login", userCred); //wait to check if able to login, ciorrect user detail posted or not
        dispatch({ type:"SIGNIN_SUCCESS", payload: res.data });
    }catch(err){
        dispatch({ type:"SIGNIN_FAILED", payload: err });
    }
}