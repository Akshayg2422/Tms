import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, HomeContainer, Divider, NoDataFound, } from "@Components";
import { UserItem } from "@Modules";
import { getTicketUsers } from "@Redux";
import { useWindowDimensions } from "@Hooks";
import { useParams } from 'react-router-dom'

function TicketUsers() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { selectedTicket, ticketEmployees } = useSelector((state: any) => state.TicketReducer);

  useEffect(() => {
    getTicketUserApi();
  }, [id]);


  function getTicketUserApi() {
    const params = {
      "ticket_id":"414b6c1c-47a3-4674-80fd-be61bc6173de",
    };

    dispatch(
      getTicketUsers({
        params,
        onSuccess: () => () => { 
         console.log('getTicketUsers========>',getTicketUsers)
        },
        onError: () => () => { },
      })
    );
  }

console.log('getTicketUserApi=======>',getTicketUserApi)
  return (
    <div className={'overflow-auto overflow-hide'} style={{ height: height - 15 }}>
      {ticketEmployees && ticketEmployees.length > 0 && <div>
        <div>
          <h5 className="text-muted mt-4">ASSIGNED TO </h5>
        </div>
        {ticketEmployees[0].assigned_to &&
          <Card className="mt-1 py-2 shadow-none" >
            <UserItem item={ticketEmployees[0].assigned_to} />
          </Card>}

        {ticketEmployees && <> <div>
          <h5 className="text-muted">ASSIGNED BY</h5>
        </div>

          <Card className={"mt-1 py-2 shadow-none"} >
            <UserItem item={ticketEmployees[0].created_by} />
          </Card></>}

        {ticketEmployees && ticketEmployees[0].tagged_to.length > 0 && <> <div>
          <h5 className="text-muted">INVOLVED USER</h5>
        </div>
          <Card className="mt-1 py-2 shadow-none" >
            {ticketEmployees &&
              ticketEmployees[0].tagged_to.length > 0 &&
              ticketEmployees[0].tagged_to?.map((user: any, index: number) => {
                return (
                  <>
                    <UserItem item={user} />
                    {index !== ticketEmployees[0].tagged_to?.length - 1 && <Divider space={"4"} />}
                  </>
                );
              })}
          </Card>
        </>
        }

      </div>}

    </div>
  );
}
export { TicketUsers };

