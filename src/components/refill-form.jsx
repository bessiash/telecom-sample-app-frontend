import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import { Button, Form as BootstrapForm, FormGroup, Label, Input } from 'reactstrap'
import InputMask from 'react-input-mask'
import { isEmpty, min, isNil } from 'lodash-es'

import { FieldError } from '../components'
import {
    validateRequired,
    getMinValueValidate,
    getMaxValueValidate,
    composeValidators,
    getPhoneValidate,
    isPhone,
} from '../__data__/validators'

const initialValues = {
    amount: 1,
}

const PhoneNumber = ({ input, meta }) => (
    <React.Fragment>
        <Label>Phone number</Label>
        <Input
            mask="+7 (999) 999 99 99"
            invalid={meta.dirty && !!meta.error}
            autoComplete="off"
            tag={InputMask}
            {...input}
        />
        <FieldError {...meta} />
    </React.Fragment>
)

const Amount = ({ input, meta }) => (
    <React.Fragment>
        <Label>Amount</Label>
        <Input
            {...input}
            invalid={meta.dirty && !!meta.error}
            type="number"
            autoComplete="off"
        />
        <FieldError {...meta} />
    </React.Fragment>
)

export class RefillForm extends React.PureComponent {
    render () {
        const { operator, onSubmit, balance } = this.props
        const { code_set} = operator
        const maxAmount = min([(isNil(balance) ? 0 : balance), 1000])
        const phoneValidate = getPhoneValidate(code_set)
        const amountValidator = composeValidators([
            validateRequired,
            getMinValueValidate(1),
            getMaxValueValidate(maxAmount),
        ])

        return (
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                render={({ handleSubmit, errors, values }) => (
                    <BootstrapForm onSubmit={handleSubmit}>
                        <FormGroup>
                            <Field name='phone' validate={phoneValidate}>
                                {PhoneNumber}
                            </Field>
                        </FormGroup>

                        <FormGroup>
                            <Field name='amount' validate={amountValidator}>
                                {Amount}
                            </Field>
                        </FormGroup>
                        <Button color='success' disabled={!isEmpty(errors) || !isPhone(values.phone)}>Refill</Button>
                    </BootstrapForm>
                )}
            />
        )
    }
}

RefillForm.propTypes = {
    operator: PropTypes.shape({
        code_set: PropTypes.arrayOf(PropTypes.string),
    }),
    balance: PropTypes.number,
    onSubmit: PropTypes.func,
}
