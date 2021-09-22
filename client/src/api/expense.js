import axios from 'axios'

export const apiSaveExpense = expense => {
    return axios.post('/api/v1/expense', expense);
}

export const apiUpdateExpense = expense => {
    return axios.put(`/api/v1/expense/${expense._id}`, expense)
}

export const apiDeleteExpense = expenseId => {
    return axios.delete(`/api/v1/expense/${expenseId}`)
}

export const apiFetchExpense = (url) => {
    return axios.get(url)
}