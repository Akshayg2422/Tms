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
    addTicketEvent,
    refreshTicketEvents
} from "@Redux";
import { Employees } from '@Modules'
import { useDropDown, useInput, useModal } from "@Hooks";
import { icons } from "@Assets";
import { TGU, RGU, getArrayFromArrayOfObject, EVS, getObjectFromArrayByKey, TICKET_STATUS_LIST } from '@Utils';
import { translate } from '@I18n'
import { useDynamicHeight } from "@Hooks";


function TicketItemMenu() {



    const dynamicHeight: any = useDynamicHeight()
    const TICKET_STATUS_MENU = [
        {
            id: 0, name: 'Tag User', icon: icons.tagUser,
        },
        {
            id: 1, name: 'Reassign User', icon: icons.reassignUser,
        },
        {
            id: 2, name: 'Change Ticket Status', icon: icons.taskStatus,
        }
    ]

    const dispatch = useDispatch()
    const { selectedTicket } = useSelector((state: any) => state.TicketReducer);



    const tagUserModal = useModal(false);
    const reassignUserModal = useModal(false);
    const ticketCloseModal = useModal(false);
    const ticketStatusReason = useInput('')
    const status = useDropDown(getObjectFromArrayByKey(TICKET_STATUS_LIST, 'id', selectedTicket?.task_status));


    const [taggedUsers, setTaggedUsers] = useState([])
    const [reassignUser, setReassignUser] = useState<any>({})



    function proceedAddTicketEvents(ticketEventParams: any) {

        const params = {
            ...(ticketEventParams && { ...ticketEventParams }),
            id: selectedTicket.id
        };



        dispatch(addTicketEvent({
            params,
            onSuccess: (response) => () => {
                try {
                    tagUserModal.hide()
                    reassignUserModal.hide()
                    ticketCloseModal.hide()
                    dispatch(refreshTicketEvents())
                } catch (e) {
                }
            },
            onError: (error) => () => {
                console.log("error",JSON.stringify(error));
            }
        }))
    }


    function proceedTicketStatusChangeHandler() {
        const params = {
            event_type: EVS,
            ticketstatus_changeto: status.value?.id,
            reason: ticketStatusReason.value,
        }
        proceedAddTicketEvents(params)
    }


    return (
        <>
            <div className="d-flex justify-content-end">
                <MenuBar menuData={TICKET_STATUS_MENU} onClick={(element) => {
                    if (element.id === TICKET_STATUS_MENU[0].id) {
                        tagUserModal.show()
                    } else if (element.id === TICKET_STATUS_MENU[1].id) {
                        reassignUserModal.show()
                    } else if (element.id === TICKET_STATUS_MENU[2].id) {
                        ticketCloseModal.show()
                    }
                }} />
            </div>

            {
                /**
                 * Tag User
                 */
            }

            <Modal isOpen={tagUserModal.visible} onClose={tagUserModal.hide} style={{ maxHeight: '80vh' }}>
                <Employees selection={'multiple'} onSelected={(users) => {
                    const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
                    setTaggedUsers(taggedUserIds)
                }} />
                <div className="pt-3 mr-2 text-right">
                    <Button
                        size={'sm'}
                        text={translate("common.submit")}
                        onClick={() => {
                            proceedAddTicketEvents({ event_type: TGU, tagged_users: taggedUsers })
                        }} />
                </div>
            </Modal>

            {
                /**
                 * Reassign User
                 */
            }

            <Modal isOpen={reassignUserModal.visible} style={{ overflowY: 'auto', maxHeight: dynamicHeight.dynamicHeight }} onClose={reassignUserModal.hide}>
                <Employees selection={'single'} onSelected={setReassignUser} />
                <div className="text-right">
                    <Button
                        size={'sm'}
                        text={translate("common.submit")}
                        onClick={() => {
                            proceedAddTicketEvents({ event_type: RGU, assigned_to: reassignUser?.id })
                        }} />
                </div>
            </Modal>

            {
                /**
                 * taskCloseModal
                 */
            }

            <Modal isOpen={ticketCloseModal.visible} onClose={ticketCloseModal.hide}>

                <div className="col-6">
                    <DropDown
                        className="form-control-md"
                        heading={translate("common.ticketStatus")}
                        data={TICKET_STATUS_LIST}
                        selected={status.value}
                        onChange={status.onChange}
                    />

                    <Input
                        type={"text"}
                        heading={translate("common.reason")}
                        value={ticketStatusReason.value}
                        onChange={ticketStatusReason.onChange}
                    />
                </div>

                <div className="pt-3 text-right">
                    <Button
                        size={'sm'}
                        text={translate("common.submit")}
                        onClick={() => {
                            proceedTicketStatusChangeHandler()
                        }} />
                </div>
            </Modal>

        </>
    )
}

export { TicketItemMenu }