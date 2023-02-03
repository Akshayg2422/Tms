import { Card } from "@Components";
import { FC } from "react";
import { Progress, Row } from "reactstrap";
import { CardStatusProps } from "./interface";
import {translate} from '@I18n'

const CardStatus: FC<CardStatusProps> = ({ data = [{}], onClick }) => {
    return (
        <>
            <Row>
                {data && data.length > 0 && data.map((detail: any) => {
                    const { statusTitle, totalTask, completedTask, theme } = detail
                    return (
                        <div className="col-md-3 xl-3">
                            <Card className={`bg-gradient-primary border-0`}>
                                <h5 className="text-uppercase text-white mb-0 text-black" >{statusTitle || 'Task Completed'}</h5>
                                <h2 className="font-weight-bold mb-0 text-white">{`${completedTask ? completedTask : '-'}/${totalTask ? totalTask : '-'}`}</h2>
                                <Progress
                                    className="progress-xs mt-3 mb-0"
                                    max={totalTask || 20}
                                    value={completedTask || 10}
                                    color="success"
                                />
                                <p className="mt-3 mb-0 text-sm">
                                    <a
                                        className="text-nowrap text-white font-weight-600"
                                        href="#pablo"
                                        onClick={onClick}
                                    >
                                        {translate("course.seeDetails")}
                                    </a>
                                </p>
                            </Card>
                        </div>
                    )
                })}
            </Row>
        </>
    );
}

export { CardStatus };