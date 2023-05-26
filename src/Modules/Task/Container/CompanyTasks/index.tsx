import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeContainer, NoDataFound } from "@Components";
import { TaskGroups, TaskFilter } from '@Modules'
import { CommonTable, Image, Priority, Status } from '@Components'
import { paginationHandler, getPhoto, getDisplayDateTimeFromMoment, getMomentObjFromServer, capitalizeFirstLetter } from '@Utils'
import { getTasks, setSelectedTask } from '@Redux'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { translate } from "@I18n";


function CompanyTasks() {

  const dispatch = useDispatch()
  const { tasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.TaskReducer);
  const { selectedCompany } = useSelector((state: any) => state.UserCompanyReducer);

  const date = new Date();
  const time = date.getHours()

  const { goTo } = useNavigation();

  useEffect(() => {
    getTaskHandler(taskCurrentPages)
  }, [])

  const getTaskHandler = (page_number: number) => {
    const updatedParams = { page_number, branch_id: selectedCompany.branch_id }

    console.log(JSON.stringify(updatedParams) + '=====');

    dispatch(
      getTasks({
        params: updatedParams,
        onSuccess: (response) => () => {

          console.log(JSON.stringify(response) + '=====');

        },
        onError: () => () => { },
      })
    );
  };


  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((el: any) => {
        const etaDate = new Date(el.eta_time)
        let etaTime = etaDate.getHours()
        return {
          "task":
            <>
              <div className="row">
                <Priority priority={el?.priority} />
                <div>
                  <span>{capitalizeFirstLetter(el?.title)}</span>
                  <div className="col pt-2">
                    {el.parent && el.parent?.name && <div>{el.parent?.name}
                    </div>}
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
                      src={getPhoto(item?.attachment_file)} />
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
            <small>{time > etaTime ? 'ABOVE ETA' : ""}</small>
          </div>
        };
      });
  };

  return (
    <HomeContainer type={'card'} className={'100-vh'}>
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
            goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.id);
          }
          }
        />
        : <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}><NoDataFound text={translate("auth.noTaskFound")!} /></div>
      }
    </HomeContainer>
  );
}

export { CompanyTasks };