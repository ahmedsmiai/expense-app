import axios from 'axios'

export const apiSaveExpense = expense => {
    return axios.post('/expense', expense);
}