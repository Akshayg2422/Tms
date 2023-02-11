import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer, Divider, Modal, Input, H, Button } from '@Components';
import { TicketItem } from '@Modules';
import { Form, FormGroup, InputGroupText, InputGroup, Fade, } from "reactstrap";
import { translate } from '@I18n'
import { getStatusFromCode } from '@Utils'
import { useInput } from '@Hooks';



function Issues() {
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
                onSuccess: () => { },
                onError: () => { }

            }))
        }
        else {
            const params = { ticket_status: statusCode }
            dispatch(getTickets({
                params,
                onSuccess: () => { },
                onError: () => { }
            }))
        }
    }

    const getSearchHandler = () => {
        const params = { q: Search.value }
        dispatch(getTickets({params,
            onSuccess: () => { },
            onError: () => { }
        }))
    }

    return (
        <>
            <div>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-sm-8">
                            <div className='row'>
                                <div className='col'>
                                    <Form className={"navbar-search form-inline pl-2"} >
                                        <FormGroup className="mb-0">
                                            <InputGroup className="input-group-alternative bg-white input-group-merge">

                                                <Input
                                                    placeholder="Search..."
                                                    value={Search.value}
                                                    className='rounded-pill'
                                                    onChange={Search.onChange}
                                                    type="text" />

                                                <InputGroupText className='' onClick={getSearchHandler} style={{ cursor: "pointer" }}>
                                                    <i className="fas fa-search" />
                                                </InputGroupText>

                                                <InputGroupText onClick={() => setModal(!modal)} className='' style={{ cursor: "pointer" }}>
                                                    {showIssue}
                                                </InputGroupText>
                                                <InputGroupText onClick={() => setModal(!modal)} style={{ cursor: "pointer" }} >
                                                    <i className="bi bi-chevron-down "></i>
                                                </InputGroupText>
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>

                                </div>
                                <div className='col text-right mr-3'>
                                    <Button text={'Create Ticket'} />
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