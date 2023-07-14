import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    MenuBar,
    Input,
    DropDown,
    TextAreaInput,
} from "@Components";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    addTaskEvent,
    refreshTaskEvents
} from "@Redux";
import { Employees } from '@Modules'
import { useDropDown, useInput, useLoader, useModal, useNavigation } from "@Hooks";
import { icons } from "@Assets";
import { TGU, RGU, getArrayFromArrayOfObject, EVS, TASK_STATUS_LIST, getObjectFromArrayByKey } from '@Utils';
import { translate } from '@I18n'
import { useDynamicHeight } from "@Hooks";
import { useParams } from "react-router-dom";


function TaskItemMenu() {

    const { id } = useParams()

    const dynamicHeight: any = useDynamicHeight()
    const TASK_STATUS_MENU = [
        {
            id: 0, name: translate('auth.Tag User'), icon: icons.tagUser,
        },
        {
            id: 1, name: translate('auth.Reassign User'), icon: icons.reassignUser,
        },
        {
            id: 2, name: translate('auth.Change Task Status'), icon: icons.taskStatus,
        }
    ]
    const loginLoader = useLoader(false);

    const dispatch = useDispatch()
    const { selectedTaskId } = useSelector((state: any) => state.TaskReducer);


    const tagUserModal = useModal(false);
    const reassignUserModal = useModal(false);
    const taskCloseModal = useModal(false);
    const taskStatusReason = useInput('')
    const status = useDropDown(getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', selectedTaskId?.task_status));

    const [taggedUsers, setTaggedUsers] = useState([])
    const [reassignUser, setReassignUser] = useState<any>({})

    function proceedAddTaskEvents(taskEventParams: any) {

        const params = {
            ...(taskEventParams && { ...taskEventParams }),
            // id: selectedTask.id
            code: id
        };

        loginLoader.show()
        dispatch(addTaskEvent({
            params,
            onSuccess: (response) => () => {
                try {
                    tagUserModal.hide()
                    reassignUserModal.hide()
                    loginLoader.hide()
                    taskCloseModal.hide()
                    dispatch(refreshTaskEvents())
                } catch (e) {
                    loginLoader.hide()
                }
            },
            onError: (error) => () => {
                loginLoader.hide()

            }
        }))
    }

    console.log(status.value, "lllll")
    function proceedTaskStatusChangeHandler() {
        const params = {
            event_type: EVS,
            taskstatus_changeto: status.value?.id,
            reason: taskStatusReason.value,
        }
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

            <Modal fade={false} isOpen={tagUserModal.visible} onClose={tagUserModal.hide} style={{ maxHeight: '80vh' }}>
                <Employees selection={'multiple'} onSelected={(users) => {
                    const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
                    setTaggedUsers(taggedUserIds)
                }} />
                <div className="pt-3 mr-2 text-right">
                    <Button
                        size={'sm'}
                        loading={loginLoader.loader}
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

            <Modal fade={false} isOpen={reassignUserModal.visible} style={{ overflowY: 'auto', maxHeight: dynamicHeight.dynamicHeight }} onClose={reassignUserModal.hide}>
                <Employees selection={'single'} onSelected={setReassignUser} />
                <div className="text-right">
                    <Button
                        size={'sm'}
                        loading={loginLoader.loader}
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

            <Modal fade={false} isOpen={taskCloseModal.visible} onClose={taskCloseModal.hide} size="md">


                <div className="col-12">
                    <DropDown
                        className="form-control-md"
                        heading={translate("common.taskStatus")}
                        data={TASK_STATUS_LIST}
                        selected={status.value}
                        onChange={status.onChange}
                    />

                    <TextAreaInput
                        heading={translate("common.reason")!}
                        value={taskStatusReason.value}
                        onChange={taskStatusReason.onChange}
                        className="form-control form-control-sm"

                    />


                </div>

                <div className="pt-3 text-right">
                    <Button
                        size={'sm'}
                        loading={loginLoader.loader}
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