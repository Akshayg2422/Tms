import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    MenuBar,
    Input,
    DropDown,
} from "@Components";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    addTaskEvent,
} from "@Redux";
import { Employees } from '@Modules'
import { useDropDown, useInput, useModal, useNavigation } from "@Hooks";
import { icons } from "@Assets";
import { TGU, RGU, getArrayFromArrayOfObject, EVS, TASK_STATUS_LIST } from '@Utils';
import { translate } from '@I18n'
import { useDynamicHeight } from "@Hooks";


function TaskItemMenu() {

    const dynamicHeight: any = useDynamicHeight()
    const TASK_STATUS_MENU = [
        {
            id: 0, name: 'Tag User', icon: icons.Equalizer,
        },
        {
            id: 1, name: 'Reassign User', icon: icons.Equalizer,
        },
        {
            id: 2, name: 'Change Task Status', icon: icons.Equalizer,
        }
    ]

    const dispatch = useDispatch()
    const { selectedTask } = useSelector((state: any) => state.TaskReducer);

    const tagUserModal = useModal(false);
    const reassignUserModal = useModal(false);
    const taskCloseModal = useModal(false);
    const taskStatusReason = useInput('')
    const status = useDropDown(TASK_STATUS_LIST[0]);

    const [taggedUsers, setTaggedUsers] = useState([])
    const [reassignUser, setReassignUser] = useState<any>({})



    function proceedAddTaskEvents(taskEventParams: any) {

        const params = {
            ...(taskEventParams && { ...taskEventParams }),
            id: selectedTask.id
        };

        console.log(JSON.stringify(params) + '====params');


        dispatch(addTaskEvent({
            params,
            onSuccess: () => () => {
                try {
                    tagUserModal.hide()
                    reassignUserModal.hide()
                    taskCloseModal.hide()
                } catch (e) {
                }
            },
            onFailure: () => () => { }
        }))
    }


    function proceedTaskStatusChangeHandler() {
        const params = {
            event_type: EVS,
            taskstatus_changeto: status.value?.id,
            reason: taskStatusReason.value,
        }

        console.log(JSON.stringify(params) + '=====params');


        proceedAddTaskEvents(params)

    }


    return (
        <>
            <div className="d-flex justify-content-end">
                <MenuBar menuData={TASK_STATUS_MENU} onClick={(element) => {
                    if (element.id === TASK_STATUS_MENU[0].id) {
                        tagUserModal.show()
                    } else if (element.id === TASK_STATUS_MENU[1].id) {
                        reassignUserModal.show()
                    } else if (element.id === TASK_STATUS_MENU[2].id) {
                        taskCloseModal.show()
                    }
                }} />
            </div>

            {
                /**
                 * Tag User
                 */
            }

            <Modal fade={false} isOpen={tagUserModal.visible} onClose={tagUserModal.hide} style={{ overflowY: 'auto', maxHeight:  dynamicHeight.dynamicHeight }}>
                <Employees selection={'multiple'} onSelected={(users) => {
                    const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
                    setTaggedUsers(taggedUserIds)
                }} />
                <div className="pt-3 text-right">
                    <Button
                        size={'sm'}
                        text={translate("common.submit")}
                        onClick={() => {
                            proceedAddTaskEvents({ event_type: TGU, tagged_users: taggedUsers })
                        }} />
                </div>
            </Modal>

            {
                /**
                 * Reassign User
                 */
            }

            <Modal fade={false} isOpen={reassignUserModal.visible}  style={{ overflowY: 'auto', maxHeight:  dynamicHeight.dynamicHeight }}  onClose={reassignUserModal.hide}>
                <Employees selection={'single'} onSelected={setReassignUser} />
                <div className="pt-3 text-right">
                    <Button
                        size={'sm'}
                        text={translate("common.submit")}
                        onClick={() => {
                            proceedAddTaskEvents({ event_type: RGU, assigned_to: reassignUser?.id })
                        }} />
                </div>
            </Modal>

            {
                /**
                 * taskCloseModal
                 */
            }

            <Modal fade={false} isOpen={taskCloseModal.visible} onClose={taskCloseModal.hide}>

                <div className="col-6">
                    <DropDown
                        className="form-control-md"
                        heading={translate("common.ticketStatus")}
                        data={TASK_STATUS_LIST}
                        selected={status.value}
                        onChange={status.onChange}
                    />

                    <Input
                        type={"text"}
                        heading={translate("common.reason")}
                        value={taskStatusReason.value}
                        onChange={taskStatusReason.onChange}
                    />
                </div>

                <div className="pt-3 text-right">
                    <Button
                        size={'sm'}
                        text={translate("common.submit")}
                        onClick={() => {
                            proceedTaskStatusChangeHandler()
                        }} />
                </div>
            </Modal>

        </>
    )
}

export { TaskItemMenu }