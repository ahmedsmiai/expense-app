import React from 'react'
import { Button, Input, FormGroup, Label, FormFeedback } from 'reactstrap';
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'
import { ErrorMessage } from '../components';



function FormBody({ btnTxt = 'Save', onSubmit, formRef, expense={} }) {
    const {
        description = '',
        amount = '',
        created = undefined
    } = expense
    const now = created ? 
    moment(created).format('YYYY-MM-DD') 
    : moment().format('YYYY-MM-DD')
    return (
        <Formik
            initialValues={{ amount, created:now, description }}
            innerRef={formRef}
            onSubmit={onSubmit}
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
                    <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting} > {btnTxt} </Button>
                </div>
            )}

        </Formik>
    )
}
export { FormBody }
