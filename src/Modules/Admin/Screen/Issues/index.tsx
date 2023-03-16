import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, setIsSync } from "@Redux";
import { HomeContainer, Divider, Modal, H, Button, RadioGroup, NoDataFound, Table, Image } from "@Components";
import { useInput } from "@Hooks";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, getStatusFromCode } from "@Utils";

function Issues() {
  const { goTo } = useNavigation();
  const [modal, setModal] = useState(false);
  const { dashboardDetails } = useSelector((state: any) => state.AdminReducer);
  const [issueStatus, setIssueStatus] = useState([["", "All"]].concat(dashboardDetails?.ticket_status));
  const [showIssue, setShowIssue] = useState("All");
  const [statusCode, setStatusCode] = useState("");
  const [isActive, setIsActive] = useState('all');
  const { tickets } = useSelector((state: any) => state.CompanyReducer);
  const dispatch = useDispatch();
  const search = useInput("");

  const { isSync } = useSelector((state: any) => state.AppReducer);
  const filteredTickets = [{ value: 'all', description: translate('common.all') }, { value: 'created_by', description: translate('common.created') }, { value: 'assigned_to', description: translate('common.assigned') }, { value: 'tagged_to', description: translate('common.tagged') }]
  useEffect(() => {
    getTicketHandler();
  }, [showIssue]);

  const getTicketHandler = () => {
    if (!isSync.issues) {
      if (statusCode === "") {

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
        const params = { ticket_status: statusCode };
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

  const filteredTicketHandler = (filtercode) => {
    const params = { tickets_by: filtercode };
    dispatch(
      getTickets({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );

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
        address: el?.raised_by_company.address,
      };
    });
  };

  return (
    <>
      <div className="row m-0 mt-3">
        <div className="col-lg-5 col-sm-0  col-5 ">
          <RadioGroup data={filteredTickets}
            isActive={isActive}
            onButtonClick={
              (value) => {
                console.log("-->", value)
                filteredTicketHandler(value)
                setIsActive(value)

              }}
          />
        </div>
        <div className="col-lg-5 col-md-4 col-sm-12  ml-lg-4">
          <div className="row m-0 ">
            <div className="col-lg-12 col-md-4 col-sm-12  input-group bg-white ">
              <div className="row">
                <div className="col-lg-6 col-sm-0 col-4">
                  <input
                    type="text"
                    className="form-control bg-transparent border border-0 px-0"
                    placeholder={translate("auth.search")!}
                    value={search.value}
                    onChange={search.onChange}
                  />
                </div>
                <div className="col-lg-1 pt-2 col-sm-0 col-1">
                  <span
                    className="input-group-text border-0 pointer px-lg-1 px-sm-0 px-2"
                    onClick={getSearchHandler}
                  >
                    {" "}
                    <i className="fas fa-search" />
                  </span>
                </div>


                <div className="pointer m-0  col-lg-5 col-sm-0 col-6 text-end" onClick={() => setModal(!modal)}>
                  <div className="row">

                    <div className="col-lg-10- col-sm-0 col-8">


                      <span className="input-group-text border-0 ">
                        {" "}
                        {showIssue}{" "}
                      </span>

                    </div>
                    <div className="col-lg-2 col-sm-0 col-1 ">
                      <span className="input-group-text border-0">
                        {" "}
                        <i className="bi bi-chevron-down " />
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col text-right mt-3">
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
        {tickets && tickets?.data?.length > 0 ? <Table displayDataSet={normalizedTableData(tickets?.data)} /> : <NoDataFound />}
      </HomeContainer>

      <Modal
        size={"md"}
        isOpen={modal}
        fade={false}
        onClose={() => setModal(!modal)}
      >
        {issueStatus &&
          issueStatus?.length > 0 &&
          issueStatus?.map((item, index) => {
            return (
              <>
                <H
                  tag="h4"
                  onClick={() => {
                    setShowIssue(item[1]);
                    setStatusCode(item[0]);
                    setModal(!modal);
                    dispatch(
                      setIsSync({
                        ...isSync,
                        issues: false,
                      })
                    );
                  }}
                  text={item[1]}
                  key={index}
                  style={{ cursor: "pointer" }}
                />
                {index !== issueStatus?.length - 1 && <Divider space={"3"} />}
              </>
            );
          })}
      </Modal>
    </>
  );
}

export { Issues };



