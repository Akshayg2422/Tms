import { useEffect, useState } from "react";
import {
    Comments,
    TaskUsers,
    TaskAttachments,
    ReferenceTasks,
    SubTaskListing,
    TaskInfo,
} from "@Modules";
import { Card, Tabs } from "@Components";
import { useSelector } from "react-redux";
import { useNavigation } from "@Hooks";

function TaskDetails() {

    const { goTo } = useNavigation();

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

            <div className="row mt-3">
                <div className="col-8 mr--2">
                    <TaskInfo />
                </div>
                <div className="col-4 mx--3">
                    <SubTaskListing />
                </div>
            </div>
            <div className="align-items-center mt--3">
                <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
            </div>


        </>
    );
}

export { TaskDetails };
