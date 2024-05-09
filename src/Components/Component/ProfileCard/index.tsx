import React from 'react'
import { CardBody, CardHeader, CardImg, Col, Row } from 'reactstrap'
import { Image, Button } from '@Components'
import { ProfileCardProps } from './interfaces'
import { getPhoto } from '@Utils'
import { useSelector } from 'react-redux'

const ProfileCard = ({ coverPhoto, profilePhoto, name, department, designation, company, messageOnClick, connectOnClick, userId }: ProfileCardProps) => {

    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);

    return (
        <div className="card-profile p-2 mx--3 mb--4 mt--5">
            <CardImg
                style={{ maxHeight: '200px' }}
                src={getPhoto(coverPhoto)}
            />
            <Row className="justify-content-center">
                <Col>
                    <div className="card-profile-image">
                        <Image
                            variant="rounded"
                            size={'xxl'}
                            className="rounded-circle pointer"
                            style={{ height: '150px', width: '150px' }}
                            src={getPhoto(profilePhoto)}
                        />
                    </div>
                </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                    {dashboardDetails?.user_details?.id !== userId &&
                        <Button
                            className={"mr-4 px-2 text-white"}
                            text={'Connect'}
                            color={'info'}
                            onClick={connectOnClick}
                            size={'sm'}
                        />
                    }
                    {dashboardDetails?.user_details?.id !== userId &&

                        <Button
                            text={'Message'}
                            className="float-right px-2"
                            color="default"
                            onClick={messageOnClick}
                            size={'sm'}
                        />
                    }
                </div>
            </CardHeader>
            <CardBody className="pt-2">

                <div className="text-center mt-3">
                    <h5 className="h3">
                        {name}
                    </h5>
                    <div className="h5">
                        <i className="ni business_briefcase-24 mr-2" />
                        {department} - {designation}
                    </div>
                    <div>
                        <i className="ni education_hat mr-2" />
                        {company}
                    </div>
                </div>
            </CardBody>
        </div>
    )
}

export { ProfileCard } 