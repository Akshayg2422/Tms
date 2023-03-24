import { useEffect, useState } from "react";
import {
    Comments,
    TaskUsers,
    AttachmentsTask,
    ReferenceTasks
} from "@Modules";
import { Button, Card, Tabs } from "@Components";
import { useSelector } from "react-redux";
import { HOME_PATH } from "@Routes";
import { useNavigation } from "@Hooks";

function TaskDetails() {

    const { goTo } = useNavigation();

    const { selectedReferenceIssues } = useSelector((state: any) => state.AdminReducer);

    const TABS = [
        { id: "1", title: "COMMENTS", component: <Comments /> },
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
            <div className="col text-right mt-3">
                <Button
                    size={"sm"}
                    text={'Add Sub Task'}
                    onClick={() => {
                        goTo(HOME_PATH.DASHBOARD + HOME_PATH.ADD_SUB_TASK);
                    }}
                />
            </div>

            <div className='mt-3 mx-3' style={{ cursor: 'pointer' }}>
                <div >
                    <div className="align-items-center">
                        <Tabs tabs={TABS} selected={selectedTab} onChange={setSelectedTab} />
                    </div>
                </div>

            </div>
        </>
    );
}

export { TaskDetails };
