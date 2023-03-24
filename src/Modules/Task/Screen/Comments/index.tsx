import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubTasks, setIsSync } from "@Redux";
import { NoDataFound, Card, Image, CommonTable, Priority } from "@Components";
import { getPhoto } from "@Utils";


function Comments() {
  const { subTasks, taskItem } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getSubTaskHandler()
  }, [])

 


  const getSubTaskHandler = () => {
    const params = {
      task_id: taskItem?.id
    }

    dispatch(
      getSubTasks({
        params,
        onSuccess: (response) => () => {

          // setSyncTickets(true)
        },
        onError: () => () => { },
      })
    );
  };

  // function setSyncTickets(sync = false) {
  //   dispatch(
  //     setIsSync({
  //       ...isSync,
  //       tasks: sync,
  //     })
  //   );
  // }

  const normalizedTableData = (data: any) => {
    console.log('normalizedTableData', JSON.stringify(data));

    return data.map((el: any) => {
    

      return {
        "Sub task": <div className="row m-0 overflow-auto overflow-hide"> <Priority priority={el?.priority} /> <span className="ml-2">{el?.title}</span></div>,
      };
    });
  };

  return (
    <>

      {subTasks && subTasks.data.length > 0 ?
        <>
          <div className={'d-flex justify-content-end'} style={{ height: '82.3vh' }}>
            <Card className={'col-4 overflow-auto overflow-hide'}>
              <div className={'mx--5'}>
              <CommonTable
                title="SUB TASKS"
                tableDataSet={subTasks?.data}
                displayDataSet={normalizedTableData(subTasks?.data)}
              />
              </div>
            </Card>
          </div>
        </>
        : <NoDataFound />
      }

    </>
  );
}

export { Comments };