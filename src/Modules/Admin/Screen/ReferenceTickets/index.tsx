import { Card, HomeContainer, NoDataFound } from "@Components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReferenceIssue } from "@Modules";
import { getReferenceTickets } from "@Redux";

function ReferenceTickets() {
  const dispatch = useDispatch();
  const { issueReferenceDetails } = useSelector(
    (state: any) => state.CompanyReducer
  );
  const { selectedIssues, selectedReferenceIssues } = useSelector(
    (state: any) => state.AdminReducer
  );

  useEffect(() => {
    proceedgetReferenceTickets();

    selectedReferenceIssues? console.log(selectedReferenceIssues?.id,"selectedReferenceIssues?.id") :
    console.log(selectedIssues?.id,"selectedIssues?.id---->");
    
  }, [selectedReferenceIssues]);


  function proceedgetReferenceTickets() {
    const params = {
      id: selectedReferenceIssues
        ? selectedReferenceIssues?.id
        : selectedIssues?.id,
      q: "",
    };
    dispatch(
      getReferenceTickets({
        params,
        onSuccess: () => () => {},
        onFailure: () => () => {},
      })
    );
  }
  return (
    <HomeContainer>
      <Card className="pt-3">
        {issueReferenceDetails && issueReferenceDetails.data.length > 0 ? (
          issueReferenceDetails.data.map(
            (eachReferenceTickets: any, index: number) => {
              const divider = issueReferenceDetails.data.length - 1 !== index;
              return (
                <div>
                  <ReferenceIssue
                    key={eachReferenceTickets.id}
                    item={eachReferenceTickets}
                    divider={divider}
                  />
                </div>
              );
            }
          )
        ) : (
          <NoDataFound />
        )}
      </Card>
    </HomeContainer>
  );
}

export { ReferenceTickets };
