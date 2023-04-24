import { NoDataFound, Card, CommonTable } from "@Components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSync, getReferenceTasks, getSelectReferenceId } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";

function ReferenceTasks() {
  const dispatch = useDispatch();
  const { dashboardDetails, referencesTasks,
    referencesTasksNumOfPages,
    referencesTasksCurrentPages, taskItem, getReferenceId, getSubTaskId } = useSelector(
      (state: any) => state.AdminReducer
    );

  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.referenceTickets) {
      proceedgetReferenceTasks(referencesTasksCurrentPages);
    }
  }, [isSync, getReferenceId, getSubTaskId]);


  const proceedgetReferenceTasks = (pageNumber: number) => {
    const params = {
      page_number: pageNumber,
      task_id: getReferenceId ? getReferenceId.id : getSubTaskId ? getSubTaskId.id : taskItem.id,
      q: ""

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
        "raised by company":el?.raised_by_company?.name
      };
    });
  };

  function setSyncCompany(sync = false) {
    dispatch(
      setIsSync({
        ...isSync,
        referenceTickets: sync,
      })
    );
  }

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
            dispatch(getSelectReferenceId(item))
          }}

        /> : <NoDataFound />}
    </Card>


  );
}

export { ReferenceTasks };
