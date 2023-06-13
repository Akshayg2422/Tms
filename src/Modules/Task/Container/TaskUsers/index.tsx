import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, HomeContainer, Divider, NoDataFound, } from "@Components";
import { UserItem } from "@Modules";
import { getTaskUsers } from "@Redux";
import { useWindowDimensions } from "@Hooks";
import { useParams } from 'react-router-dom'

function TaskUsers() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()
  const { taskUsers, refreshTaskEvents } = useSelector((state: any) => state.TaskReducer);

  useEffect(() => {
    getTaskUserApi();
  }, [id, refreshTaskEvents]);


  function getTaskUserApi() {
    const params = {
      code: id,
    };

    dispatch(
      getTaskUsers({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }


  return (
    <div className={'overflow-auto overflow-hide'} style={{ height: height - 15 }}>
      {taskUsers && taskUsers.length > 0 && <div>
        <div>
          <h5 className="text-muted mt-4">ASSIGNED TO </h5>
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

        {taskUsers && taskUsers[0].tagged_to.length > 0 && <> <div>
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

    </div>
  );
}
export { TaskUsers };

