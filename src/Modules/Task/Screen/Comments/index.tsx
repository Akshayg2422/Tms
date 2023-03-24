import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubTasks, setIsSync } from "@Redux";
import { NoDataFound, Card, Image, CommonTable, Priority } from "@Components";
import { getPhoto } from "@Utils";
import { CardBody, CardHeader } from "reactstrap";


function Comments() {
  const { subTasks, taskItem } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getSubTaskHandler()
  }, [])

  // console.log('subTaskssubTasks', subTasks);


  const getSubTaskHandler = () => {
    const params = {
      task_id: taskItem?.id
    }

    dispatch(
      getSubTasks({
        params,
        onSuccess: (response) => () => {
          console.log('response', response);

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
          <div className="row" style={{ height: '82.3vh' }}>
            <div className={'col-xl-8 m-0 p-0  overflow-auto overflow-hide'}>
              <CardHeader>
                <h5 className="h3 mb-0">Events</h5>
              </CardHeader>

              <div className="" >
                <div
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  <div className="timeline-block">
                    <span className="timeline-step badge-info">
                      <i className="ni ni-bell-55" />
                    </span>
                    <div className="timeline-content">
                      <div className="d-flex justify-content-start pt-1">
                        <div>
                          <span className="text-muted text-sm font-weight-bold"> New message</span>
                        </div>
                        <div className="pl-5">
                          <small className="text-muted">
                            <i className="fas fa-clock mr-1" />10 hrs ago
                          </small>
                        </div>
                      </div>
                      <h6 className="text-sm mt-1 mb-0">
                        Let's meet at Starbucks at 11:30. Why?
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end" >
                <div
                  className="timeline timeline-two-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  <div className="timeline-block">
                    <div className="timeline-content">
                      <div className="d-flex justify-content-start pt-1">
                        <div className="pr-5">
                          <small className="text-muted">
                            <i className="fas fa-clock mr-1" />10 hrs ago
                          </small>
                        </div>
                        <div>
                          <span className="text-muted text-sm font-weight-bold"> New message</span>
                        </div>
                      </div>
                      <h6 className="text-sm mt-1 mb-0">
                        Let's meet at Starbucks at 11:30. Why?
                      </h6>
                    </div>
                    <span className="timeline-step badge-info">
                      <i className="ni ni-bell-55" />
                    </span>
                  </div>
                </div>
              </div>




            </div>
            <div className={'col-xl-4 overflow-auto overflow-hide'}>
              <div className={'mx--5'}>
                <CommonTable
                  title="SUB TASKS"
                  tableDataSet={subTasks?.data}
                  displayDataSet={normalizedTableData(subTasks?.data)}
                />
              </div>
            </div>
          </div>
        </>
        : <NoDataFound />
      }

    </>
  );
}

export { Comments };