import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicketEvent, getTickets } from "@Redux";
import { Button,  NoDataFound, CommonTable,  Checkbox, showToast,Image } from "@Components";
import { useInput,useNavigation} from "@Hooks";
import { translate } from "@I18n";
import { RTS, getStatusFromCode, getArrayFromArrayOfObject, validate, ifObjectExist, ADD_REFERENCE_TICKET, getValidateError, paginationHandler, SEARCH_PAGE } from "@Utils";
import { icons } from "@Assets";

function AddReferenceTicket() {
  const dispatch = useDispatch();
  const { tickets, ticketNumOfPages, ticketCurrentPages, issueReferenceDetails } = useSelector((state: any) => state.CompanyReducer);
  const { dashboardDetails, selectedIssues } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const [selectedReferenceTickets, setSelectedReferenceTickets] = useState([...issueReferenceDetails])
  const Search = useInput("");
  const{goBack}=useNavigation();
  useEffect(() => {
    if (!isSync.tasks) {
      getSearchHandler(ticketCurrentPages)
    }
  }, [isSync])
  const submitHandler = () => {

    const params = {
      id: selectedIssues?.id,
      event_type: RTS,
      reference_ticket: getArrayFromArrayOfObject(selectedReferenceTickets, 'id'),
    };

    const validation = validate(ADD_REFERENCE_TICKET, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTicketEvent({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, "success");
              goBack();
            }
          },
          onError: (error) => () => {
            showToast(error.error_message);
          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));
    }
  };
  const onSelectedTickets = (item: any) => {

    let updatedSelectedReferenceTickets: any = [...selectedReferenceTickets];

    const ifExist = updatedSelectedReferenceTickets.some(
      (el: any) => el.id === item?.id
    );
    if (ifExist) {
      updatedSelectedReferenceTickets = updatedSelectedReferenceTickets.filter(
        (filterItem: any) => filterItem.id !== item?.id
      );
    } else {
      updatedSelectedReferenceTickets = [...updatedSelectedReferenceTickets, item];
    }

    setSelectedReferenceTickets(updatedSelectedReferenceTickets);
  };

  const getSearchHandler = (pageNumber:any) => {
    const params = { q_many: Search.value,
      page_number: pageNumber, };
    dispatch(
      getTickets({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };

  function proceedTaskSearch() {
    // setSyncTickets()
    getSearchHandler(SEARCH_PAGE)
  }

  const normalizedTableData = (data: any) => {

    return data.map((el: any) => {

      const isReference = selectedReferenceTickets.some(
        (element: any) => element.id === el?.id
      );

      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "assigned to": el?.assigned_to.name,
        phone: el.by_user?.phone,
        email: el.by_user?.email,
        '': <Checkbox id={el.id} onCheckChange={() => onSelectedTickets(el)}
          defaultChecked={isReference} />,

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
                className="input-group-text pointer  border border-0"
                onClick={proceedTaskSearch}
              >
                {" "}
                <i className="fas fa-search" />
              </span>
              <span
                className="input-group-text pointer  border border-0"
              >
                {" "}
                All{" "}
              </span>
              <span
                className="input-group-text pointer bg-transparent border border-0"
              >
                <i className="bi bi-chevron-down " />
              </span>
            </div>
          </div>
          <div className="col-lg-2 col-md-12 mt-lg-1 mt-sm-0 mt-md-3 mt-3 col-sm-12  text-right">
            <Button text={translate("common.submit")} onClick={()=>{submitHandler()
            goBack()}} />
          </div>
        </div>
      </div>
      <div>
        <div className="m-3">
          <div className="row justify-content-center">


            {tickets && tickets?.length > 0 ? <CommonTable
            title={    <div className='row col pt-2 '>
            <div
            onClick={()=>goBack()} 
            ><Image  
                      size={'sm'}
                      variant='rounded'
                      className='bg-white mt--1  pl-1'
                      src={icons.backArrow}   /></div>
        <div className='pl-2'>  <h3>{'Reference Tickets'}</h3>
        </div>
          </div>}
        
            isPagination
            tableDataSet={tickets}
             displayDataSet={normalizedTableData(tickets)}
             currentPage={ticketCurrentPages}
             noOfPage={ticketNumOfPages}
             paginationNumberClick={(currentPage) => {
              getSearchHandler(paginationHandler("current", currentPage));
             }}
             previousClick={() => {
              getSearchHandler(paginationHandler("prev",ticketCurrentPages))
             }
             }
             nextClick={() => {
              getSearchHandler(paginationHandler("next", ticketCurrentPages));
             }
             }

            /> : <NoDataFound />}

          </div>
        </div>
      </div>
    </div>
  );
}

export { AddReferenceTicket };
