import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { ListGroup, Alert } from 'reactstrap';
import { fetchExpense,deleteExpense } from '../actions/expense_actions'
import { AddForm, ExpenseItem, MonthSelector, Spinner } from '../components'
import moment from 'moment';

function HomeC(props) {

    const [selected, setSelected] = useState(moment().month())

    useEffect(() => {
        const { fetchExpense } = props
        fetchExpense(selected)
    }, [selected])

    const { fetching, expense } = props
   
    function onSelectMonth(month) {
        setSelected(month)
    }
    function onDelete(e){
        const expId = e.target.attributes.getNamedItem('data-id').value
        props.deleteExpense(expId)
    }

    return (
        <div style={{ marginTop: 30 }}>
            <MonthSelector
                selected={selected}
                onSelectMonth={onSelectMonth}
            />
            <h3>Expense List</h3>
            <hr />
            {fetching ? (<Spinner/>):
               ( 
                    expense.length > 0 ? (<ListGroup>
                        {expense.map((item) => (
                            <ExpenseItem key={item._id} item={item} onDelete={onDelete} />
                        ))}
                    </ListGroup>) :
                        (<div >
                            <Alert style={{ display: 'flex', justifyContent: 'center' }} color="secondary">
                                No saved expenses for this month
                            </Alert>
                        </div>)
                )}
            <AddForm selected={selected} />
        </div>
    )
}



const mapStateToProps = ({ expense }) => {
    return {
        fetching: expense.fetching,
        expense: expense.expense
    }
}

const Home = connect(mapStateToProps, { deleteExpense,fetchExpense })(HomeC)
export { Home };