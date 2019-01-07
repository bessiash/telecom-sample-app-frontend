import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap'

import * as telecom from '../__data__/selectors/telecom'

const mapStateToProps = (state) => ({
    balance: telecom.getBalance(state)
})

@connect(mapStateToProps)
export class Header extends React.PureComponent {

    render () {
        const { balance } = this.props

        return (
            <Navbar color="light" light expand="md" style={{ marginBottom: 12 }}>
                <NavbarBrand to="/" tag={Link}>Logo</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        { balance && `Your balance: ${balance}$`}
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

Header.propTypes = {
    balance: PropTypes.number,
}
