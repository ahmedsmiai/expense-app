import React from 'react'
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

const Signup = () => {
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Enter your name"),
        email: Yup.string()
            .email("Enter a valid email")
            .required("Enter your email"),
        password: Yup.string()
            .min(6, "Password must contain at least 8 charcters")
            .required("Enter a password")
    })

    const formik = useFormik({
        initialValues: {
            name:"",
            email: "",
            password: ""
        },
        onSubmit: () => {
            formik.resetForm()
        },
        validationSchema
    })
    return (
        <div style={{ display: 'block', padding: 20 }}>
            <h3>Create a new account</h3>
            <hr />

            <div>
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        placeholder={'Enter your full name'}
                        valid={!formik.errors.name && formik.touched.name}
                        invalid={formik.errors.name && formik.touched.name}
                        name='name'
                        type='text'
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        onChange={formik.handleChange('name')}
                    />
                    <FormFeedback>{formik.errors.name} </FormFeedback>
                </FormGroup>
                <br/>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                    placeholder={'Enter your email'}
                        valid={!formik.errors.email && formik.touched.email}
                        invalid={formik.errors.email && formik.touched.email}
                        name='email'
                        type='email'
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                    />
                    <FormFeedback>{formik.errors.email} </FormFeedback>
                </FormGroup>
                <br />
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                    placeholder={'Enter a passwoord'}
                        valid={!formik.errors.password && formik.touched.password}
                        invalid={formik.errors.password && formik.touched.password}
                        name='password'
                        type='password'
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                    />
                    <FormFeedback>{formik.errors.password} </FormFeedback>
                </FormGroup>
                <br />
                <div className='text-center'>
                    <Button
                        color='primary'
                        type='submit'
                        onClick={formik.handleSubmit}
                        disabled={!formik.isValid || formik.isSubmitting}
                    > Sign Up </Button>
                    <br/>
                Have an account ? <Link to={'/login'}>Login</Link>
                </div>

            </div>
        </div>
    )
}
export { Signup }
