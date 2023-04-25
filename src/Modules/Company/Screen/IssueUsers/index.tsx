import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CommonTable, Divider, HomeContainer, NoDataFound, Table } from "@Components";
import { UserItem } from "@Modules";
import { getEmployees,getTicketUsers} from "@Redux";


function IssueUsers() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state: any) => state.UserCompanyReducer);

  const { selectedIssues, selectedReferenceIssues ,ticketEmployees} = useSelector(
    (state: any) => state.AdminReducer
  );

 
  useEffect(() => {

    const params = {
      ticket_id:
        selectedReferenceIssues
          ? selectedReferenceIssues?.id:
        selectedIssues?.id,
    };

    dispatch(
      getTicketUsers({
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
      {ticketEmployees && ticketEmployees?.details?.data?.length > 0 && <div>
        <div>
          <h5 className="text-muted">ASSIGNED TO </h5>
        </div>
        {ticketEmployees?.details?.data[0]?.assigned_to && 
        <Card className="mt-1 py-2 " >
          <UserItem item={ticketEmployees?.details?.data[0]?.assigned_to} />
        </Card>}

        {ticketEmployees && ticketEmployees?.details?.data[0]?.created_by && <> <div>
          <h5 className="text-muted">ASSIGNED BY</h5>
        </div>

          <Card className={"mt-1 py-2"} >
            <UserItem item={ticketEmployees?.details?.data[0]?.created_by} />
          </Card></>}


        {ticketEmployees && ticketEmployees?.details?.data[0]?.tagged_to?.length > 0 && <> <div>
          <h5 className="text-muted">INVOLVED USER</h5>
        </div>
          <Card className="mt-1 py-2" >
            {ticketEmployees &&
              ticketEmployees?.details?.data[0]?.tagged_to?.length > 0 &&
              ticketEmployees?.details?.data[0]?.tagged_to?.map((user: any, index: number) => {
                return (
                  <>
                    <UserItem item={user} />
                    {index !== ticketEmployees?.details?.data[0].tagged_to?.length - 1 && <Divider space={"4"} />}
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
