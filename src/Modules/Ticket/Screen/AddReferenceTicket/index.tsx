import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTicketEvent, getTickets } from "@Redux";
import { NoDataFound, CommonTable, Checkbox, showToast, HomeContainer, SearchInput, Button, Back } from "@Components";
import { useInput, useNavigation } from "@Hooks";
import { RTS, getStatusFromCode, getArrayFromArrayOfObject, validate, ifObjectExist, getValidateError, paginationHandler, SEARCH_PAGE, INITIAL_PAGE, ADD_REFERENCE_TICKET } from "@Utils";


function AddReferenceTicket() {

  const dispatch = useDispatch();

  const { tickets, dashboardDetails, selectedTicket, ticketReferenceDetails, referenceTicketNoOfPages, referenceTicketCurrentPages } = useSelector((state: any) => state.TicketReducer);
  const [selectedReferenceTicket, setSelectedReferenceTicket] = useState([...ticketReferenceDetails])
  const { goBack } = useNavigation();

  const search = useInput("");

  useEffect(() => {
    getTicketsApiHandler(referenceTicketCurrentPages)
    // console.log('getTicketsApiHandler=========>')
  }, [])


  const addReferenceTicketHandler = () => {

    const params = {
      id: selectedTicket?.id,
      event_type: RTS,
      reference_ticket: getArrayFromArrayOfObject(selectedReferenceTicket, 'id'),
    };

    const validation = validate(ADD_REFERENCE_TICKET, params)

    if (ifObjectExist(validation)) {
      dispatch(
        addTicketEvent({
          params,
          onSuccess: (response: any) => () => {
     
            console.log("==========>>>>",response)
            if (response.success) {
              goBack()
              showToast(response.message, "success");
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


  const onSelectedTicket = (item: any) => {

    let updatedSelectedReferenceTicket: any = [...selectedReferenceTicket];

    const ifExist = updatedSelectedReferenceTicket.some(
      (el: any) => el.id === item?.id
    );
    if (ifExist) {
      updatedSelectedReferenceTicket = updatedSelectedReferenceTicket.filter(
        (filterItem: any) => filterItem.id !== item?.id
      );
    } else {
      updatedSelectedReferenceTicket = [...updatedSelectedReferenceTicket, item];
    }

    setSelectedReferenceTicket(updatedSelectedReferenceTicket);
  };



  const getTicketsApiHandler = (page_number: number, q_many: string = search.value) => {
    const params = {
      q_many,
      page_number,
      
    };


    dispatch(
      getTickets({
        params,
        onSuccess: (response) => () => {
          console.log('====>getTickets',response)
        },
        onError: () => () => { },
      })
    );
  };



  const normalizedTableData = (data: any) => {

    return data?.map((el: any) => {

      const isReference = selectedReferenceTicket.some(
        (element: any) => element.id === el?.id
      );

      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.tickets_status),
        "assigned to": el?.assigned_to.name,
        phone: el.by_user?.phone,
        email: el.by_user?.email,
        '': <Checkbox id={el.id} onCheckChange={() => onSelectedTicket(el)} defaultChecked={isReference} />,
      };
    });
  };


  // console.log( "=====>>>", (getTickets) );


  return (
    <HomeContainer type={'card'} className="vh-100 m-3">
      <div  >
        <div className="row justify-content-between m-3">
          <Back />
          <div className="row ">
            <SearchInput onSearch={(text) => {
              getTicketsApiHandler(INITIAL_PAGE, text)
            }} />

            <Button className="ml-3" size={'sm'} text={'Submit'} onClick={addReferenceTicketHandler} />
          </div>
        </div>

        <div>
          {tickets && tickets.length > 0 ? <CommonTable title={'Tickets'}
            isPagination
            tableDataSet={tickets}
            currentPage={referenceTicketCurrentPages}
            noOfPage={referenceTicketNoOfPages}
            displayDataSet={normalizedTableData(tickets)}
            paginationNumberClick={(currentPage) => {
              getTicketsApiHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getTicketsApiHandler(paginationHandler("prev", referenceTicketCurrentPages))
            }
            }
            nextClick={() => {
              getTicketsApiHandler(paginationHandler("next", referenceTicketCurrentPages));
            }
            }
          /> : <div className={'d-flex justify-content-center align-items-center'} style={{ height: '70vh' }}><NoDataFound text={'No text found'} /></div>}
        </div>
      </div>
    </HomeContainer >
  );
}

export { AddReferenceTicket };
