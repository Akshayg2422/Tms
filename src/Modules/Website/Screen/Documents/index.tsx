import { Card } from '@Components'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import { icons } from '@Assets'

const Documents = [
    {
        image: require("../../../../Assets/img/Documents/Doc1.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc2.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc3.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc4.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc5.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc6.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc7.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc8.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc9.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc10.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc11.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc12.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc13.png")
    },
    {
        image: require("../../../../Assets/img/Documents/Doc14.png")
    },
    // {
    //     image: require("../../../../Assets/img/Documents/Doc15.png")
    // },

]

function Documentation() {


    return (
        <div style={{backgroundColor:'#C2DFFF'}}>
            <Container>

                <div>

                    <Col className="order-md-1">
                        <div className="pr-md-5">
                            <h1 className='justify-content-center d-flex'>Documentation</h1>
                            <p>
                                Welcome to the documentation for Quanta TMS! This guide will provide you with a comprehensive overview of the features, benefits, and usage instructions for Quanta TMS, your ultimate solution for efficient collaboration and communication.
                            </p>
                        </div>
                    </Col>

                </div>



                <Row className="mt-5 justify-content-center d-flex ">

                    {
                        Documents.map((item) => {

                            return (
                                <Col md="3">
                                    <div className='' style={{ borderRadius: '10px',backgroundColor:'#728FCE',border: '1px solid rgb(95, 115, 228,1)',  }}>
                                        <div className="d-flex justify-content-center " style={{ padding: ' 10px 10px' }}>
                                            <img
                                                style={{
                                                    height: '150px',
                                                    width: '250px',

                                                    // borderRadius: " 7px"
                                                }}
                                                alt="All Images"
                                                // className="mx-2"
                                                src={item.image}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            )

                        })
                    }

                </Row>
            </Container>

        </div>
    )
}
export { Documentation }
