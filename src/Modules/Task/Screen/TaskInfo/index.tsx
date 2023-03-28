
import React from "react";
import { useSelector } from "react-redux";
import { H, Image, Card, HomeContainer } from "@Components";
import { getDisplayDateFromMoment, getDisplayDateTimeFromMoment, getMomentObjFromServer, getPhoto } from '@Utils'
import { translate } from "@I18n";

function TaskInfo() {

    const { taskItem } = useSelector((state: any) => state.AdminReducer);

    const { title, description, by_user, raised_by_company, task_attachments, assigned_to, created_at, eta_time } = taskItem;

    return (
        <HomeContainer>


            <Card className={'mt--3 mr--2'} style={{ height: '58vh' }}>
                <div className="row align-items-start">
                    <div className="col">
                        <H tag={"h3"} text={title} />
                        <h3 className="text-sm text-muted">{description}</h3>
                    </div>
                    <div className="col"></div>
                    <div className="col mr--9">
                        <h6>{getDisplayDateFromMoment(getMomentObjFromServer(created_at))}</h6>
                    </div>
                </div>
                <div className="row align-items-center my-4">
                    <div className="col">
                        {
                            task_attachments &&
                            task_attachments?.length > 0 && task_attachments?.map((item) => {
                                return <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}>
                                    <Image
                                        variant={'avatar'}
                                        src={getPhoto(item?.attachment_file)} />
                                </a>
                            })
                        }
                    </div>
                    <div className="col"></div>
                    <div className="col">
                        <h6 className="text-uppercase d-flex justify-content-end">{getDisplayDateTimeFromMoment(getMomentObjFromServer(eta_time))}</h6>
                    </div>
                </div>
                <div className="row align-items-end my-5">
                    <div className="col">
                        <div className="h5 mb-0"> {by_user?.name} </div>
                        <div className="h5 mb-0"> {by_user?.phone} </div>
                        <div className="h5 mb-0"> {by_user?.email} </div>
                    </div>
                    <div className="col align-self-center mr--5">
                        <div className="col d-flex  justify-content-center mr--2"> <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} /> </div>
                    </div>

                    <div className="col">
                        <h6>
                            <div className="h5 mb-0"> {raised_by_company?.display_name} </div>
                            <div className="h5 mb-0"> @<span className="h5"> {assigned_to?.name} </span></div>
                            <div className="h5 mb-0"></div>
                            <div className={'text-uppercase  text-muted'}>{raised_by_company?.address}</div>
                        </h6>
                    </div>
                    <div className="col">

                    </div>
                </div>
            </Card>
        </HomeContainer>

    );
}

export { TaskInfo };
