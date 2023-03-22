import { useEffect, useState } from "react";
import {
    ThreadTask,
    TaskUsers,
    AttachmentsTask,
    ReferenceTasks
} from "@Modules";
import { Card, Tabs } from "@Components";
import { useSelector } from "react-redux";

function TaskDetails() {

    const { selectedReferenceIssues } = useSelector((state: any) => state.AdminReducer);

    const TABS = [
        { id: "1", title: "THREAD", component: <ThreadTask /> },
        { id: "2", title: "ATTACH", component: <AttachmentsTask /> },
        { id: "3", title: "reference", component: <ReferenceTasks /> },
        { id: "4", title: "user", component: <TaskUsers /> },
    ];

    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    useEffect(() => {
        setSelectedTab(TABS[0]);
    }, [])

    return (
        <>
            <div style={{ cursor: 'pointer' }}>
                <Card>
                    <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
                </Card>
            </div>
        </>
    );
}

export { TaskDetails };
