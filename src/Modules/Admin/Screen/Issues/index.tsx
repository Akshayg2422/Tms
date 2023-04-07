import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssociatedCompanyBranch, getTickets, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, InputHeading, Image, CommonTable, Priority, Status, NoTaskFound } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler, FILTERED_LIST, STATUS_LIST, PRIORITY_DROPDOWN_LIST, PRIORITY_DROPDOWNICON_LIST, SEARCH_PAGE, COMPANY_TYPE, getMomentObjFromServer, getDisplayDateTimeFromMoment } from "@Utils";
import { setSelectedReferenceIssues, setSelectedIssues } from "@Redux";
import { log } from "console";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { icons } from "@Assets";



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
  const [modifiedCompanyDropDownData, setModifiedCompanyDropDownData] = useState();
  const [basicTag, setBasicTag] = useState(true)
  const [advanceTag, setAdvanceTag] = useState(false)

  const getCompanyBranchDropdown = (details: any) => {
    let companies: any = [];
    companies.push({ id: '', text: "Self" })

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
        'Assigned At': getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at)),
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
        <div className={'row'}>
          <h3 className={'col-11'}>Issues</h3>
          <div className={'pl-4'}>
            <UncontrolledDropdown>
              <DropdownToggle
                color=""
                size="sm"
                className="text-light"
              >
                <Image src={icons.Equalizer} className="bg-white" variant={'avatar'} size={'xs'} />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  href="#pablo"
                  onClick={() => {

                    setBasicTag(true)
                    setAdvanceTag(false)
                  }}
                >
                  <div className={basicTag ? 'text-primary' : 'text-black'}>
                    {translate('auth.basic')}
                  </div>
                </DropdownItem>

                <DropdownItem
                  href="#pablo"
                  onClick={() => {
                    setAdvanceTag(true)
                    setBasicTag(false)
                  }}
                >
                  <div className={advanceTag ? 'text-primary' : 'text-black'}>
                    {translate('auth.advance')}
                  </div>
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="row mb--3">
          <div className="col-lg-3  col-md-3 col-sm-12">
            <InputHeading heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.codeTitle")}</h4>} />
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
          <div className="col-lg-3 col-md-3 col-sm-12 ">
            <DropDown
              className="form-control-sm"
              heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.assignedTo")}</h4>}
              selected={filteredTickets.value}
              data={FILTERED_LIST}
              value={filteredTickets.value}
              onChange={(item) => {
                filteredTickets.onChange(item)
                setSyncTickets()
              }}
            />
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12">
            <DropDown
              className="form-control-sm"
              heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.ticketStatus")}</h4>}
              data={STATUS_LIST}
              selected={ticketStatus.value}
              value={ticketStatus.value}
              onChange={(item) => {
                ticketStatus.onChange(item)
                setSyncTickets()
              }}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <DropDown
              className="form-control-sm"
              heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.Priority")}</h4>}
              data={PRIORITY_DROPDOWNICON_LIST}
              selected={ticketPriority.value}
              value={ticketPriority.value}
              onChange={(item) => {
                ticketPriority.onChange(item)
                setSyncTickets()
              }}
            />

          </div>
          {
            advanceTag && <div className="col-lg-3 col-md-3 col-sm-12 mt--2">
              <DropDown
                className="form-control-sm"
                heading={<h4 className={'mb--2'} style={{ fontSize: "12px" }}>{translate("common.company")}</h4>}
                data={modifiedCompanyDropDownData}
                selected={companyType.value}
                value={companyType.value}
                onChange={(item) => {
                  companyType.onChange(item)
                  setSyncTickets()
                }}
              />
            </div>
          }
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
        </> : <div ><NoTaskFound text={'No Ticket Found'} />
          <div className="text-center">
            <Button
              size={"sm"}
              text={translate("common.addTicket")}
              onClick={() => {
                goTo(HOME_PATH.DASHBOARD + HOME_PATH.ISSUE_TICKET);
              }}
            />
          </div>

        </div>}

    </>
  );
}

export { Issues };