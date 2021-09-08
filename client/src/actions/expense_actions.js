import { EXPENSE_SAVED, EXPENSE_UPDATED, FETCHED_FAILED, FETCHED_SUCCESS, FETCHING_EXPENSE, RESET_SAVED } from './types'
import { addErrorMessage, clearErrorMessages } from './error_actions'
import { apiFetchExpense, apiSaveExpense, apiUpdateExpense, apiDeleteExpense } from '../api/expense'

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
            const url = (month>-1 ?`${prefix}/${month}`: prefix  )
            dispatch({ type: FETCHING_EXPENSE });
            const { data } = await apiFetchExpense(url)
            dispatch({ type: FETCHED_SUCCESS, payload: data.expense })
        } catch (e) {
            dispatch({type: FETCHED_FAILED})
            dispatch(addErrorMessage(e))
        }
    }
}

export const updateExpense = expense => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages())
            await apiUpdateExpense(expense)
            dispatch({ type: EXPENSE_UPDATED })
        } catch (e) {
            dispatch(addErrorMessage(e))
        }
    }
}

export const deleteExpense = expenseId => {
    return async dispatch => {
        try {
            dispatch(clearErrorMessages())
            await apiDeleteExpense(expenseId)
            dispatch(fetchExpense())
        } catch (e) {
            dispatch(addErrorMessage(e))
        }
    }
}


export const resetSaved = () => ({ type: RESET_SAVED });
