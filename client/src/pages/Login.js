import React, { useEffect, useRef } from 'react'

import { Button, FormGroup, Label, Input, FormFeedback, Alert } from 'reactstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { signIn } from '../actions'

function useDidUpdate (callback, deps) {
    const hasMount = useRef(false)
    useEffect(() => {
      if (hasMount.current) {
        callback()
      } else {
        hasMount.current = true
      }
    }, deps)
  }

function LoginPage(props) {
    useDidUpdate(()=>{
        const { isAuth } = props
        if (isAuth){
            props.history.push('/')
        }
    })



    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must contain at least 8 charcters")
            .required("Enter your password")
    })

    function handleSubmit() {
        props.signIn(formik.values)
        
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: () => {
            handleSubmit()
            formik.resetForm()

        },
        validationSchema
    })

    const renderError = () => {
        const { error } = props
        if (error) {
            return (
                <Alert color="danger">
                    {error}
                </Alert>
            )
        }
    }


    return (
        <div style={{ display: 'block', padding: 20 }}>
            <h3>Sign in to your account</h3>
            <hr />
            {renderError()}
            <div>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
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
                    > Sign In
                    </Button>
                    <br />
                    Do not have an account ? <Link to={'/signup'}>Sign up here</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        attempting: auth.attempting,
        error: auth.error,
        isAuth: auth.isAuth
    }
}
const Login = connect(mapStateToProps, { signIn })(LoginPage)
export { Login }
