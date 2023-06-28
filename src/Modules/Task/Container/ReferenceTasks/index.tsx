import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTasks, selectedTaskId, setSelectedTask } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { NoDataFound, Card, CommonTable, Button, Spinner } from "@Components";
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'
import { useParams } from 'react-router-dom';
import { translate } from "@I18n";


function ReferenceTasks() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { referencesTasks, referencesTasksNumOfPages, referencesTasksCurrentPages } = useSelector(
    (state: any) => state.TaskReducer
  );

  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { goTo } = useNavigation()
  const { height } = useWindowDimensions()


  useEffect(() => {
    proceedgetReferenceTasks(referencesTasksCurrentPages);
  }, [id]);


  
  console.log("reference task----------->",referencesTasks)

  const proceedgetReferenceTasks = (page_number: number) => {

    const params = {
      page_number,
      code: id,
      q: ""
    };

    dispatch(
      getReferenceTasks({
        params,
        onSuccess: (response) => () => {
        },
        onError: () => () => {

        },
      })
    );
  }


  const normalizedTableData = (data: any) => {

    console.log("reference task----------->",data)


    if (data && data.length > 0) {
      return data?.map((el: any) => {
        return {
          issue: el.title,
          "raised by": el?.by_user.name,
          status: getStatusFromCode(dashboardDetails, el.task_status),
          "raised by company": el?.raised_by_company?.name
        };
      });

    }
  };



  return (

    <Card className={'overflow-auto overflow-hide mb--1'} style={{ height: height - 15 }}>
      {referencesTasks && referencesTasks?.length > 0 && <div className="col text-right">
        <Button size={'sm'} className={'text-white'} text={translate("auth.addReferenceTask")} onClick={() => {
          dispatch(setSelectedTask(id))

          goTo(ROUTES["task-module"]["reference-task"])
          
        }} />
      </div>
      }

      {referencesTasks && referencesTasks?.length > 0 ?


        <CommonTable
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
          tableOnClick={(index,id,item) => {
            console.log(item.code)
            dispatch(setSelectedTask(item?.code))
           dispatch(selectedTaskId(item))
            goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.code)
          }}

        />
        : <div className="d-flex h-100 justify-content-center align-items-center"><NoDataFound buttonText={translate("auth.addReferenceTask")!} onClick={() => goTo(ROUTES["task-module"]["reference-task"])} isButton /></div>}
    </Card>


  );
}
export { ReferenceTasks };
