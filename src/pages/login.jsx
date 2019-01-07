import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { Button, Form as BootstrapForm, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'

import * as styles from './login.scss'

import * as actions from '../__data__/actions'
import * as auth from '../__data__/selectors/auth'

export const Component = ({ onSubmit, isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/refill/' />
    }

    return (
        <Container className={styles['login-page']}>
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <BootstrapForm className={styles['form']} onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Field name="username" type="text">
                                        {
                                            ({ input, meta }) => (
                                                <React.Fragment>
                                                    <Label>Username</Label>
                                                    <Input  {...input} />
                                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                                </React.Fragment>
                                            )
                                        }
                                    </Field>
                                </FormGroup>
                                <FormGroup>
                                    <Field name="password" type="password">
                                        {
                                            ({ input, meta }) => (
                                                <React.Fragment>
                                                    <Label>Password</Label>
                                                    <Input  {...input} />
                                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                                </React.Fragment>
                                            )
                                        }
                                    </Field>
                                </FormGroup>
                                <Button>Login</Button>
                            </BootstrapForm>
                        )}
                    />
                </Col>
            </Row>
        </Container>
    )
}

Component.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: auth.isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: bindActionCreators(actions.loginRequest, dispatch)
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(Component)
