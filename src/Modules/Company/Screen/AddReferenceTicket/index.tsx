import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@Redux';
import { HomeContainer, Divider, Modal, H, Button } from '@Components';
import { CompanyIssues, ReferenceIssue, TicketItem } from '@Modules';
import { useInput } from '@Hooks';


import { translate } from "@I18n";

function AddReferenceTicket() {
  const Search = useInput('');
  return (
    <div> 
        <div className="container mt-4">
                    <div className="row justify-content-center">
       <div className='col-lg-7 col-md-12 col-sm-12'>
    <div className="input-group bg-white border rounded-pill">
        <input
            type="text"
            className="form-control bg-transparent border border-0"
            placeholder={translate("auth.search")!}
            value={Search.value}
            onChange={Search.onChange}
        />
        <span className="input-group-text  border border-0" style={{ cursor: "pointer" }} >  <i className="fas fa-search" /></span>
        <span className="input-group-text  border border-0"style={{ cursor: "pointer" }}> All </span>
        <span className="input-group-text  bg-transparent border border-0" style={{ cursor: "pointer" }}>   <i className="bi bi-chevron-down " /></span>
    </div>
    </div>
    </div>
</div>
<div>
  <ReferenceIssue/>
</div>
</div>
  )
}

export {AddReferenceTicket}