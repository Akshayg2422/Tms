import {
    useEffect,
    useState,
} from "react";
import {
    TripleDot,
} from "@Modules";
import {
    Divider,
    Modal,
    H,
    Button,
    Image,
} from "@Components";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    addTaskEvent,
    getEmployees,
    getTaskEvents,
} from "@Redux";
import { translate } from "@I18n";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { icons } from "@Assets";
import { TGU, RGU } from '@Utils';


function TagAndAssignUser() {

    const [openModalTagUser, setOpenModalTagUser] = useState(false)
    const [openModalReassignUser, setOpenModalReassignUser] = useState(false)
    const dispatch = useDispatch()
    const { taskItem } = useSelector((state: any) => state.AdminReducer);
    const { employees } = useSelector((state: any) => state.CompanyReducer);
    const { goTo } = useNavigation()
    const [selectTagUser, setSelectTagUser] = useState([])
    const [selectReassignUser, setSelectReassignUser] = useState<any>('')

    useEffect(() => {

        getApiHandler()
        const params = {
            branch_id: taskItem.raised_by_company?.branch_id
        };

        dispatch(
            getEmployees({
                params,
                onSuccess: (response) => () => { },
                onFailure: () => () => { }
            })
        )
    }, [])

    const getApiHandler = () => {
        const params = {
            task_id: taskItem.id
        };
        dispatch(
            getTaskEvents({
                params,
                onSuccess: (response) => () => { },
                onFailure: () => () => { }
            })
        )
    }

    const onSelectedTagUser = (item: any) => {
        let updatedSelectedId: any = [...selectTagUser];
        if (selectTagUser?.length > 0) {
            const selectedItem = updatedSelectedId;
            const ifExist = selectedItem.some(
                (el: any) => el === item?.id
            );
            if (ifExist) {
                updatedSelectedId = selectedItem.filter(
                    (filterItem: any) => filterItem !== item?.id
                );
            } else {
                updatedSelectedId = [...updatedSelectedId, item.id];
            }
        } else {
            updatedSelectedId = [item.id];
        }
        setSelectTagUser(updatedSelectedId);
    };

    function ProceedTagUser() {

        const params = {
            event_type: TGU,
            tagged_users: selectTagUser,
            id: taskItem.id
        };

        dispatch(addTaskEvent({
            params,
            onSuccess: (response) => () => {
                getApiHandler()
                setOpenModalTagUser(!openModalTagUser)
            },
            onFailure: (failure) => () => { }
        }))
    }

    function ProceedReassignUser() {
        const params = {
            event_type: RGU,
            assigned_to: selectReassignUser.id,
            id: taskItem.id
        };

        dispatch(addTaskEvent({
            params,
            onSuccess: (response) => () => {
                setOpenModalReassignUser(!openModalReassignUser)
                getApiHandler()
            },
            onFailure: () => () => { }
        }))
    }

    return (
        <>
            <div className="d-flex justify-content-end">
                <TripleDot
                    onClickTagUser={() => { setOpenModalTagUser(!openModalTagUser) }}
                    onClickReassignUser={() => { setOpenModalReassignUser(!openModalReassignUser) }}
                    onClickAttachReference={() => { goTo(HOME_PATH.ADD_REFERENCE_TASK) }}
                />
            </div>
            <Modal size={'md'} fade={false} isOpen={openModalTagUser}
                onClose={() => {
                    setOpenModalTagUser(!openModalTagUser)
                }}>
                {
                    employees && employees.length > 0 && employees.map((tagUser: any, index: number) => {
                        const selected = selectTagUser.some(
                            (selectUserEl: any) => selectUserEl === tagUser?.id
                        );

                        return (
                            <>
                                <div className="row">
                                    <H
                                        className="py-2 m-0 col-11 pointer"
                                        tag={'h4'}
                                        text={tagUser.name}
                                        onClick={() => { (onSelectedTagUser(tagUser)) }}
                                    />
                                    {
                                        selected &&
                                        <span className="pt-2">
                                            <Image className="bg-white" variant={'avatar'} size={'xs'} src={icons.tickGreen} />
                                        </span>
                                    }
                                </div>
                                <div className='mx--4'>{index !== employees.length && <Divider space={'1'} />}</div>
                            </>
                        )
                    })
                }
                <div className="pt-3 text-center">
                    <Button
                        text={translate("common.submit")}
                        block
                        onClick={() => { ProceedTagUser() }} />
                </div>
            </Modal>

            <Modal size={'md'} fade={false} isOpen={openModalReassignUser}
                onClose={() => {
                    setOpenModalReassignUser(!openModalReassignUser)
                }}>
                {
                    employees && employees.length > 0 && employees.map((ReassignUser: any, index: number) => {
                        const selected = selectReassignUser.id === ReassignUser.id
                        return (
                            <>
                                <div className="row">
                                    <H
                                        className="col-11 py-2 m-0 pointer"
                                        tag="h4"
                                        text={ReassignUser.name}
                                        onClick={() => { setSelectReassignUser(ReassignUser) }} />
                                    {
                                        selected &&
                                        <span className="pt-2">
                                            <Image className="bg-white" variant={'avatar'} size={'xs'} src={icons.tickGreen} />
                                        </span>
                                    }
                                </div>
                                <div className='mx--4'>{index !== employees.length && <Divider space={'1'} />}</div>
                            </>
                        )
                    })
                }
                <div className="pt-3 text-center">
                    <Button
                        text={translate("common.submit")}
                        block
                        onClick={() => { ProceedReassignUser() }} />
                </div>
            </Modal>
        </>
    )
}

export { TagAndAssignUser }