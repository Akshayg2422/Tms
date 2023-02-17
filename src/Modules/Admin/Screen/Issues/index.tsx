import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer, Divider, Modal, H, Button } from '@Components';
import { TicketItem } from '@Modules';
import { useInput } from '@Hooks';
import { useNavigation } from '@Hooks'
import { ISSUE_CREATE, HOME_PATH } from '@Routes'
import { translate } from "@I18n";



function Issues() {
    const { goTo, goBack } = useNavigation()
    const [modal, setModal] = useState(false);
    const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)
    const [issueStatus, setIssueStatus] = useState([['', 'All']].concat(dashboardDetails?.ticket_status))
    const [showIssue, setShowIssue] = useState('All');
    const [statusCode, setStatusCode] = useState('');
    const { tickets } = useSelector((state: any) => state.CompanyReducer);
    const dispatch = useDispatch();
    const Search = useInput('');

    useEffect(() => {
        getTicketHandler()
    }, [showIssue]);


    const getTicketHandler = () => {
        if (statusCode === '') {
            const params = { q: '' }
            dispatch(getTickets({
                params,
                onSuccess: () => () => { },
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
            <div>

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-sm-8">
                            <div className='row'>
                                <div className='col-lg-8 col-md-12 col-sm-12'>
                                    <div className="input-group bg-white border rounded-pill">
                                        <input
                                            type="text"
                                            className="form-control bg-transparent border border-0"
                                            placeholder={translate("auth.search")!}
                                            value={Search.value}
                                            onChange={Search.onChange}
                                        />
                                        <span className="input-group-text  border border-0" onClick={getSearchHandler} style={{ cursor: "pointer" }} >  <i className="fas fa-search" /></span>
                                        <span className="input-group-text  border border-0" onClick={() => setModal(!modal)} style={{ cursor: "pointer" }}>    {showIssue} </span>
                                        <span className="input-group-text  bg-transparent border border-0" onClick={() => setModal(!modal)} style={{ cursor: "pointer" }}>   <i className="bi bi-chevron-down " /></span>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-12 mt-lg-1 mt-sm-0 mt-md-3 mt-3 col-sm-12 text-right'>
                                    <Button text={translate("common.createTicket")} onClick={() => { goTo(HOME_PATH.DASHBOARD + ISSUE_CREATE.ISSUE_TICKET) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Modal size={'md'} isOpen={modal} fade={false} onClose={() => setModal(!modal)}  >
                    {
                        issueStatus && issueStatus.length > 0 && issueStatus.map((item, index) => {
                            return (
                                <>
                                    <H tag='h4' onClick={() => {
                                        setShowIssue(item[1])
                                        setStatusCode(item[0])
                                        setModal(!modal)

                                    }} text={item[1]} key={index} />
                                    {index !== issueStatus.length - 1 && <Divider space={'3'} />}
                                </>
                            )
                        })
                    }
                </Modal>

                <HomeContainer isCard title={'Issues'}>
                    {
                        tickets && tickets.length > 0 && tickets.map((eachTickets: any, index: number) => {
                            return (
                                <>
                                    <TicketItem item={eachTickets} key={index} />
                                    {index !== tickets.length - 1 && <div className='mx-7'><Divider /></div>}
                                </>
                            )
                        })

                    }
                    
                </HomeContainer> 
            </div>
        </>
    )
}

export { Issues }