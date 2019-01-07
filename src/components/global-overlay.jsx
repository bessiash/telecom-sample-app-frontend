import React from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import classNames from 'classnames'

import * as loader from '../__data__/selectors/loader'
import styles from './global-overlay.scss'

const mapStateToProps = (state) => ({
    isActive: loader.isActive(state),
})

const Component = ({ isActive }) => {
    const className = isActive ? styles.visible : styles.hidden

    return (
        <div className={classNames(styles.overlay, className)}>
            <Loader type="TailSpin" color="#FFFFFF" height="100" width="100" />
        </div>
    )
}

export const GlobalOverlay = connect(mapStateToProps)(Component)
