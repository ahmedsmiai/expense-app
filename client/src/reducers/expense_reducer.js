import { EXPENSE_SAVED, RESET_SAVED } from '../actions/types'


const initialState = {
    saved: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case EXPENSE_SAVED:
            return { ...state, saved: true }
        default:
            return state
    }
}