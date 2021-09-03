import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

import { saveExpense } from '../actions'
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
    const formRef=useRef()
    
    useDidUpdate(() => {
        const {saved, error} = props
        if (error){
            formRef.current.setSubmitting(false)
        }
        if (saved && modal ) {
            toggle()
            formRef.current.resetForm()
            console.log(props.saved, modal)
            console.log('useeffect ran')
        }
    })
    function submit(values){
        props.saveExpense(values)
    }
    
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const now = moment().format('YYYY-MM-DD')
    console.log('modal is' + modal)
    return (
        <div>
            <FloatButton onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add expense</ModalHeader>
                <ModalBody>
                    <Formik
                    innerRef={formRef}
                        initialValues={{
                            amount: '',
                            created: now
                        }}
                        onSubmit={submit}
                        validationSchema={Yup.object().shape({
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
                            <ErrorMessage/>
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

const AddForm = connect(mapStateToProps, { saveExpense })(AddFormComponent)
export { AddForm }