import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Divider, } from "@Components";
import { UserItem } from "@Modules";
import { getTicketUsers } from "@Redux";
import { useWindowDimensions } from "@Hooks";
import { useParams } from 'react-router-dom'
import { translate } from "@I18n";

function TicketUsers() {
  const { id } = useParams();
  const dispatch = useDispatch();
 // const { height } = useWindowDimensions()
  const { ticketUsers, refreshTicketEvents } = useSelector((state: any) => state.TicketReducer);

  useEffect(() => {
    getTicketUserApi();
  }, [id, refreshTicketEvents]);


  function getTicketUserApi() {
    const params = {
      code: id,
    };

    dispatch(
      getTicketUsers({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }



  return (
    <div className={'overflow-auto overflow-hide'}>
      {ticketUsers && ticketUsers.length > 0 && <div>
        <div>
          <h5 className="text-muted mt-4">{translate("course.ASSIGNED TO ")}</h5>
        </div>
        {ticketUsers[0].assigned_to &&
          <Card className="mt-1 py-2 shadow-none" >
            <UserItem item={ticketUsers[0].assigned_to} />
          </Card>}

        {ticketUsers && <> <div>
          <h5 className="text-muted">{translate('course.ASSIGNED BY')}</h5>
        </div>

          <Card className={"mt-1 py-2 shadow-none"} >
            <UserItem item={ticketUsers[0].created_by} />
          </Card></>}

        {ticketUsers && ticketUsers[0].tagged_to.length > 0 && <> <div>
          <h5 className="text-muted">{translate("course.INVOLVED USER")}</h5>
        </div>
          <Card className="mt-1 py-2 shadow-none" >
            {ticketUsers &&
              ticketUsers[0].tagged_to.length > 0 &&
              ticketUsers[0].tagged_to?.map((user: any, index: number) => {
                return (
                  <>
                    <UserItem item={user} />
                    {index !== ticketUsers[0].tagged_to?.length - 1 && <Divider space={"4"} />}
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

