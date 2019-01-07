import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback } from 'reactstrap'

export const FieldError = ({ dirty, error }) => {
    if (dirty && error) {
        return <FormFeedback>{error}</FormFeedback>
    }

    return null
}

FieldError.propTypes = {
    dirty: PropTypes.bool,
    error: PropTypes.string,
}
