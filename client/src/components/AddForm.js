import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import { FloatButton } from './FloatButton';
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

function AddFormComponent(props) {

    function submit(values, bag) {
        console.log(values)
    }
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const now = moment().format('YYYY-MM-DD')
    return (
        <div>
            <FloatButton onClick={toggle} />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add expense</ModalHeader>
                <ModalBody>
                    <Formik
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
                                <br/>
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
                                <br/>
                                <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting} > Save </Button>
                            </div>
                        )}

                    </Formik>
                </ModalBody>
            </Modal>
        </div>

    )
}

const AddForm = connect(null)(AddFormComponent)
export { AddForm }