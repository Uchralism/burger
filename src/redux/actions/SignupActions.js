import axios from "axios";

export const signupUser = (email, password) => {
    return function(dispatch) {
        dispatch(signupUserStart());

        const data = {
            email, password, returnSecureToken: true
        };

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUSsOAulThg4bSGhpvgQHDQqofbwakjSE", data)
        .then(result => {
            //Store login information to Browser LocalStorage
            const token = result.data.idToken;
            const userID = result.data.localId;

            localStorage.setItem('token',token);
            localStorage.setItem('userID',userID);

            dispatch(signupUserSuccess(token, userID))
        }).catch(err => {
            dispatch(signupUserError(err));
        });
        //
    }
};

export const signupUserStart = () => {
    return {
        type: "SIGNUP_USER_START"
    }
}

export const signupUserSuccess = (token, userID) => {
    return {
        type: "SIGNUP_USER_SUCCESS",
        token,
        userID
    }
}

export const signupUserError = (error) => {
    return {
        type: "SIGNUP_USER_ERROR",
        error
    }
}