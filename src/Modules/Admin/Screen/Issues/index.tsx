import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssociatedCompanyBranch, getTickets, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Table, Image, CommonTable, Priority, Status, DropDownIcon } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY_DROPDOWN_LIST, SEARCH_PAGE, COMPANY_TYPE, getServerTimeFromMoment, getMomentObjFromServer, getDisplayDateTimeFromMoment } from "@Utils";
import { setSelectedReferenceIssues, setSelectedIssues } from "@Redux";
import { log } from "console";



function Issues() {
  
  const { goTo } = useNavigation();
  const { tickets, ticketNumOfPages, ticketCurrentPages } = useSelector((state: any) => state.CompanyReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTickets = useDropDown(FILTERED_LIST[2])
  const ticketStatus = useDropDown(STATUS_LIST[2])
  const ticketPriority = useDropDown(PRIORITY_DROPDOWN_LIST[0])
  const companyType = useDropDown(COMPANY_TYPE[0])
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] =
  useState();
  const getCompanyBranchDropdown = (details: any) => {

    let companies: any = [];
    companies.push( {id:'',text:"Self"})

    if (details && details.length > 0) {
      details.forEach(({ id, display_name }) => {
        companies = [
          ...companies,
          { id: id, text: display_name, name: display_name },
        ];
      });
      setModifiedCompanyDropDownData(companies);
    } 
  };

  //
  useEffect(() => {
    const params = { q: "" };
    dispatch(
        getAssociatedCompanyBranch({
            params,
            onSuccess: (response: any) => () => {
                dispatch(
                    setIsSync({
                        ...isSync,
                        companies: false,
                    })
                );
                getCompanyBranchDropdown(response.details);

            },
            onError: () => () => {

            },
        })
    );
}, []);

  useEffect(() => {
    if (!isSync.issues) {
      getTicketHandler(ticketCurrentPages)
    }
  }, [isSync])


  const getTicketHandler = (pageNumber: number) => {

    const params = {
      q_many: search.value,
      tickets_by: filteredTickets?.value.id,
      ticket_status: ticketStatus?.value.id,
      company: companyType.value.id,
      priority: ticketPriority.value.id,
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


  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {

        "issue": <div className="row"> <Priority priority={el?.priority} /> <span className="col">{el?.title}</span></div>,
        "attachments":
          <div className="avatar-group" style={{
            width: '87px'
          }}>
            {
              el?.ticket_attachments &&
              el?.ticket_attachments.length > 0 && el?.ticket_attachments.map((item) => {

                return <a className="avatar avatar-md "
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <Image
                    variant={'avatar'}
                    src={getPhoto(item?.attachment_file)} />
                </a>
              })
            }

          </div>,

        "raised by":
          <div className="h5"> {el?.by_user?.name} </div>,
        "raised to":
          <>
            <div className="row">
              <div className="col-3 p-0 align-self-center">
                <div className="col p-0 d-flex justify-content-center"> {el.raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(el.raised_by_company?.attachment_logo)} />} </div>
              </div>

              <div className="col-9 text-truncate">
                <h6>
                  <div className="h5 mb-0"> {el?.raised_by_company?.display_name}</div>
                  <div className="h5 mb-0 d-inline-block text-truncate">@<span className="h5"> {el?.assigned_to?.name} </span></div>
                  <div className={'text-uppercase mb-0  text-muted'}>{el?.raised_by_company?.place || "Gummidipoondi"}</div>
                </h6>
              </div>
              <div className="col"></div>
            </div>

          </>,
        date: getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at)),
        status: <div> <Status status={el?.ticket_status} /> </div>
      };
    });
  };



  return (
    <>
      <HomeContainer>
        <div className="text-right ">
          <Button
            size={"sm"}
            text={translate("common.addTicket")}
            onClick={() => {
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_TICKET);
            }}
          />
        </div>
      </HomeContainer>
      <HomeContainer isCard className={'mb--5'} >
        <h3>Issue</h3>
        <div className="row mb--3">
          <div className="col-lg-4  col-md-3 col-sm-12 ">
            <InputHeading heading={translate("common.issueName")} />
            <div className="input-group bg-white border">
              <input
                type="text"
                className="form-control bg-transparent border border-0 form-control-sm"
                placeholder={translate("auth.search")!}
                value={search.value}
                onChange={search.onChange}
              />
              <span
                className="input-group-text pointer border border-0"
                onClick={proceedTickerSearch}
              >
                <i className="fas fa-search" />
              </span>
            </div>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12 ">
            <DropDown
              className="form-control-sm"
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
              className="form-control-sm"
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
              className="form-control-sm"
              heading={'Priority'}
              data={PRIORITY_DROPDOWN_LIST}
              selected={ticketPriority.value}
              value={ticketPriority.value}
              onChange={(item) => {
                ticketPriority.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          <div className="col-lg-4 col-md-3 col-sm-12">
            <DropDown
              className="form-control-sm"
              heading={'Company'}
              data={modifiedCompanyDropDownData}
              selected={companyType.value}
              value={companyType.value}
              onChange={(item) => {
                companyType.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
        </div>
      </HomeContainer>


      {tickets && tickets.length > 0 ?
        <>
          <CommonTable

            isPagination
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
        </> : <NoDataFound />}

    </>
  );
}

export { Issues };