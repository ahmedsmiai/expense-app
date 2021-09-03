import { AUTH_ATTEMPTING, AUTH_FAILED, AUTH_SUCCESS, PROFILE_FETCHED, USER_LOGOUT } from '../actions/types'

const initialState = {
    attempting: false,
    isAuth: false,
    profile: {},
    error: null
}

export default function x (state = initialState, { type, payload })  {
    switch (type) {

        case AUTH_ATTEMPTING:
            return {
                ...state,
                attempting: true,
                isAuth: false,
                error: null
            }

        case AUTH_SUCCESS:
            return {
                ...state,
                attempting: false,
                isAuth: true,
                profile: {},
                error: null
            }

        case AUTH_FAILED:
            return {
                ...state,
                attempting: false,
                isAuth: false,
                error: payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                isAuth: false,
                profile: {}
            }
        case PROFILE_FETCHED:
            return {
                ...state,
                profile: payload,
            }
        default:
            return state
    }
}
