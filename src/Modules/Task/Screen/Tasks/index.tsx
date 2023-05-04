import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, HomeContainer, NoDataFound } from "@Components";
import { TaskGroups, TaskFilter } from '@Modules'
import { CommonTable, Image, Priority, Status } from '@Components'
import { paginationHandler, getPhoto, getDisplayDateTimeFromMoment, getMomentObjFromServer, capitalizeFirstLetter, getDates } from '@Utils'
import { getTasks, setSelectedTask, getDashboard, setSelectedTabPosition } from '@Redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { translate } from '@I18n'


const DEFAULT_PARAMS = {
  q_many: "",

  "tasks_by": "assigned_to",

  "task_status": "INP",
  "priority": "ALL",
  "group": "ALL",
  "include_subtask": false,
  page_number: 1
}

function Tasks() {
  const DEFAULT_PARAMS = { q_many: "", "tasks_by": "assigned_to", "task_status": "INP", "priority": "ALL", "group": "ALL", "include_subtask": false, page_number: 1 }
  const dispatch = useDispatch()
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const { tasks, taskNumOfPages, taskCurrentPages, selectedTask } = useSelector((state: any) => state.TaskReducer);
  const { goTo } = useNavigation();

  useEffect(() => {
    getTaskHandler(taskCurrentPages)
  }, [params])






  useEffect(() => {
    getDashboardDetails()
  }, [selectedTask])


  function getDashboardDetails() {
    const params = {}
    dispatch(getDashboard({
      params,
      onSuccess: (response) => () => {


      },
      onError: () => () => { }
    }));
  }

  const getTaskHandler = (page_number: number) => {
    const updatedParams = { ...params, page_number }

    dispatch(
      getTasks({
        params: updatedParams,
        onSuccess: () => () => {
        },
        onError: () => () => {
        },
      })
    );
  };



  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0)
      return data?.map((el: any) => {

        return {
          "task":
            <>
              <div className="row">
                <Priority priority={el?.priority} />
                <div>
                  <span>{capitalizeFirstLetter(el?.title)}</span>
                  <div className="pt-1">
                    {el.parent && el.parent?.name && <div>{el.parent?.name}
                    </div>
                    }
                  </div>
                </div>
              </div>
            </>,

          "attachments":
            <div className="row avatar-group">
              {
                el?.task_attachments &&
                el?.task_attachments.length > 0 && el?.task_attachments.map((item) => {
                  return (
                    <Image
                      variant={'avatar'}
                      src={getPhoto(item?.attachment_file)}
                    />
                  )
                })
              }

            </div >,
          "raised by":
            <div className="h5 m-0"> {el?.by_user?.name} </div>,
          "raised to":
            <div className="row">
              {el.raised_by_company?.attachment_logo && <Image variant={'rounded'} src={getPhoto(el.raised_by_company?.attachment_logo)} />}
              <div className="ml-2">
                <div className="h5 mb-0"> {el?.raised_by_company?.display_name}</div>
                <div className="h5 mb-0 text-truncate">@<span className="h5"> {el?.assigned_to?.name} </span></div>
                <small className={'text-uppercase mb-0  text-muted'}>{el?.raised_by_company?.place}</small>
              </div>
            </div >,
          'Assigned At': <div>{getDisplayDateTimeFromMoment(getMomentObjFromServer(el.created_at))}</div>,
          status: <div><Status status={el?.task_status} />
            <small>{getDates() > getDates(el.eta_time) ? 'ABOVE ETA' : ""}</small>
          </div>
        };
      });
  };





  return (
    <div className="m-3">
      <div className="row">
        <div className="mx-2 mb--3 col">
          <TaskGroups onClick={(code) => {
            setParams({ ...params, group: code } as any)
          }} />
        </div>

        <div className="col-auto ">
          <Button
            size={'sm'}
            text={translate("common.createTask")}
            onClick={() => {
              goTo(ROUTES["task-module"]["add-task"])
            }
            }

          />

        </div>
      </div>

      <HomeContainer type={'card'} className="mt-3">
        <TaskFilter onParams={(filteredParams) => {
          setParams({ ...params, ...filteredParams })
        }} />
        {tasks && tasks.length > 0 ?
          <CommonTable
            isPagination
            tableDataSet={tasks}
            displayDataSet={normalizedTableData(tasks)}
            noOfPage={taskNumOfPages}
            currentPage={taskCurrentPages}
            paginationNumberClick={(currentPage) => {
              getTaskHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getTaskHandler(paginationHandler("prev", taskCurrentPages))
            }
            }
            nextClick={() => {
              getTaskHandler(paginationHandler("next", taskCurrentPages));
            }
            }
            tableOnClick={(idx, index, item) => {
              dispatch(setSelectedTask(item));
              dispatch(setSelectedTabPosition({ id: '1' }))
              goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.id);
            }
            }
          />
          :
          <NoDataFound type={'action'} buttonText={'Create Task'} onClick={() => { goTo(ROUTES["task-module"]["add-task"]) }} isButton />
        }
      </HomeContainer>
    </div>

  );
}

export { Tasks };