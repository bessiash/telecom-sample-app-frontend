import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import styles from './operator-card.scss'

export const OperatorCard = ({ name, pk, logo }) => (
    <Card className={styles.card}>
        <CardImg top width="100%" src={`https://placeholdit.imgix.net/~text?txtsize=33&txt=${logo}&w=318&h=180`} alt="card image" />
        <CardBody>
            <CardTitle>{name}</CardTitle>
            <Button color="success" tag={Link} to={`/refill/${pk}`}>Refill</Button>
        </CardBody>
    </Card>
)

OperatorCard.propTypes = {
    name: PropTypes.string.isRequired,
    pk: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired,
}
