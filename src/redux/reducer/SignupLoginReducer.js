const initialState = {
    saving: false,
    firebaseError: null,
    token: null,
    userID: null,
    logginIn: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SIGNUP_USER_START' : return {
            ...state,
            saving: true
        }
        case 'SIGNUP_USER_SUCCESS' : return {
            ...state,
            saving: false,
            token: action.token,
            userID: action.userID
        }
        case 'SIGNUP_USER_ERROR' : return {
            ...state,
            saving: false,
            firebaseError: action.error.response.data.error.message
        }
        case 'LOGIN_USER_START' : return {
            ...state,
            logginIn: true
        }
        case 'LOGIN_USER_SUCCESS' : return {
            ...state,
            logginIn: false,
            token: action.token,
            userID: action.userID
        }
        case 'LOGIN_USER_ERROR' : return {
            ...state,
            logginIn: false,
            firebaseError: action.error.response.data.error.message
        }
        case 'LOGOUT' : return {
            ...state,
            userID: null,
            token: null,
            firebaseError: null
        }
        default : return state;
    }
}

export default reducer;