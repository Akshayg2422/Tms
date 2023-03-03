import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets, setIsSync } from '@Redux';
import { HomeContainer, Divider, Modal, H, Button } from '@Components';
import { TicketItem } from '@Modules';
import { useInput } from '@Hooks';
import { useNavigation } from '@Hooks'
import { HOME_PATH } from '@Routes'
import { translate } from "@I18n";



function Issues() {

    const { goTo } = useNavigation()
    const [modal, setModal] = useState(false);
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const [issueStatus, setIssueStatus] = useState([['', 'All']].concat(dashboardDetails?.ticket_status))
    const [showIssue, setShowIssue] = useState('All');
    const [statusCode, setStatusCode] = useState('');
    const { tickets } = useSelector((state: any) => state.CompanyReducer);
    const dispatch = useDispatch();
    const Search = useInput('');
    const { isSync } = useSelector(
        (state: any) => state.AppReducer
    );

    useEffect(() => {
        getTicketHandler()
    }, [showIssue]);


    const getTicketHandler = () => {
        if (!isSync.issues) {
            if (statusCode === '') {
                const params = { q: '' }
                dispatch(getTickets({
                    params,
                    onSuccess: () => () => {
                        dispatch(setIsSync({
                            ...isSync, issues: true
                        }))
                    },
                    onError: () => () => { }

                }))
            }
            else {
                const params = { ticket_status: statusCode }
                dispatch(getTickets({
                    params,
                    onSuccess: () => () => { },
                    onError: () => () => { }
                }))
            }
        }
    }

    const getSearchHandler = () => {
        const params = { q_many: Search.value }
        dispatch(getTickets({
            params,
            onSuccess: () => () => { },
            onError: () => () => { }
        }))
    }

    return (
        <>
            <div className='row m-0 mt-3'>
                <div className='col-6'></div>
                <div className='col-4  ml-4'>
                    <div className='row m-0 '>
                        <div className="col input-group bg-white ">
                            <input
                                type="text"
                                className="form-control bg-transparent border border-0"
                                placeholder={translate("auth.search")!}
                                value={Search.value}
                                onChange={Search.onChange}
                            />
                            <span className="input-group-text border-0 pointer px-3" onClick={getSearchHandler} >  <i className="fas fa-search" /></span>
                            <div className='row pointer' onClick={() => setModal(!modal)}>
                                <span className="input-group-text border-0 ">    {showIssue} </span>
                                <span className="input-group-text border-0">   <i className="bi bi-chevron-down " /></span>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='col text-right mt-3'>
                    <Button size={'sm'} text={translate("common.createTicket")} onClick={() => { goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_TICKET) }} />
                </div>
            </div>

            <HomeContainer isCard title={'Issues'}>
                {
                    tickets && tickets.length > 0 && tickets?.map((eachTickets: any, index: number) => {
                        const divider = tickets.length - 1 !== index
                        return (
                            <TicketItem item={eachTickets} key={index} divider={divider} />
                        )
                    })
                }
            </HomeContainer>

            <Modal size={'md'} isOpen={modal} fade={false} onClose={() => setModal(!modal)}  >
                {
                    issueStatus && issueStatus?.length > 0 && issueStatus?.map((item, index) => {
                        return (
                            <>
                                <H tag='h4' onClick={() => {
                                    setShowIssue(item[1])
                                    setStatusCode(item[0])
                                    setModal(!modal)

                                }} text={item[1]} key={index} style={{ cursor: "pointer" }} />
                                {index !== issueStatus?.length - 1 && <Divider space={'3'} />}
                            </>
                        )
                    })
                }
            </Modal>
        </>
    )
}

export { Issues }