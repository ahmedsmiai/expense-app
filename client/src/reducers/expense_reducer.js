import {
    EXPENSE_SAVED,
    RESET_SAVED,
    FETCHED_FAILED,
    FETCHED_SUCCESS,
    FETCHING_EXPENSE,
    EXPENSE_UPDATED
} from '../actions/types'


const initialState = {
    saved: false,
    updated: false,
    fetching: false,
    expense: [], 
    statistics: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case EXPENSE_SAVED:
            return { ...state, saved: true }
        case FETCHING_EXPENSE:
            return { ...state, fetching: true }
        case FETCHED_SUCCESS:
            const { expense, statistics } = payload 
            return { ...state, fetching: false, expense, statistics }
        case FETCHED_FAILED:
            return { ...state, fetching: false }
        case RESET_SAVED:
            return { ...state, saved: false, updated: false }
        case EXPENSE_UPDATED:
            return { ...state, updated: true }
        default:
            return state
    }
}

