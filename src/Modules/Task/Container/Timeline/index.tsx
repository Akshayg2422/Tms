import React from 'react'
import { Card } from '@Components'
import { CardBody, CardHeader } from 'reactstrap'

function Timeline() {
    return (
        <>
            <CardHeader className={'mt--5'}>
                <h5 className="h3 mb-0">Latest Events</h5>
            </CardHeader>
            <CardBody className={'shadow-none mb--4'}>
                <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                >
                    <div className="timeline-block">
                        <span className="timeline-step badge-success">
                            <i className="ni ni-bell-55" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        New message
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />2 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                Let's meet at Starbucks at 11:30. Wdyt?
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-danger">
                            <i className="ni ni-html5" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        Product issue
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />3 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                A new issue has been reported for Argon.
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-info">
                            <i className="ni ni-like-2" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        New likes
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />5 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                Your posts have been liked a lot.
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-info">
                            <i className="ni ni-like-2" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        New likes
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />5 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                Your posts have been liked a lot.
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-info">
                            <i className="ni ni-like-2" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        New likes
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />5 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                Your posts have been liked a lot.
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-info">
                            <i className="ni ni-like-2" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        New likes
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />5 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                Your posts have been liked a lot.
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-info">
                            <i className="ni ni-like-2" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        New likes
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />5 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                Your posts have been liked a lot.
                            </h6>
                        </div>
                    </div>
                    <div className="timeline-block">
                        <span className="timeline-step badge-info">
                            <i className="ni ni-like-2" />
                        </span>
                        <div className="timeline-content">
                            <div className="d-flex justify-content-between pt-1">
                                <div>
                                    <span className="text-muted text-sm font-weight-bold">
                                        New likes
                                    </span>
                                </div>
                                <div className="text-right">
                                    <small className="text-muted">
                                        <i className="fas fa-clock mr-1" />5 hrs ago
                                    </small>
                                </div>
                            </div>
                            <h6 className="text-sm mt-1 mb-0">
                                Your posts have been liked a lot.
                            </h6>
                        </div>
                    </div>
                </div>
            </CardBody>
        </>
    )
}

export { Timeline }