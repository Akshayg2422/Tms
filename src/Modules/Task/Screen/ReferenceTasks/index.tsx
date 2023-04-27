import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTasks } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { NoDataFound, Card, CommonTable } from "@Components";


function ReferenceTasks() {
  const dispatch = useDispatch();

  const { referencesTasks,
    referencesTasksNumOfPages,
    referencesTasksCurrentPages, selectedTask } = useSelector(
      (state: any) => state.TaskReducer
    );

  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyR);


  useEffect(() => {
    proceedgetReferenceTasks(referencesTasksCurrentPages);
  }, []);


  const proceedgetReferenceTasks = (page_number: number) => {
    const params = {
      page_number,
      task_id: selectedTask.id,
    };

    dispatch(
      getReferenceTasks({
        params,
        onSuccess: () => () => { },
        onFailure: () => () => { },
      })
    );
  }


  const normalizedTableData = (data: any) => {

    return data.map((el: any) => {
      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.task_status),
        "raised by company": el?.raised_by_company?.name
      };
    });
  };



  return (

    <Card className={'overflow-auto overflow-hide mb--1'} style={{ height: '89vh' }}>
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
            // dispatch(getSelectReferenceId(item))
          }}

        /> : <NoDataFound />}
    </Card>


  );
}
export { ReferenceTasks };
