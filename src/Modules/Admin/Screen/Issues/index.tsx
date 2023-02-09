import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer, Divider, Modal, Input, H } from '@Components';
import { TicketItem } from '@Modules';
import { Form, FormGroup, InputGroupText, InputGroup } from "reactstrap";
import {getStatusFromCode} from '@Utils'



function Issues() {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState('All');
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer)

     const value=[['',"All"],...dashboardDetails?.ticket_status]
  

    console.log("de",data)


    const { tickets } = useSelector((state: any) => state.CompanyReducer);
    const dispatch = useDispatch();

    const getTicketHandler = () => {
        if (data === 'All') {
            const params = { q: '' };
            dispatch(getTickets({ params }));
        }
        else if (data === 'Raised') {
            const params = { q: '', ticket_status: 'RAI' };
            dispatch(getTickets({ params }));
        }
        else if (data === 'In Progress') {
            const params = { q: '', ticket_status: "INP" };
            dispatch(getTickets({ params }));
        }
        else if (data === 'Cancel') {
            const params = { q: '', ticket_status: 'CAN' };
            dispatch(getTickets({ params }));
        }
        else if (data === 'Close') {
            const params = { q: '', ticket_status: 'CLS' };
            dispatch(getTickets({ params }));
        }
        else if (data === 'On Hold') {
            const params = { q: '', ticket_status: 'ONH' };
            dispatch(getTickets({ params }));
        }
        else if (data === 'Reject') {
            const params = { q: '', ticket_status: 'REJ' };
            dispatch(getTickets({ params }));

        } 
    }

    useEffect(() => {
        getTicketHandler()
    }, [data]);

    return (
        <>
            <div>
                <div className="row justify-content-center ml-9 pl-8 mt-4 m-0">
                    <Form className={"navbar-search form-inline"} >
                        <FormGroup className="mb-0">
                            <InputGroup className="input-group-alternative bg-white input-group-merge">
                                <InputGroupText>
                                    <i className="fas fa-search" />
                                </InputGroupText>
                                <Input placeholder="Search..." type="search" />

                                <InputGroupText onClick={() => setModal(!modal)} className='border-left'>
                                    {data}
                                </InputGroupText>
                                <InputGroupText onClick={() => setModal(!modal)}>
                                    <i className="bi bi-chevron-down"></i>
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>

                <Modal size={'md'} isOpen={modal} onClose={() => setModal(!modal)}  >
                    {
                        value && value.length > 0 && value.map((item, index) => {
                            return (
                                <>
                                    <H tag='h4' onClick={() => {
                                        setData(item[1])
                                        setModal(!modal)
                                    }} text={item[1]} />
                                    {index !== value.length - 1 && <Divider space={'3'} />}
                                </>
                            )
                        })
                    }
                </Modal>

                <HomeContainer isCard title={'Issues'}>
                    {
                        tickets && tickets.data.length > 0 && tickets.data.map((eachTickets: any, index: number) => {
                            return (
                                <>
                                    <TicketItem item={eachTickets} />
                                    {index !== tickets.data.length - 1 && <div className='mx-7'><Divider /></div>}
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