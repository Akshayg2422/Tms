import React, { useState } from 'react'
import { Divider, H, Input, Modal } from '@Components'
import { Form, InputGroupText, InputGroup } from "reactstrap";
import { Issues } from '../Issues';
function FilteredIssues() {
    const [modal, setModal] = useState(false);
    const [filteredIssuesData, setFilteredIssuesData] = useState([
        "All",
        "Raised",
        "In-Progress",
        "Cancelled",
        "Closed",
        "On-Holded",
        "Rejected"])
    const [data, setData] = useState('all');
    return (
        <>

            <div className="row justify-content-end mt-4 m-0">
                <Form className={"navbar-search form-inline"} >
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
                </Form>
            </div>

            <Modal size={'md'} isOpen={modal} onClose={() => setModal(!modal)}  >
                {
                    filteredIssuesData.map((item, index) => {
                        return (
                            <>
                                <H tag='h4' onClick={() => { setData(item) 
                                     setModal(!modal)  }} text={item} />
                                {index !== filteredIssuesData.length-1 && <Divider space={'3'} />}
                            </>
                        )
                    })
                }
            </Modal>

        </>

    )
}
export { FilteredIssues }