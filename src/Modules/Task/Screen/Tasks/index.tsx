import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, HomeContainer, NoDataFound } from "@Components";
import { TaskGroups, TaskFilter } from '@Modules'
import { CommonTable, Image, Priority, Status } from '@Components'
import { paginationHandler, getPhoto, getDisplayDateTimeFromMoment, getMomentObjFromServer, capitalizeFirstLetter, getDates } from '@Utils'
import { getTasks, setSelectedTask, getDashboard, setSelectedTabPosition, taskDefaultParams } from '@Redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { translate } from '@I18n'

function Tasks() {
  const DEFAULT_PARAMS = { q_many: "", "tasks_by": "assigned_to", "task_status": "INP", "priority": "ALL", "group": "ALL", "include_subtask": false, "department_id": "ALL", "designation_id": "ALL", page_number: 1 }
  const dispatch = useDispatch()
  const { tasks, taskNumOfPages, taskCurrentPages, selectedTask, taskFilterParams } = useSelector((state: any) => state.TaskReducer);
  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { company_branch, user_details, company } = dashboardDetails || ''
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const { goTo } = useNavigation();

  useEffect(() => {
    getTaskHandler(taskCurrentPages)
  }, [params])


  useEffect(() => {
    getDashboardDetails()
  }, [selectedTask])


  console.log("default params------------>", taskFilterParams)


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

        const { priority, parent, task_attachments, by_user, raised_by_company, created_at, task_status, eta_time, title, assigned_to } = el

        return {
          "task":
            <>
              <div className="row">
                <Priority priority={priority} />
                <div>
                  <span>{capitalizeFirstLetter(title)}</span>
                  <div className="pt-1">
                    {parent && parent?.name && <div>{parent?.name}
                    </div>
                    }
                  </div>
                </div>
              </div>
            </>,

          "attachments":
            <div className="row avatar-group">
              {
                task_attachments &&
                task_attachments.length > 0 && task_attachments.map((item) => {
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
            <div className="h5 m-0"> {by_user?.name} </div>,
          "raised to":
            <div className="row">

              {company?.name === raised_by_company?.display_name ? '' : raised_by_company?.attachment_logo &&
                <Image variant={'rounded'} src={getPhoto(raised_by_company?.attachment_logo)} />
              }
              <div className="ml-2">
                <div className="h5 mb-0"> {company?.name === raised_by_company?.display_name ? '' : raised_by_company?.display_name}</div>
                <div className={`h5 mb-0 text-truncate ${company?.name === raised_by_company?.display_name ? 'mt--3' : ""} `}>@<span className="h5"> {assigned_to?.name} </span></div>
                <small className={'text-uppercase mb-0  text-muted'}>
                  {raised_by_company?.place}
                </small>
              </div>
            </div >,
          'Assigned At': <div>{getDisplayDateTimeFromMoment(getMomentObjFromServer(created_at))}</div>,
          status: <div><Status status={task_status} />
            <small>{getDates() > getDates(eta_time) ? 'ABOVE ETA' : ""}</small>
          </div>
        };
      });
  };

  return (
    <div className="mx-3 mt-3 ">
      <div className="row">
        <div className="mx-2 mb--3 col">
          <TaskGroups onClick={(code) => {
            setParams({ ...params, group: code } as any)
          }} />
        </div>
      </div>
      <div className="col-auto text-right mt--5">
        <Button
          className="text-white mb-2"
          size={'sm'}
          text={translate("common.createTask")}
          onClick={() => {
            goTo(ROUTES["task-module"]["add-task"])
          }}
        />
      </div>

      <HomeContainer type={'card'} className={'mt-2'}>
        <TaskFilter onParams={(filteredParams) => {
          console.log('filteredParams-------->', filteredParams);

          setParams({ ...params, ...filteredParams })
        }} />
        <div style={{

          marginLeft: "-23px",
          marginRight: "-23px"
        }}>
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
            <NoDataFound type={'action'} buttonText={translate("auth.createTask")!} onClick={() => { goTo(ROUTES["task-module"]["add-task"]) }} isButton />
          }
        </div>
      </HomeContainer>
    </div>

  );
}

export { Tasks };