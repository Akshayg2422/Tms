import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CommonTable, Divider, HomeContainer, NoDataFound, Table } from "@Components";
import { UserItem } from "@Modules";
import { getEmployees } from "@Redux";

function IssueUsers() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state: any) => state.CompanyReducer);

  const { selectedIssues, selectedReferenceIssues } = useSelector(
    (state: any) => state.AdminReducer
  );


  useEffect(() => {
    const params = {
      ticket_id: selectedReferenceIssues
        ? selectedReferenceIssues?.raised_by_company?.branch_id
        : selectedIssues?.id,
    };


    dispatch(
      getEmployees({
        params,
        onSuccess: (response) => () => {


        },
        onError: (error) => () => {

        },
      })
    );
  }, [selectedIssues, selectedReferenceIssues]);





  return (

    <HomeContainer>
      {employees && employees.length > 0 && <div>
        <div>
          <h5 className="text-muted">ASSIGNED TO </h5>
        </div>
        {employees[0].assigned_to && <Card className="mt-1 py-2 " >
          <UserItem item={employees[0].assigned_to} />
        </Card>}

        {employees && <> <div>
          <h5 className="text-muted">ASSIGNED BY</h5>
        </div>

          <Card className={"mt-1 py-2"} >
            <UserItem item={employees[0].created_by} />
          </Card></>}


        {employees && <> <div>
          <h5 className="text-muted">INVOLVED USER</h5>
        </div>
          <Card className="mt-1 py-2" >
            {employees &&
              employees[0].tagged_to.length > 0 &&
              employees[0].tagged_to?.map((user: any, index: number) => {
                return (
                  <>
                    <UserItem item={user} />
                    {index !== employees[0].tagged_to?.length - 1 && <Divider space={"4"} />}
                  </>
                );
              })}
          </Card>
        </>
        }

      </div>}
    </HomeContainer>
  );
}
export { IssueUsers };
