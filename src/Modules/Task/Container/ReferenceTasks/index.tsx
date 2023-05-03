import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTasks, setSelectedTask } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { NoDataFound, Card, CommonTable, Button } from "@Components";
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'

function ReferenceTasks() {
  const dispatch = useDispatch();
  const { height } = useWindowDimensions()

  const { referencesTasks, referencesTasksNumOfPages, referencesTasksCurrentPages, selectedTask } = useSelector(
    (state: any) => state.TaskReducer
  );

  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { goTo } = useNavigation()

  useEffect(() => {
    proceedgetReferenceTasks(referencesTasksCurrentPages);
  }, [selectedTask]);


  const proceedgetReferenceTasks = (page_number: number) => {
    const params = {
      page_number,
      task_id: selectedTask.id,
      q: ""
    };

    dispatch(
      getReferenceTasks({
        params,
        onSuccess: (response) => () => {

        },
        onError: () => () => { },
      })
    );
  }


  const normalizedTableData = (data: any) => {

    return data?.map((el: any) => {
      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.task_status),
        "raised by company": el?.raised_by_company?.name
      };
    });
  };


  return (

    <Card className={'overflow-auto overflow-hide mb--1'} style={{ height: height - 15 }}>
      <div className="col text-right">
        <Button size={'sm'} text={'Add Reference Task'} onClick={() => {
          goTo(ROUTES["task-module"]["reference-task"])
        }} />
      </div>
      {referencesTasks && referencesTasks?.length > 0 ?
        <CommonTable
          isPagination
          tableDataSet={referencesTasks}
          currentPage={referencesTasksCurrentPages}
          noOfPage={referencesTasksNumOfPages}
          displayDataSet={normalizedTableData(referencesTasks)}
          paginationNumberClick={(currentPage) => {
            proceedgetReferenceTasks(paginationHandler("current", currentPage));
          }}
          previousClick={() => {
            proceedgetReferenceTasks(paginationHandler("prev", referencesTasksCurrentPages))
          }
          }
          nextClick={() => {
            proceedgetReferenceTasks(paginationHandler("next", referencesTasksCurrentPages));
          }
          }
          tableOnClick={(e, index, item) => {
            dispatch(setSelectedTask(item))
            goTo(ROUTES["task-module"]["tasks-details"] + '/' + item.id)
          }}

        /> : <div className="d-flex h-100 justify-content-center align-items-center"><NoDataFound buttonText={'Add Reference Task'} onClick={()=> goTo(ROUTES["task-module"]["reference-task"])} isButton/></div>}
    </Card>


  );
}
export { ReferenceTasks };
