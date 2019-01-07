import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isEmpty, map } from 'lodash-es'
import { Container, Row, Col } from 'reactstrap'

import { OperatorCard } from '../components'
import * as actions from '../__data__/actions'
import * as telecom from '../__data__/selectors/telecom'

const mapStateToProps = (state) => ({
    operators: telecom.getTelecomOperators(state)
})

const mapDispatchToProps = (dispatch) => ({
    fetchTelecomOperators: bindActionCreators(actions.telecomOperatorsRequest, dispatch)
})

@connect(mapStateToProps, mapDispatchToProps)
export class Operators extends React.PureComponent {
    componentDidMount () {
        this.props.fetchTelecomOperators()
    }

    render () {
        const { operators } = this.props
        if (isEmpty(operators)) {
            return null
        }
        return (
            <Container>
                <Row>
                    {
                        map(operators, (operator) => (
                            <Col key={operator.name} md={4} sm={6}>
                                <OperatorCard pk={operator.id} name={operator.name} logo={operator.name} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        )
    }
}

Operators.propTypes = {
    fetchTelecomOperators: PropTypes.func,
    operators: PropTypes.array,
}
