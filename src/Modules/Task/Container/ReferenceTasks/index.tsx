import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferenceTasks, getSelectedReference, selectedTaskIds, setSelectedTask } from "@Redux";
import { getStatusFromCode, paginationHandler } from "@Utils";
import { NoDataFound, Card, CommonTable, Button, Spinner } from "@Components";
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'
import { useParams } from 'react-router-dom';
import { translate } from "@I18n";


function ReferenceTasks() {
  const dispatch = useDispatch();
  const { id,item } = useParams();
  const { referencesTasks, referencesTasksNumOfPages, referencesTasksCurrentPages } = useSelector(
    (state: any) => state.TaskReducer
  );

  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const { goTo } = useNavigation()
  const { height } = useWindowDimensions()


  useEffect(() => {
    proceedgetReferenceTasks(referencesTasksCurrentPages);
  }, [id]);



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
      {referencesTasks && referencesTasks?.length > 0 && item!=='reference-task' && <div className="col text-right">
        <Button size={'sm'} className={'text-white'} text={translate("auth.addReferenceTask")} onClick={() => {
          dispatch(setSelectedTask(id))

          goTo(ROUTES["task-module"]["reference-task"])
          
        }} />
      </div>
      }

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
          tableOnClick={(index,id,item) => {
            console.log(item.code)
            dispatch(getSelectedReference(false))
            dispatch(getSelectedReference({code: item?.code,refer:false}))
            dispatch(setSelectedTask(item?.code))
           dispatch(selectedTaskIds(item))
            goTo(ROUTES["task-module"]["tasks-details"] + '/' + item?.code+'/'+'reference-task')
          }}

        />
        :item==="reference-task" ? <div className="d-flex h-100 justify-content-center align-items-center">
          <NoDataFound  
       
        />
        </div>:<div className="d-flex h-100 justify-content-center align-items-center">
          <NoDataFound buttonText={translate("auth.addReferenceTask")!} onClick={() => goTo(ROUTES["task-module"]["reference-task"])} 
        isButton 
        />
        </div>}
    </Card>


  );
}
export { ReferenceTasks };
