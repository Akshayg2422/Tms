import { HomeContainer, NoDataFound, Table } from "@Components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTickets, setIsSync } from "@Redux";
import { getStatusFromCode } from "@Utils";

function ReferenceTickets() {
  const dispatch = useDispatch();
  const { issueReferenceDetails } = useSelector(
    (state: any) => state.CompanyReducer
  );
  const { selectedIssues, selectedReferenceIssues, dashboardDetails } = useSelector(
    (state: any) => state.AdminReducer
  );

  useEffect(() => {
    proceedgetReferenceTickets();
  }, [selectedReferenceIssues]);


  const proceedgetReferenceTickets = () => {
    const params = {
      id: selectedReferenceIssues
        ? selectedReferenceIssues?.id
        : selectedIssues?.id,
      q: "",
    };

    dispatch(
      getReferenceTickets({
        params,
        onSuccess: () => () => { },
        onFailure: () => () => { },
      })
    );
  }


  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.ticket_status),
        "assigned to": el?.assigned_to.name,
        phone: el?.by_user.phone,
        email: el?.by_user.email
      };
    });
  };

  return (


    <HomeContainer isCard title={"Reference Details"}>
      {issueReferenceDetails && issueReferenceDetails?.data?.length > 0 ?
        <Table displayDataSet={normalizedTableData(issueReferenceDetails?.data)} tableOnClick={(e, index, item) => {
          const selectedItem = issueReferenceDetails.data?.[index]
        }} /> : <NoDataFound />}
    </HomeContainer>


  );
}

export { ReferenceTickets };
