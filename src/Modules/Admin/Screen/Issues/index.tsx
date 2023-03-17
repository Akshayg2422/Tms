import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading, Table, Image } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation, useDropDown } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, getStatusFromCode } from "@Utils";
import { FILTERED_TICKET_LIST, ISSUES_LIST } from "@Utils";

function Issues() {
  const { goTo } = useNavigation();
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
  const { tickets } = useSelector((state: any) => state.CompanyReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTickets = useDropDown(FILTERED_TICKET_LIST[0])
  const ticketStatus = useDropDown(ISSUES_LIST[0])
  const { isSync } = useSelector((state: any) => state.AppReducer);



  useEffect(() => {
    getTicketHandler()
  }, [isSync])




  const getTicketHandler = () => {

    const params = { q: "", q_many: search.value, tickets_by: filteredTickets?.value.id, ticket_status: ticketStatus?.value.id };

    if (!isSync.issues) {

      dispatch(
        getTickets({
          params,
          onSuccess: () => () => {
            setSyncTickets(true)
          },
          onError: () => () => { },
        })
      );
    }
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
    getTicketHandler()
  }



  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
       issue: el.title,
        attachments: <Image variant={'rounded'} src={getPhoto(el?.raised_by_company.attachment_logo)} />,
        "raised by": el?.by_user.name,
        "priority": el?.priority,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "assigned to": el?.assigned_to.name,
        company: el?.raised_by_company.display_name,
        address: el?.raised_by_company.address
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


          <div className="col-lg-3 col-md-3 col-sm-12 ">
            <DropDown
              heading={translate("common.filterTickets")}
              selected={filteredTickets.value}
              data={FILTERED_TICKET_LIST}
              value={filteredTickets.value}
              onChange={(item) => {
                filteredTickets.onChange(item)
                setSyncTickets()
              }}
            />
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12">
            <DropDown
              heading={translate("common.ticketStatus")}
              data={ISSUES_LIST}
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

      <HomeContainer isCard title={"Issues"}>
        {tickets && tickets?.data?.length > 0 ? <Table displayDataSet={normalizedTableData(tickets?.data)} /> : <NoDataFound />}
      </HomeContainer>


    </>
  );
}

export { Issues };



