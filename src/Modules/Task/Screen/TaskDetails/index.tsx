import { useEffect, useState } from "react";
import {
    Comments,
    TaskUsers,
    TaskAttachments,
    ReferenceTasks,
    SubTaskListing,
    TaskInfo,
} from "@Modules";
import { Button, Card, H, Tabs } from "@Components";
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
                <div className="row">
                    <div className="col-8 mr--3 mb--5">
                        <TaskInfo />
                    </div>
                    <div className="col-4">
                        <Card className="overflow-auto overflow-hide mt-3 mr--3" style={{ height: '58vh' }}>
                            <div className="row mt--2">
                                <div className="col m-0 p-0">
                                    <H tag={'h5'} text={'SUB TASKS'} />
                                </div>

                                <div className={'col text-right mt--2 m-o p-0'}>
                                    <Button
                                        size={"sm"}
                                        text={translate('common.addNew')}
                                        onClick={() => {
                                            goTo(HOME_PATH.ADD_SUB_TASK);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={'container'}>
                                <SubTaskListing />
                            </div>
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
