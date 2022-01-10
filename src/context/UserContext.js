import React, { useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

const initialState = {
    saving: false,
    firebaseError: null,
    token: null,
    userID: null,
    logginIn: false,
    expireDate: null
}

export const UserStore = props => {

    const [state, setState] = useState(initialState);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('expireDate');
        localStorage.removeItem('refreshToken');
    
        setState(initialState);
    }

    const autoTokenRefresh = (ms) => {
        setTimeout(() => {
            axios
                .post("https://securetoken.googleapis.com/v1/token?key=AIzaSyAUSsOAulThg4bSGhpvgQHDQqofbwakjSE",
                {
                    grant_type: "refresh_token",
                    refresh_token: localStorage.getItem("refreshToken")
                })
                .then(
                    result => {
                        const token = result.data.id_token;
                        const userID = result.data.user_id;
                        const expiresIn = result.data.expires_in;
                        const refreshToken = result.data.refresh_token;
                        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

                        loginUserSuccess(token, userID, expireDate, refreshToken);
                    }
                )
                .catch((err) => {
                    setState({ ...state, logginIn: false, firebaseError: err, token: null, userID: null, expireDate: null});
                });
        }, ms)
    };

    const autoLogout = (ms) => {
            setTimeout(() => {
                autoTokenRefresh()
            }, ms)
    }

    const loginUserSuccess = (token, userID, expireDate, refreshToken) => {
        localStorage.setItem('token',token);
        localStorage.setItem('userID',userID);
        localStorage.setItem('expireDate',expireDate);
        localStorage.setItem('refreshToken',refreshToken);

        setState({ ...state, logginIn: false, firebaseError: null, token, userID, expireDate});
    }

    const loginUser = (email, password) => {
            setState({ ...state, logginIn: true});
    
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
    
                loginUserSuccess(token, userID, expireDate, refreshToken);
                autoTokenRefresh(expiresIn*1000);
            }).catch(err => {
                setState({ ...state, logginIn: false, firebaseError: err, token: null, userID: null, expireDate: null});
            });
            //
        };

    const signupUser = (email, password) => {
        setState({ ...state, saving: true});

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

            setState({ ...state, saving: false, token, userID, firebaseError: null});
        }).catch(err => {
            setState({ ...state, saving: false, firebaseError: err, token: null, userID: null})
        });
    };

    return (
        <UserContext.Provider value={{ state, signupUser, loginUser, logout, autoLogout, loginUserSuccess, autoTokenRefresh }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;