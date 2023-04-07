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
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { useSelector } from "react-redux";

function TaskDetails() {
    const { getReferenceId, getSubTaskId } = useSelector((state: any) => state.AdminReducer);
    const { goTo } = useNavigation();

    const TABS = [
        { id: "1", title: <div className="bi bi-chat-text"><span className={'mx-1'}>COMMENTS</span></div>, component: <Comments /> },
        { id: "2", title: <div className="bi bi-paperclip">ATTACH</div>, component: <TaskAttachments /> },
        { id: "3", title: <div className="bi bi-search"><span className={'mx-1'}>REFERENCE</span></div>, component: <ReferenceTasks /> },
        { id: "4", title: <div className="bi bi-person-fill"><span className={'mx-1'}>USER</span></div>, component: <TaskUsers /> },
    ];

    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    useEffect(() => {
        setSelectedTab(TABS[0]);
    }, [getReferenceId, getSubTaskId])

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
                                    text={translate('common.addNew')}
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

        </>
    );
}

export { TaskDetails };
