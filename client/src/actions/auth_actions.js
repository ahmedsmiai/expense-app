import { AUTH_FAILED, AUTH_SUCCESS, AUTH_ATTEMPTING, USER_LOGOUT, PROFILE_FETCHED } from './types'
import { apiLogin, fetchProfile } from '../api/user';
import setAuthHeader from '../api/setAuthHeader';

const TOKEN_NAME = 'expense_app_token';
export const signIn = request_data => {
    return async dispatch => {
        dispatch({ type: AUTH_ATTEMPTING })
        try {
            const { data } = await apiLogin(request_data)
            setAuthHeader(data.token)
            dispatch(getProfile());
            dispatch(success(data.token))
        } catch (e) {
            const { response: { data } } = e
            dispatch(error(data.error))
        }
    };
};

export const onLoadingSignIn = () => {

    return dispatch => {
        try {
            const token = localStorage.getItem(TOKEN_NAME);
            if (token === null || token === 'undefined') {
                return dispatch(error('You need to login'));
            }
            setAuthHeader(token)
            dispatch(success(token))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getProfile = () => {
    return async dispatch => {
        try {
            const { data: { user } } = await fetchProfile()
            dispatch({type:PROFILE_FETCHED, payload: user})
        } catch (e) {
            console.error(e)
        }
    }
}

export const logOut = () => {
    localStorage.clear()
    return ({ type: USER_LOGOUT })
}

const success = (token) => {
    localStorage.setItem(TOKEN_NAME, token)
    return { type: AUTH_SUCCESS }
};
const error = (error) => {
    return { type: AUTH_FAILED, payload: error }
};