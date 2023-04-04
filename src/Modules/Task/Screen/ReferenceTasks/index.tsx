import { NoDataFound, CommonTable } from "@Components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSync, getReferenceTasks,getReferenceId } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { Card } from "reactstrap";

function ReferenceTasks() {
  const dispatch = useDispatch();
  const { selectedReferenceIssues, dashboardDetails, referencesTasks,
    referencesTasksNumOfPages,
    referencesTasksCurrentPages, taskItem,getReferenceId } = useSelector(
      (state: any) => state.AdminReducer
    );

  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.referenceTickets) {
      proceedgetReferenceTasks(referencesTasksCurrentPages);
    }
  }, [isSync]);


  const proceedgetReferenceTasks = (pageNumber: number) => {
    const params = {
      pageNumber: pageNumber,
      task_id: taskItem?.id,
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
        "assigned to": el?.assigned_to.name,
        phone: el?.by_user.phone,
        email: el?.by_user.email
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
          // title={"Reference Details"}
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
            // dispatch(getReferenceId(item))
          }}

        /> : <NoDataFound />}
    </Card>


  );
}

export { ReferenceTasks };
