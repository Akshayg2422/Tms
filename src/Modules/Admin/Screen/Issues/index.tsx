import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, setIsSync } from "@Redux";
import { HomeContainer, Button, DropDown, NoDataFound, InputHeading } from "@Components";
import { TicketItem } from "@Modules";
import { useDropDown, useInput } from "@Hooks";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { FILTERED_TICKET_LIST, ISSUES_LIST } from "@Utils";

function Issues() {
  const { goTo } = useNavigation();
  const { tickets } = useSelector((state: any) => state.CompanyReducer);
  const dispatch = useDispatch();
  const search = useInput("");
  const filteredTickets = useDropDown(FILTERED_TICKET_LIST[0])
  const ticketStatus = useDropDown(ISSUES_LIST[0])


  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    getTicketHandler()

  }, [ticketStatus.value]);

  useEffect(() => {
    if (!isSync.issues) {
      const params = { tickets_by: filteredTickets?.value?.id };
      dispatch(
        getTickets({
          params,
          onSuccess: () => () => { },
          onError: () => () => { },
        })
      );
    }
  }, [filteredTickets.value])

  const getTicketHandler = () => {

    if (!isSync.issues) {
      if (ticketStatus.value.id === "") {

        const params = { q: "" };
        dispatch(
          getTickets({
            params,
            onSuccess: () => () => {

              dispatch(
                setIsSync({
                  ...isSync,
                  issues: true,
                })
              );
            },
            onError: () => () => { },
          })
        );
      } else {
        const params = { ticket_status: ticketStatus?.value?.id };
        dispatch(
          getTickets({
            params,
            onSuccess: () => () => { },
            onError: () => () => { },
          })
        );
      }
    }


  };

  const getSearchHandler = () => {
    const params = { q_many: search.value };
    dispatch(
      getTickets({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };


  return (
    <>

      <div className="row m-0 mt-3">
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
              onClick={getSearchHandler}
              style={{ cursor: "pointer" }}
            >
              {" "}
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
              dispatch(
                setIsSync({
                  ...isSync,
                  issues: false,
                })
              );
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

              dispatch(
                setIsSync({
                  ...isSync,
                  issues: false,
                }));

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

      <HomeContainer isCard title={"Issues"}>
        {tickets && tickets?.data?.length > 0 ? tickets?.data?.map((eachTickets: any, index: number) => {
          const divider = tickets?.data?.length - 1 !== index;
          return (
            <TicketItem item={eachTickets} key={index} divider={divider} />
          );
        }) : <NoDataFound />}
      </HomeContainer>
    </>
  );
}

export { Issues };



