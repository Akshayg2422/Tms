import { Button, Card, CommonTable } from '@Components';
import { fetchTaskDetails, postGenericCrudDetails } from '@Redux';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { translate } from '@I18n'
import { useInput } from '@Hooks';

const Question = React.forwardRef((props, ref: any) => {

    console.log(ref + "========ref");

    const dispatch = useDispatch();

    const { taskDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const [question, setQuestion] = useState('')
    console.log(taskDetails);




    const questionInputValidation = () => {
        if (question === '') {
            return false
        }
        else {
            return true
        }
    }

    const onSubmit = () => {
        if (questionInputValidation()) {
            const params = 
            {
            "mq":"student__StudentCourseTask",
            "data":{
            "start_date":"2022-01-14",
            "base_status":"ST",
            "is_inprogress":true,
            "approver_id":"ba5ebe15-138c-4cf1-83de-2eae8fc8ad87",
            "student_course_topic_id":"4e51c492-57e4-46dd-85b2-e067d62e7654",
            "course_task_id":"4e51c492-57e4-46dd-85b2-e067d62e7654",
            "formulated_question":"Student Entered Question",
            "procedure":[
            ],
            "flow_diagram":[
            ],
            "program":"Student entered program"
            }
            }

            dispatch(postGenericCrudDetails({
                params,
            }))
        }
    }


    useEffect(() => {
        const params = {
            task_id: "4e51c492-57e4-46dd-85b2-e067d62e7654"
        }

        dispatch(fetchTaskDetails({ params }))
    }, [])

    const normalizedEmployeeLog = (data: any) => {
        return data?.map((el: any) => {
            console.log("66666666666", el);

            return {
                // sI: el.id,
                'Sample Input': el.i.join('\n'),
                output: el.o.length > 1 ? el.o.join('\n') : el.o,
            };
        });
    };

    return (
        <div className='container-fluid py-3' id={'Questions'} ref={ref} >
            <div className='pb-4 display-3'>Question</div>
            <div className='row '>
                <div className='col-sm-6'>
                    <Card className='' >
                        <h3 className='text-info'>{translate('course.question')}</h3>
                        <div className='overflow-auto scroll-hidden mb--1' style={{ height: '35.5vh' }}>
                            <p className='font-weight-normal text-justify text-dark'>{taskDetails?.name || ''}</p>
                            <p className='font-weight-normal text-justify text-dark'>{taskDetails?.problem_statement || ''}</p>
                        </div>
                    </Card>
                </div>
                <div className='col '>
                    <Card className=''>
                        <h3 className='text-info'>{translate('course.rules')}</h3>
                        <ul
                            id="tabs-icons-text"
                            role="tablist"
                            className='overflow-auto scroll-hidden mb--1'
                            style={{ height: '35.5vh' }}
                        >
                            <ol className='ml--5'>
                                {taskDetails && taskDetails?.rules?.map((it: any, index: number) => {
                                    return (
                                        <>
                                            <li className="text-dark" >{it.value}
                                                <ol type='a' className="text-dark" >
                                                    {it && it.child.length > 0 && it?.child?.map((cIt1: any) => {
                                                        return (
                                                            <>
                                                                <li className='text-justify font-weight-normal'>{cIt1?.value}</li>
                                                                <ol type='i' className="text-dark" >
                                                                    {cIt1 && cIt1.child.length > 0 && cIt1?.child?.map((cIt2: any) => {
                                                                        return (
                                                                            <>
                                                                                <li className='text-justify font-weight-normal'>{cIt2?.value}</li>
                                                                                <ol className="text-dark" >

                                                                                    {cIt2 && cIt2.child.length > 0 && cIt2?.child?.map((cIt3: any) => {
                                                                                        return (
                                                                                            <>
                                                                                                <li className='text-justify font-weight-normal'>{cIt3?.value}</li>
                                                                                                <ol type='a'>
                                                                                                    {cIt3 && cIt3.child.length > 0 && cIt3?.child?.map((cIt4: any) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <li className='text-justify font-weight-normal'>{cIt4?.value}</li>
                                                                                                                <ol type='i'>
                                                                                                                    {cIt4 && cIt4.child.length > 0 && cIt4?.child?.map((cIt5: any) => {
                                                                                                                        return (
                                                                                                                            <>
                                                                                                                                <li className='text-justify font-weight-normal'>{cIt5?.value}</li>
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    })}
                                                                                                                </ol>
                                                                                                            </>
                                                                                                        )
                                                                                                    })}
                                                                                                </ol>
                                                                                            </>
                                                                                        )
                                                                                    })}
                                                                                </ol>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </ol>
                                                            </>
                                                        )
                                                    })}
                                                </ol>
                                            </li>
                                        </>
                                    );
                                })}
                            </ol>
                        </ul>
                    </Card>
                </div>
            </div>

            <div className='row mt-xl-0'>
                <div className='col'>

                    <Card className=''>
                        <h3 className='text-info'>{translate('course.sampleI/O')}</h3>
                        <div className='overflow-auto scroll-hidden mx--4' style={{ height: '30.5vh' }}>
                            {taskDetails &&
                                (<CommonTable
                                    noHeader
                                    displayDataSet={normalizedEmployeeLog(taskDetails.sample_io)}
                                />)
                            }
                        </div>
                    </Card>
                </div>
                <div className='col'>
                    <Card className='' style={{ height: '41.3vh' }}>
                        <h3 className='text-info'>{translate('course.writtenQuestion')}</h3>

                        <textarea
                            className="form-control"
                            placeholder="Type the Question"
                            value={question}
                            onChange={(e) => { setQuestion(e.target.value) }}
                            style={{ resize: 'none' }}
                        />
                        <div className='float-right mt-3 pr-sm-0 pr-lg-0 pr-7'>
                            <Button text={translate('common.submit')} onClick={() => {
                                questionInputValidation()
                                onSubmit()
                                console.log("clicked");
                            }} />
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    )
}
)

export { Question };
