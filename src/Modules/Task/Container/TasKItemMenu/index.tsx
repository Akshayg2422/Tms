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
    refreshTaskEvent
} from "@Redux";
import { Employees, EmployeesV1 } from '@Modules'
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
    const { selectedTaskStatus } = useSelector((state: any) => state.TaskReducer);

   
    const status = useDropDown({});

    const tagUserModal = useModal(false);
    const reassignUserModal = useModal(false);
    const taskCloseModal = useModal(false);
    const taskStatusReason = useInput('');
  




    let isSelected
    useEffect(() => {

        isSelected = selectedTaskStatus.filter((el: any) => el?.code === id)
        status.set(getObjectFromArrayByKey(TASK_STATUS_LIST, 'id', isSelected && isSelected[0]?.task_status))

    }, [id])
 

    const [taggedUsers, setTaggedUsers] = useState([])
    const [reassignUser, setReassignUser] = useState<any>({})


    function proceedAddTaskEvents(taskEventParams: any) {

        const params = {
            ...(taskEventParams && { ...taskEventParams }),

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
                    dispatch(refreshTaskEvent())
                } catch (e) {
                    loginLoader.hide()
                }
            },
            onError: (error) => () => {
                loginLoader.hide()

            }
        }))
    }


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
            <div className="d-flex justify-content-center">
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

            <div className="d-flex justify-content-end">

            <Modal fade={false} isOpen={tagUserModal.visible} onClose={tagUserModal.hide} style={{ overflowY: 'auto', maxHeight: dynamicHeight.dynamicHeight }}>
                <EmployeesV1 selection={'multiple'} onSelected={(users) => {
                    const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
                    setTaggedUsers(taggedUserIds)
                }} />
                <div className=" text-right">
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
                <EmployeesV1 selection={'single'} onSelected={setReassignUser} />
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

            </div>

        </>
    )
}

export { TaskItemMenu }