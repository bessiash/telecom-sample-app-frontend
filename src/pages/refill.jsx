import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Container, Col, Row } from 'reactstrap'

import { find } from 'lodash-es'

import { RefillForm } from '../components'
import * as telecom from '../__data__/selectors/telecom'
import * as constants from '../__data__/constants'
import * as actions from '../__data__/actions'

const mapStateToProps = (state, ownProps) => {
    const id = +ownProps.match.params.id
    const operators = telecom.getTelecomOperators(state)

    return {
        operator: find(operators, { id }),
        balance: telecom.getBalance(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = +ownProps.match.params.id
    const refillRequest = bindActionCreators(actions.refillRequest, dispatch)
    const purceRequest = bindActionCreators(actions.purceRequest, dispatch)

    return {
        onSubmit: (values) => refillRequest({ id, ...values }),
        purceRequest,
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Refill extends React.PureComponent {

    componentDidMount () {
        this.props.purceRequest()
    }

    render () {
        const { operator, onSubmit, balance } = this.props

        if (operator) {
            return (
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <RefillForm operator={operator} balance={balance} onSubmit={onSubmit} />
                        </Col>
                    </Row>
                </Container>
            )
        }

        return <Redirect to={constants.REFILL_URL} />
    }
}

Refill.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    }),
    balance: PropTypes.number,
    operator: PropTypes.object,
    onSubmit: PropTypes.func,
    purceRequest: PropTypes.func,
}
