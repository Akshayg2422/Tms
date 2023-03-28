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
            <div className="row mt-2">
                <div className="col-8 mx--2">
                    <TaskInfo />
                </div>

                <Card className="col-4 mx--2 overflow-auto overflow-hide" style={{height:'58vh'}}>
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
            <div className="align-items-center mt--4">
                <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
            </div>


        </>
    );
}

export { TaskDetails };
