import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, otpLoginFailure, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Table, Image, CommonTable } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, getStatusFromCode, paginationHandler, FILTERED_LIST,STATUS_LIST,PRIORITY, getObjectFromArrayByKey, SEARCH_PAGE, COMPANY } from "@Utils";
import { setSelectedReferenceIssues, setSelectedIssues } from "@Redux";


function Issues() {
  const { goTo } = useNavigation();
  const { dashboardDetails, } = useSelector((state: any) => state.AdminReducer);
  const { tickets, ticketNumOfPages, ticketCurrentPages } = useSelector((state: any) => state.CompanyReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTickets = useDropDown(FILTERED_LIST[0])
  const ticketStatus = useDropDown(STATUS_LIST[0])
  const ticketPriorty = useDropDown({})
  const { isSync } = useSelector((state: any) => state.AppReducer);

  

  useEffect(() => {
   
    
    if (!isSync.issues) {
      getTicketHandler(ticketCurrentPages)
    }
  }, [isSync])


  const getTicketHandler = (pageNumber: number) => {

    const params = {
      q: "",
      q_many: search.value,
      tickets_by: filteredTickets?.value.id,
      ticket_status: ticketStatus?.value.id,
      page_number: pageNumber
    };
    dispatch(
      getTickets({
        params,
        onSuccess: () => () => {
          setSyncTickets(true)
        },
        onError: () => () => { },
      })
    );
  };

  function setSyncTickets(sync = false) {
    dispatch(
      setIsSync({
        ...isSync,
        issues: sync,
      })
    );
  }

  function proceedTickerSearch() {
    setSyncTickets()
    getTicketHandler(SEARCH_PAGE)
  }

  console.log("Priorty",ticketPriorty.value)

  function Priority({ priority }) {
    const color = getObjectFromArrayByKey(PRIORITY, 'id', priority).color
    return <div className="row mb-0 align-items-center">
      <div style={{
        height: 10, width: 10, borderRadius: 5, background: color
      }}>
      </div>
      <span className="ml-2">{getObjectFromArrayByKey(PRIORITY, 'id', priority).text}</span>
    </div>
  }

  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
        issue: el.title,
        attachments: <Image variant={'rounded'} src={getPhoto(el?.raised_by_company.attachment_logo)} />,
        "raised by": el?.by_user.name,
        "priority": <Priority priority={el?.priority} />,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "assigned to": el?.assigned_to?.name,
        'phone': el?.raised_by_company?.phone,
        'email': el?.raised_by_company?.email,
        company: el?.raised_by_company?.display_name,
        address: el?.raised_by_company?.address
      };
    });
  };



  return (
    <>
      <HomeContainer isCard >
        <div className="row mt-3">
          <div className="col-lg-4  col-md-3 col-sm-12">
            <InputHeading heading={translate("common.issueName")} />
            <div className="input-group bg-white border">
              <input
                type="text"
                className="form-control bg-transparent border border-0"
                placeholder={translate("auth.search")!}
                value={search.value}
                onChange={search.onChange}
              />
              <span
                className="input-group-text  border border-0"
                onClick={proceedTickerSearch}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-search" />
              </span>
            </div>
          </div>


          <div className="col-lg-4 col-md-3 col-sm-12 ">
            <DropDown
              heading={translate("common.filterTickets")}
              selected={filteredTickets.value}
              data={FILTERED_LIST}
              value={filteredTickets.value}
              onChange={(item) => {
                filteredTickets.onChange(item)
                setSyncTickets()
              }}
            />
          </div>

          <div className="col-lg-4 col-md-3 col-sm-12">
            <DropDown
              heading={translate("common.ticketStatus")}
              data={STATUS_LIST}
              selected={ticketStatus.value}
              value={ticketStatus.value}
              onChange={(item) => {
                console.log(item)
                ticketStatus.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12">
            <DropDown
              heading={'Priorty'}
              data={PRIORITY}
              selected={ticketPriorty.value}
              value={ticketPriorty.value}
              onChange={(item) => {
                ticketPriorty.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12">
            <DropDown
              heading={'internal'}
              data={COMPANY}
              selected={ticketStatus.value}
              value={ticketStatus.value}
              onChange={(item) => {
                ticketStatus.onChange(item)
                setSyncTickets()
              }}
            />
          </div>

          <div className="col text-right mt-5">
            <Button
              size={"sm"}
              text={translate("common.createTicket")}
              onClick={() => {
                goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_TICKET);
              }}
            />
          </div>
        </div>
      </HomeContainer>

      {tickets && tickets.length > 0 &&
        <>

          <CommonTable
            isPagination
            title="Issue"
            tableDataSet={tickets}
            displayDataSet={normalizedTableData(tickets)}
            noOfPage={ticketNumOfPages}
            currentPage={ticketCurrentPages}
            paginationNumberClick={(currentPage) => {
              getTicketHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getTicketHandler(paginationHandler("prev", ticketCurrentPages))
            }
            }
            nextClick={() => {
              getTicketHandler(paginationHandler("next", ticketCurrentPages));
            }
            }
            tableOnClick={(idx, index, item) => {
              dispatch(setSelectedIssues(item));
              dispatch(setSelectedReferenceIssues(undefined))
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_DETAILS);
            }
            }
          />
        </>

      }

    </>
  );
}

export { Issues };