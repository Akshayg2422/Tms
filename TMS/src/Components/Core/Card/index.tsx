import React from 'react'
import { CardProps } from './interfaces'
import {
    Card as RsCard, CardBody, CardTitle, CardHeader
} from "reactstrap";

function Card({ title, children, ...rest }: CardProps) {
    return (
        <RsCard {...rest}>
            {title && <CardTitle>
                <CardHeader>
                    <h5 className="h3 mb-0">{title}</h5>
                </CardHeader>
            </CardTitle>}
            <CardBody>
                {children}
            </CardBody>
        </RsCard>
    )
}

export { Card }