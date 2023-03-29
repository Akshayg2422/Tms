import { useEffect, useState } from "react";
import {
    Comments,
    TaskUsers,
    TaskAttachments,
    ReferenceTasks,
    SubTaskListing,
    TaskInfo,
} from "@Modules";
import { Button, Card, Tabs } from "@Components";
import { useSelector } from "react-redux";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";

function TaskDetails() {


    const { goTo, params } = useNavigation();

    // const {id}= params

    // console.log(id+'=====');


    const { selectedReferenceIssues } = useSelector((state: any) => state.AdminReducer);

    const TABS = [
        { id: "1", title: "COMMENTS", component: <Comments /> },
        { id: "2", title: "ATTACH", component: <TaskAttachments /> },
        { id: "3", title: "reference", component: <ReferenceTasks /> },
        { id: "4", title: "user", component: <TaskUsers /> },
    ];

    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    useEffect(() => {
        setSelectedTab(TABS[0]);
    }, [])

    return (
        <>
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-8 mr--3 mb--5">
                        <TaskInfo />
                    </div>
                    <div className="col-4">
                        <Card className="overflow-auto overflow-hide mt-3 mr--3" style={{ height: '58vh' }}>
                            <span className={'ml-lg-9 ml-xl-9 ml-md-9 ml-sm-9 pl-lg-5 pl-xl-5 pl-md-5 pl-sm-5 mt--3'} style={{ position: 'absolute', zIndex: '1' }}>
                                <Button
                                    size={"sm"}
                                    text={'Add New'}
                                    onClick={() => {
                                        goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_SUB_TASK);
                                    }}
                                />
                            </span>
                            <SubTaskListing />
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col mt--3">
                        <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
                    </div>
                </div>
            </div>
            {/* <div className={'container'}>
                <div className="row mt-2">
                    <div className="col-8">
                        <TaskInfo />
                    </div>

                    <Card className="col-4 overflow-auto overflow-hide" style={{ height: '58vh' }}>
                        <span className={'ml-lg-9 ml-xl-9 ml-md-9 ml-sm-9 pl-lg-6 pl-xl-6 pl-md-6 pl-sm-6 mt--3'} style={{ position: 'absolute', zIndex: '1' }}>
                            <Button
                                size={"sm"}
                                text={'Add New'}
                                onClick={() => {
                                    goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_SUB_TASK);
                                }}
                            />
                        </span>
                        <SubTaskListing />
                    </Card>
                </div>
                <div className=" mt--3">
                    <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
                </div>
            </div> */}


        </>
    );
}

export { TaskDetails };
