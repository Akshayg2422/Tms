import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEvent, getSubTasks, getTaskEvents, setIsSync } from "@Redux";
import { NoDataFound, Card, Image, CommonTable, Priority } from "@Components";
import { TEM, arrayOrderbyCreatedAt, getPhoto } from "@Utils";
import { CardBody, CardHeader } from "reactstrap";
import { useInput } from "@Hooks";
import { TaskChat, SendComments } from "@Modules";


function Comments() {
  const dispatch = useDispatch();
  const { taskEvents } = useSelector((state: any) => state.CompanyReducer);
  const { subTasks, taskItem } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const textMessage = useInput('')

  useEffect(() => {
    ProceedGetTaskEvents()
    getSubTaskHandler()
  }, [])

  console.log('taskEvents', JSON.stringify(taskEvents));

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

  const ProceedGetTaskEvents = () => {
    const params = {
      task_id: taskItem?.id
    }

    dispatch(
      getTaskEvents({
        params,
        onSuccess: (response) => () => { },
        onError: () => () => { },
      })
    );
  };

  let getTaskEventData = arrayOrderbyCreatedAt(taskEvents?.data)
  console.log('getTaskEventData', getTaskEventData);


  const sendMessageHandler = () => {

    if (textMessage) {
      const params = {
        id: taskItem.id,
        message: textMessage.value,
        event_type: TEM
      }

      dispatch(addTaskEvent({
        params,
        onSuccess: () => () => {
          textMessage.set('')
          ProceedGetTaskEvents()
        },
        onFailure: () => () => { }
      }))
    }
  }

  const normalizedTableData = (data: any) => {

    return data.map((el: any) => {

      return {
        "Sub task": <div className="row m-0 overflow-auto overflow-hide"> <Priority priority={el?.priority} /> <span className="ml-2">{el?.title}</span></div>,
      };
    });
  };

  return (
    <>

      <Card className='col-xl-8 mx-1 overflow-auto overflow-hide' style={{ height: '78vh' }}>

        <div className='fixed-bottom col-xl-6 col-sm-12' style={{ cursor: "pointer" }}>
          <SendComments value={textMessage.value}
            onClick={sendMessageHandler}
            onChange={textMessage.onChange}
          />
        </div>
        <div className={'py-5'}>
          {/* {getTaskEventData && getTaskEventData.length > 0 && getTaskEventData.map((el) => {
        return (
            <TaskChat item={el} />
        )
    })} */}
        </div>
      </Card>

      {subTasks && subTasks.data.length > 0 ?
        <>

          <div className="d-flex" style={{ height: '82.9vh' }}>
            <div>
              {/* <TagAssignUser/> */}
              <div className='d-flex justify-content-start'>

              </div>
            </div>
            {/* <Card className={'col-xl-8 mx-1'}>
              <div className="ml-3" >
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
                        <div className="pl-6">
                          <small className="text-muted">
                            <i className="fas fa-clock mr-1" />5 hrs ago
                          </small>
                        </div>
                      </div>
                      <h6 className="text-sm mt-1 mb-0">
                        Let's meet at Starbucks at 11:20. Why?
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className={'d-flex float-right '}>
                <div className="ml-3" >
                  <div
                    className="timeline timeline-one-side"
                    data-timeline-axis-style="dashed"
                    data-timeline-content="axis"
                  >
                    <div className="timeline-block ">
                      <span className="timeline-step badge-info ">
                        <i className="ni ni-bell-55 " />
                      </span>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-start pt-1">
                          <div className="pr-6">
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
                    </div>
                  </div>
                </div>
              </div>
            </Card> */}
            <Card className={'col-xl-4 d-flex justify-content-end mx--2 overflow-auto overflow-hide'}>
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