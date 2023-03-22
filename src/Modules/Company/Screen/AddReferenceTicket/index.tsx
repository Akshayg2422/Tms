import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicketEvent, getTickets } from "@Redux";
import { Divider, Button, HomeContainer, Table, NoDataFound, CommonTable, Input, } from "@Components";
import { ReferenceIssueItem } from "@Modules";
import { useInput } from "@Hooks";
import { translate } from "@I18n";
import { RTS, getStatusFromCode } from "@Utils";

function AddReferenceTicket() {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state: any) => state.CompanyReducer);
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
  const { selectedIssues } = useSelector(
    (state: any) => state.AdminReducer
  );



  
  const [selectedIssueDetails, setSelectedIssueDetails] = useState<any>("");
  const [isCheck,setIsCheck]=useState(false)
  const Search = useInput("");


  const submitHandler = () => {
    // dispatch(referenceIssueDetails(selectedIssueDetails));
    const params = {
      id: selectedIssues?.id,
      event_type: RTS,
      reference_ticket: selectedIssueDetails,
    };

    dispatch(
      addTicketEvent({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };
  const onSelectedTickets = (item: any) => {

    let updatedSelectedId: any = [...selectedIssueDetails];
    if (selectedIssueDetails?.length > 0) {
      const selectedItem = updatedSelectedId;
      const ifExist = selectedItem.some(
        (existEl: any) => existEl.id === item?.id
      );
      if (ifExist) {
        updatedSelectedId = selectedItem.filter(
          (filterItem: any) => filterItem.id !== item?.id
        );
      } else {
        updatedSelectedId = [...updatedSelectedId, item];
      }
    } else {
      updatedSelectedId = [item];
    }
    setSelectedIssueDetails(updatedSelectedId);
  };

  const getSearchHandler = () => {
    const params = { q_many: Search.value };
    dispatch(
      getTickets({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "assigned to": el?.assigned_to.name,
        phone: el.by_user?.phone,
        email: el.by_user?.email,
        '':
        <div className="d-flex justify-content-center from-check">
        <Input className="form-check-input" type="checkbox" id="flexCheckChecked" 
        onClick={( )=>{setIsCheck(true)}}
        ></Input>
        </div>,
        
      };
    });
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-5  col-md-12 col-sm-12">
            <div className="input-group bg-white border rounded-pill">
              <input
                type="text"
                className="form-control bg-transparent border border-0"
                placeholder={translate("auth.search")!}
                value={Search.value}
                onChange={Search.onChange}
              />
              <span
                className="input-group-text  border border-0"
                onClick={getSearchHandler}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <i className="fas fa-search" />
              </span>
              <span
                className="input-group-text  border border-0"
                style={{ cursor: "pointer" }}
              >
                {" "}
                All{" "}
              </span>
              <span
                className="input-group-text  bg-transparent border border-0"
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-chevron-down " />
              </span>
            </div>
          </div>
          <div className="col-lg-2 col-md-12 mt-lg-1 mt-sm-0 mt-md-3 mt-3 col-sm-12  text-right">
            <Button text={translate("common.submit")} onClick={submitHandler} />
          </div>
        </div>
      </div>
      <div>
        <div className="m-3">
          <div className="row justify-content-center">
          
  
                {tickets && tickets?.length > 0 ? <CommonTable title={'Reference Tickets'} tableDataSet={tickets} displayDataSet={normalizedTableData(tickets)}
               tableOnClick={(idx, index, item)=>{
                  if(isCheck){
                  onSelectedTickets(item)
                  }
                }}
                /> : <NoDataFound />}
             
       
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddReferenceTicket };
