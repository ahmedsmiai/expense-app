import React, { useRef, useEffect } from 'react'
import { FormBody } from '../components'
import { connect } from 'react-redux'
import { updateExpense, resetSaved } from '../actions/expense_actions'


function EditComponent(props) {

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const { updated, resetSaved } = props
            if (updated) {
                resetSaved();
                props.history.push('/')
            }
        }
    });

    function submit(values) {
        const item = props.location.state.item
        values._id = item._id
        props.updateExpense(values)
    }

    let item
    try {
        item = props.location.state.item
    } catch (e) {
        item = undefined
    }

    if (!item) props.history.push('/')

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Edit expense</h3>
            <hr />
            <FormBody
                onSubmit={submit}
                btnTxt='Update'
                expense={item}
            />
        </div>
    )
}

const mapStateToProps = ({ expense }) => {
    return {
        updated: expense.updated
    };
};


const Edit = connect(mapStateToProps, { resetSaved, updateExpense })(EditComponent)
export { Edit }
