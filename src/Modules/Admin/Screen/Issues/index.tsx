import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, otpLoginFailure, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Table, Image, CommonTable } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, getStatusFromCode, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY, getObjectFromArrayByKey, SEARCH_PAGE, COMPANY } from "@Utils";
import { setSelectedReferenceIssues, setSelectedIssues } from "@Redux";
import { icons } from "@Assets";


function Issues() {
  const { goTo } = useNavigation();
  const { dashboardDetails, } = useSelector((state: any) => state.AdminReducer);
  const { tickets, ticketNumOfPages, ticketCurrentPages } = useSelector((state: any) => state.CompanyReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTickets = useDropDown(FILTERED_LIST[0])
  const ticketStatus = useDropDown(STATUS_LIST[0])
  const ticketPriorty = useDropDown({})
  const company = useDropDown({})
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
      company: company.value.id ? company.value.id : 'ALL',
      priority:ticketPriorty.value.id ? ticketPriorty.value.id:"ALL",
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

 

  function Priority({ priority }) {
    const color = getObjectFromArrayByKey(PRIORITY, 'id', priority).color
    return <div className="row m-0 justify-content-center align-items-center">
      <div style={{
        height: 10, width: 10, borderRadius: 5, background: color
      }}>
      </div>
      <span className="ml-2">{/* {getObjectFromArrayByKey(PRIORITY, 'id', priority).text} */}</span>
    </div>
  }

  function Status({ status }) {
    const color = getObjectFromArrayByKey(STATUS_LIST, 'id', status).color
    return <div className="">
      <span style={{color:color}} className="">{getObjectFromArrayByKey(STATUS_LIST, 'id', status).text} </span>
    </div>
  }


  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
        "": <Priority priority={el?.priority} />,
        issue: el.title,
        attchments:
          <div className="avatar-group" style={{
            width: '130px'
          }}>
            {
              el?.ticket_attachments &&
              el?.ticket_attachments.length > 0 && el?.ticket_attachments.map((item) => {

                return <a className="avatar avatar-md">
                     <Image
                        variant={'avatar'}
                         src={getPhoto(item?.attachment_file)} />
                </a>
              })
            }

          </div>,

        "raised by": <>
          <div> {el?.by_user?.name} </div>
          <div> {el?.by_user?.phone} </div>
          <div>{el?.by_user?.email} </div>
        </>,
        "raised to": < >
          {/* <div> <Image variant={'avatar'} src={getPhoto(el?.raised_by_company.attachment_logo)} /> </div> */}
          <div>{el?.assigned_to?.name}</div>
          <div>{el?.raised_by_company?.phone} </div>
          <div>{el?.raised_by_company?.email} </div>
          <div>{el?.raised_by_company?.display_name}</div>
          <div>{el?.raised_by_company?.address}</div>
        </>,
        status: getStatusFromCode(dashboardDetails, el.ticket_status)
      };
    });
  };



  return (
    <>
      <HomeContainer isCard className={'mb--3'} >
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
              heading={'Company'}
              data={COMPANY}
              selected={company.value}
              value={company.value}
              onChange={(item) => {
                company.onChange(item)
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