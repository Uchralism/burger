import axios from "axios";

export const LoginUser = (email, password) => {
    return function(dispatch) {
        dispatch(LoginUserStart());

        const data = {
            email, password, returnSecureToken: true
        };

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUSsOAulThg4bSGhpvgQHDQqofbwakjSE", data)
        .then(result => {
            //Store login information to Browser LocalStorage
            const token = result.data.idToken;
            const userID = result.data.localId;
            const expiresIn = result.data.expiresIn;
            const expireDate = new Date(new Date().getTime()+ expiresIn * 1000);
            const refreshToken = result.data.refreshToken;

            localStorage.setItem('token',token);
            localStorage.setItem('userID',userID);
            localStorage.setItem('expireDate',expireDate);
            localStorage.setItem('refreshToken',refreshToken);

            dispatch(LoginUserSuccess(token, userID));
            dispatch(autoLogout(expiresIn*1000));
        }).catch(err => {
            dispatch(LoginUserError(err));
        });
        //
    }
};

export const LoginUserStart = () => {
    return {
        type: "LOGIN_USER_START"
    }
}

export const LoginUserSuccess = (token, userID) => {
    return {
        type: "LOGIN_USER_SUCCESS",
        token,
        userID
    }
}

export const LoginUserError = (error) => {
    return {
        type: "LOGIN_USER_ERROR",
        error
    }
}

export const LogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('refreshToken');

    return {
        type: "LOGOUT"
    }
}

export const autoLogout = (ms) => {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(LogOut())
        }, ms)
    }
}
