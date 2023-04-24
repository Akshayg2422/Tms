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
import { useInput, useNavigation } from "@Hooks";
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
    const search = useInput("");

    useEffect(() => {
        getApiHandler()
    }, [])

    const getEmployeeSearchHandler = () => {
        const params = {
            branch_id: taskItem.raised_by_company?.branch_id,
            q_many: search.value,
        }


        dispatch(
            getEmployees({
                params,
                onSuccess: (response) => () => { },
                onFailure: () => () => { }
            })
        )

    }

    useEffect(() => {
        if (!search.value) {
            dispatch(
                getEmployees({
                    params: {
                        branch_id: taskItem.raised_by_company?.branch_id,
                        q_many: '',
                    },
                    onSuccess: (response) => () => { },
                    onFailure: () => () => { }
                })
            )
        }
    }, [dispatch, search.value, taskItem.raised_by_company?.branch_id])

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
            <Modal className="modal-content"
                style={{
                    maxHeight: '90vh',
                    maxWidth: '50vw',
                }}
                size={'md'} fade={false} isOpen={openModalTagUser}
                onClose={() => {
                    setOpenModalTagUser(!openModalTagUser)
                }}>
                <div className="input-group bg-white border mt--6 mb-2 col-lg-6 col-md-6 ">
                    <input
                        type="text"
                        className="form-control bg-transparent border border-0"
                        placeholder={translate("auth.search")!}
                        value={search.value}
                        onChange={search.onChange}
                    />
                    <span className="input-group-text pointer border border-0" onClick={getEmployeeSearchHandler}>  <i className="fas fa-search" /></span>
                </div>
                <div className="modal-content shadow-none overflow-auto overflow-hide"
                    style={{
                        maxHeight: '66vh',
                        maxWidth: '50vw',
                    }}>
                    {
                        employees && employees.length > 0 && employees.map((tagUser: any, index: number) => {
                            // console.log('tagUsertagUser',JSON.stringify(tagUser));
                            
                            const selected = selectTagUser.some(
                                (selectUserEl: any) => selectUserEl === tagUser?.id
                            );
                            const capitalizedTagUserName = tagUser?.name.slice(0, 1).toUpperCase() + tagUser?.name.slice(1);

                            return (
                                <>

                                    <div className="row">
                                        <H
                                            className="py-2 m-0 col-10 pointer"
                                            tag={'h5'}
                                            text={capitalizedTagUserName}
                                            onClick={() => { (onSelectedTagUser(tagUser)) }}
                                        />
                                        {
                                            selected &&
                                            <span className="pt-2">
                                                <Image className="bg-white" variant={'avatar'} size={'xs'} src={icons.tickGreen} />
                                            </span>
                                        }
                                    </div>
                                    <div className=''>{index !== employees.length && <Divider space={'1'} />}</div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="pt-3 text-right">
                    <Button
                        text={translate("common.submit")}
                        onClick={() => { ProceedTagUser() }} />
                </div>
            </Modal>

            <Modal className="modal-content"
                style={{
                    maxHeight: '90vh',
                    maxWidth: '50vw',
                }}
                size={'md'} fade={false} isOpen={openModalReassignUser}
                onClose={() => {
                    setOpenModalReassignUser(!openModalReassignUser)
                }}>
                <div className="input-group bg-white border mt--6 mb-2 col-lg-6 col-md-6 ">
                    <input
                        type="text"
                        className="form-control bg-transparent border border-0"
                        placeholder={translate("auth.search")!}
                        value={search.value}
                        onChange={search.onChange}
                    />
                    <span className="input-group-text pointer border border-0" onClick={getEmployeeSearchHandler}>  <i className="fas fa-search" /></span>
                </div>

                <div className="modal-content shadow-none overflow-auto overflow-hide"
                    style={{
                        maxHeight: '66vh',
                        maxWidth: '50vw',
                    }}>
                    {
                        employees && employees.length > 0 && employees.map((ReassignUser: any, index: number) => {
                            const selected = selectReassignUser.id === ReassignUser.id
                            const capitalizedReassignUserName = ReassignUser.name.slice(0, 1).toUpperCase() + ReassignUser.name.slice(1)
                            return (
                                <>
                                    <div className="row">
                                        <H
                                            className="col-11 py-2 m-0 pointer"
                                            tag={'h5'}
                                            text={capitalizedReassignUserName}
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
                </div>
                <div className="pt-3 text-right">
                    <Button
                        text={translate("common.submit")}
                        onClick={() => { ProceedReassignUser() }} />
                </div>
            </Modal>
        </>
    )
}

export { TagAndAssignUser }