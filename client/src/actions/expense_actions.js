import { EXPENSE_SAVED, FETCHED_FAILED, FETCHED_SUCCESS, FETCHING_EXPENSE, RESET_SAVED } from './types'
import { addErrorMessage, clearErrorMessages } from './error_actions'
import { apiFetchExpense, apiSaveExpense } from '../api/expense'

export const saveExpense = expense => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages())
            await apiSaveExpense(expense)
            dispatch({ type: EXPENSE_SAVED })
        } catch (e) {
            dispatch(addErrorMessage(e))
        }
    }
}
export const fetchExpense = (month) => {
    return async dispatch => {
        try {
            const prefix = '/expense'
            const url = month ? `${prefix}/${month}` : prefix
            dispatch({ type: FETCHING_EXPENSE });
            const { data } = await apiFetchExpense(url)
            dispatch({ type: FETCHED_SUCCESS, payload: data.expense })
        } catch (e) {
            dispatch({type: FETCHED_FAILED})
            dispatch(addErrorMessage(e))
        }
    }
}

export const resetSaved = () => ({ type: RESET_SAVED });
