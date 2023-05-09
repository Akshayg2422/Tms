import { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
    Comments,
    TaskAttachments,
    ReferenceTasks,
    TaskUsers,
    TaskInfo,
    SubTasks
} from "@Modules";
import { HomeContainer, Tabs } from "@Components";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTabPosition } from '@Redux'


function TaskDetails() {


    const dispatch = useDispatch()
    const { selectedTabPositions } = useSelector(
        (state: any) => state.TaskReducer
    );

    console.log("tab",selectedTabPositions)

    const TABS = [
        { id: "1", title: <div className="bi bi-chat-text"><span className={'mx-1'}>COMMENTS</span></div>, component: <Comments /> },
        { id: "2", title: <div className="bi bi-paperclip">ATTACHMENTS</div>, component: <TaskAttachments /> },
        { id: "3", title: <div className="bi bi-search"><span className={'mx-1'}>REFERENCES</span></div>, component: <ReferenceTasks /> },
        { id: "4", title: <div className="bi bi-person"><span className={'mx-1'}>USERS</span></div>, component: <TaskUsers /> },
    ];



    const ref = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if (ref?.current) {
            setHeight(ref.current.offsetHeight);
        }
    }, []);

    return (
        <HomeContainer className="m-3">
            <div className="row">
                <div className="col-md-7" >
                    <TaskInfo ref={ref} />
                </div>
                <div className="col ml--3">
                    <SubTasks cardHeight={height} />
                </div>
            </div>
            <div className="row mt--3">
                <div className="col">
                    <Tabs tabs={TABS} selected={selectedTabPositions} onChange={(item) => {
                        dispatch(setSelectedTabPosition(item))
                    }} />
                </div>
            </div>
        </HomeContainer>
    );
}

export { TaskDetails };
