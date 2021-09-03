import { ADD_ERROR, CLEAR_ERRORS } from './types'

export const addErrorMessage = e => {
    const { response: { data: { error } } } = e
    return { type: ADD_ERROR, payload: error }

}

export const clearErrorMessages = e => {
    return { type: CLEAR_ERRORS }
}