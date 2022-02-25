export const StartSignIn = (userCred) => ({
    type: "SIGNIN_START",
});

export const SignInSuccess = (user) => ({
    type: "SIGNIN_SUCCESS",
    payload: user,
});

export const SignInFailure = (error) => ({
    type: "SIGNIN_FAILED",
    payload: error,
});