import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    MenuBar,
} from "@Components";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    addTaskEvent,
} from "@Redux";
import { Employees } from '@Modules'
import { useModal, useNavigation } from "@Hooks";
import { icons } from "@Assets";
import { TGU, RGU, getArrayFromArrayOfObject } from '@Utils';
import { translate } from '@I18n'


function TaskItemMenu() {

    const TASK_STATUS_MENU = [
        {
            id: 0, name: 'Tag User', icon: icons.Equalizer,
        },
        {
            id: 1, name: 'Reassign User', icon: icons.Equalizer,
        },
        {
            id: 2, name: 'Add Attachments', icon: icons.Equalizer,
        }
    ]

    const dispatch = useDispatch()
    const { selectedTask } = useSelector((state: any) => state.TaskReducer);

    const tagUserModal = useModal(false);
    const reassignUserModal = useModal(false);

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
                } catch (e) {
                }
            },
            onFailure: () => () => { }
        }))
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
                        console.log('came');
                    }
                }} />
            </div>

            {
                /**
                 * Tag User
                 */
            }

            <Modal fade={false} isOpen={tagUserModal.visible} onClose={tagUserModal.hide}>
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

            <Modal fade={false} isOpen={reassignUserModal.visible} onClose={reassignUserModal.hide}>
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
        </>
    )
}

export { TaskItemMenu }