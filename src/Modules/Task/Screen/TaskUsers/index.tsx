import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, HomeContainer, Divider, NoDataFound, } from "@Components";
import { UserItem } from "@Modules";
import { getTaskUsers } from "@Redux";

function TaskUsers() {
  const dispatch = useDispatch();
 

  const { taskUsers, taskItem } = useSelector((state: any) => state.AdminReducer);

  useEffect(() => {

    const params = {
      task_id: taskItem.id,
    };

    dispatch(
      getTaskUsers({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }, []);



  return (
    <HomeContainer>
      {taskUsers && taskUsers.length > 0 && <div>
        <div>
          <h5 className="text-muted">ASSIGNED TO </h5>
        </div>
        {taskUsers[0].assigned_to && 
        <Card className="mt-1 py-2 shadow-none" >
          <UserItem item={taskUsers[0].assigned_to} />
        </Card>}

        {taskUsers && <> <div>
          <h5 className="text-muted">ASSIGNED BY</h5>
        </div>

          <Card className={"mt-1 py-2 shadow-none"} >
            <UserItem item={taskUsers[0].created_by} />
          </Card></>}



        {taskUsers && taskUsers[0].tagged_to.length>0 && <> <div>
          <h5 className="text-muted">INVOLVED USER</h5>
        </div>
          <Card className="mt-1 py-2 shadow-none" >
            {taskUsers &&
              taskUsers[0].tagged_to.length > 0 &&
              taskUsers[0].tagged_to?.map((user: any, index: number) => {
                return (
                  <>
                    <UserItem item={user} />
                    {index !== taskUsers[0].tagged_to?.length - 1 && <Divider space={"4"} />}
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
export { TaskUsers };

