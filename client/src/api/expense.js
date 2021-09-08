import axios from 'axios'

export const apiSaveExpense = expense => {
    return axios.post('/expense', expense);
}

export const apiUpdateExpense = expense => {
    return axios.put(`/expense/${expense._id}`, expense)
}

export const apiDeleteExpense = expenseId => {
    return axios.delete(`/expense/${expenseId}`)
}

export const apiFetchExpense = (url) => {
    return axios.get(url)
}