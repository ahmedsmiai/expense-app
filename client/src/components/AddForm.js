import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

import { saveExpense, resetSaved, fetchExpense } from '../actions'
import { FloatButton, ErrorMessage } from '../components';


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
    const now = moment().format('YYYY-MM-DD')
    return (
        <div>
            <FloatButton onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add expense</ModalHeader>
                <ModalBody>
                    <Formik
                        innerRef={formRef}
                        initialValues={{
                            description: '',
                            amount: '',
                            created: now
                        }}
                        onSubmit={submit}
                        validationSchema={Yup.object().shape({
                            description: Yup.string().min(3),
                            amount: Yup.number().min(1).required(),
                            created: Yup.date().required(),
                        })}
                    >

                        {({ errors,
                            touched,
                            handleBlur,
                            handleChange,
                            values,
                            isValid,
                            isSubmitting,
                            handleSubmit
                        }) => (
                            <div>
                                <ErrorMessage />
                                <FormGroup>
                                    <Label>
                                        Description
                                    </Label>
                                    <Input
                                        invalid={errors.description && touched.description}
                                        name='description'
                                        value={values.description}
                                        type='text'
                                        placeholder='Description'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.description && touched.description && (
                                        <FormFeedback>{errors.description}</FormFeedback>
                                    )}
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Label>
                                        Amount
                                    </Label>
                                    <Input
                                        invalid={errors.amount && touched.amount}
                                        name='amount'
                                        value={values.amount}
                                        type='number'
                                        placeholder='Expense amount'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.amount && touched.amount && (
                                        <FormFeedback>{errors.amount}</FormFeedback>
                                    )}
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Label>
                                        Date
                                    </Label>
                                    <Input
                                        invalid={errors.created && touched.created}
                                        name='created'
                                        value={values.created}
                                        type='date'
                                        placeholder='expense amount'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.created && touched.created && (
                                        <FormFeedback>{errors.created}</FormFeedback>
                                    )}
                                </FormGroup>
                                <br />
                                <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting} > Save </Button>
                            </div>
                        )}

                    </Formik>
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