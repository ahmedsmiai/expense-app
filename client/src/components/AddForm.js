import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


import { saveExpense, resetSaved, fetchExpense } from '../actions'
import { FloatButton, FormBody } from '../components';


function useDidUpdate(callback) {
    const hasMount = useRef(false)
    useEffect(() => {
        if (hasMount.current) {
            callback()
        } else {
            hasMount.current = true
        }
    })
}

function AddFormComponent(props) {

    const [modal, setModal] = useState(false)
    const formRef = useRef()

    useDidUpdate(() => {
        const { saved, error, resetSaved, fetchExpense } = props
        if (error) {
            formRef.current.setSubmitting(false)
        }
        if (saved && modal) {
            toggle()
            fetchExpense(props.selected)
            resetSaved()
            formRef.current.resetForm()

        }
    })
    function submit(values) {
        props.saveExpense(values)
    }

    const toggle = () => setModal(!modal)
    return (
        <div>
            <FloatButton onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add expense</ModalHeader>
                <ModalBody>
                <FormBody onSubmit={submit} formRef={formRef}/>
                   
                </ModalBody>
            </Modal>
        </div>

    )
}
const mapStateToProps = ({ expense, errors }) => {
    return {
        saved: expense.saved,
        error: errors.message
    }
}

const AddForm = connect(mapStateToProps, 
    { saveExpense, resetSaved, fetchExpense })(AddFormComponent)
export { AddForm }