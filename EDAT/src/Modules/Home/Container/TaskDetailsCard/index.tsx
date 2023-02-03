import { Card } from "@Components";
import { FC } from "react";
import { CardFooter, CardHeader } from "reactstrap";
import { TaskDetailsCardProps } from "./interface";
import {translate} from '@I18n'

const TaskDetailsCard: FC<TaskDetailsCardProps> = ({ data, onClick }) => {

    return (
        <>
            {data && data.length > 0 &&
                data.map((item: any) => {
                    const { points = ['abc'], completedTasks = 20, totalTasks = 30, topic = 'Function basics' } = item
                    let textColor = completedTasks === totalTasks ? 'text-white' : 'text-muted'
                    let taskTextColor = completedTasks === totalTasks ? 'text-white' : ''
                    let textHeadingColor = completedTasks === totalTasks ? 'text-white' : 'text-primary'
                    let cardColor = completedTasks === totalTasks ? 'success' : 'neutral'
                    return (
                        <div className="col-lg-3">
                            <Card className={`card-pricing bg-gradient-${cardColor} border-0 text-center mb-4`}>
                                <CardHeader className="bg-transparent">
                                    <h4 className={`text-uppercase ls-1 mt--3 ${textHeadingColor} py-3 mb-0`}>
                                        {topic}
                                    </h4>
                                </CardHeader>
                                <div className={`display-2 ${taskTextColor}`}>{`${completedTasks}/${totalTasks}`}</div>
                                <span className={`${textColor}`}>{translate('course.completionRatio')}</span>
                                <ul className="list-unstyled my-4">
                                    {points && points.length > 0 &&
                                        points.map((point: any) => {
                                            return (
                                                <li>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <div className={`text-sm ${textColor}`}>
                                                            {point}
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <CardFooter className="bg-transparent">
                                    <a
                                        className={`${textColor}`}
                                        href="#pablo"
                                        onClick={onClick}
                                    >
                                        {translate('course.requestADemo')}
                                    </a>
                                </CardFooter>
                            </Card>
                        </div>
                    )
                })
            }
        </>
    )
}
export { TaskDetailsCard };
