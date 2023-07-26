import { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
    Comments,
    TaskAttachments,
    ReferenceTasks,
    TaskUsers,
    TaskInfo,
    SubTasks
} from "@Modules";
import { Tabs, Image } from "@Components";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTabPosition } from '@Redux'
import { icons } from "@Assets";
import { useWindowDimensions } from "@Hooks";


function TaskDetails() {

    const dispatch = useDispatch()
    const { selectedTabPositions } = useSelector(
        (state: any) => state.TaskReducer
    );
    const ref = useRef<HTMLDivElement>(null)

    const { width, height } = useWindowDimensions()
    const [infoHeight, setInfoHeight] = useState(0)

    const TABS = [
        { id: "1", title: <div className="text-center pointer"><Image src={selectedTabPositions.id === '1' ? icons.CommentsPink : icons.Comments} height={20} width={20} /></div>, component: <Comments /> },
        { id: "2", title: <div className="text-center pointer"><Image src={selectedTabPositions.id === '2' ? icons.attachmentsPink : icons.attachments} height={16} width={16} /></div>, component: <TaskAttachments /> },
        { id: "3", title: <div className="text-center pointer"><Image src={selectedTabPositions.id === '3' ? icons.referencePink : icons.reference} height={16} width={16} /></div>, component: <ReferenceTasks /> },
        { id: "4", title: <div className="text-center pointer"><Image src={selectedTabPositions.id === '4' ? icons.usersPink : icons.users} height={16} width={16} /></div>, component: <TaskUsers /> },
    ];


    useEffect(() => {
        if (ref.current) {
            setInfoHeight(ref.current.clientHeight)
        }
    })

    return (

        <div className="h-100vh m-3">
            <div className="row">
                <div className="col mr--3 h-100vh overflow-hide" style={{
                    overflowY: 'scroll'
                }}>
                    <div ref={ref}>
                        <TaskInfo />
                    </div>

                    <div className="mt--3" style={{
                        height: height - (infoHeight + 40),
                        minHeight: 50
                    }}>
                        <SubTasks />
                    </div>
                </div>
                <div className="col-6" >
                    <Tabs tabs={TABS} selected={selectedTabPositions} onChange={(item) => {
                        dispatch(setSelectedTabPosition(item))
                    }} />
                </div>
            </div>
        </div>
    );
}

export { TaskDetails };
