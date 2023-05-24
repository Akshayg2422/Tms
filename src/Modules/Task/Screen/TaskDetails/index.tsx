import { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
    Comments,
    TaskAttachments,
    ReferenceTasks,
    TaskUsers,
    TaskInfo,
    SubTasks
} from "@Modules";
import { HomeContainer, Tabs, Image } from "@Components";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTabPosition } from '@Redux'
import { icons } from "@Assets";
import { useDynamicHeight } from "@Hooks";


function TaskDetails() {

    const dispatch = useDispatch()
    const { selectedTabPositions } = useSelector(
        (state: any) => state.TaskReducer
    );

    const dynamicHeight: any = useDynamicHeight()

    const TABS = [
        { id: "1", title: <div className="text-center"><Image src={icons.Comments} height={16} width={16} /></div>, component: <Comments /> },
        { id: "2", title: <div className="text-center"><Image src={icons.attachments} height={16} width={16} /></div>, component: <TaskAttachments /> },
        { id: "3", title: <div className="text-center"><Image src={icons.reference} height={16} width={16} /></div>, component: <ReferenceTasks /> },
        { id: "4", title: <div className="text-center"><Image src={icons.users} height={16} width={16} /></div>, component: <TaskUsers /> },
    ];


    return (
        <div className="m-3">
            <div className="">
                <div className="row">
                    <div className="col-md-6" >
                        <TaskInfo />
                        <SubTasks />
                    </div>
                    <div className="col-md-6">
                        <Tabs tabs={TABS} selected={selectedTabPositions} onChange={(item) => {
                            dispatch(setSelectedTabPosition(item))
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { TaskDetails };
