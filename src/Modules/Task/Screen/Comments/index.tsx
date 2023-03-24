import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubTasks, setIsSync } from "@Redux";
import { NoDataFound, Card, Image, CommonTable } from "@Components";
import { getPhoto } from "@Utils";


function Comments() {
  const { subTasks, taskItem } = useSelector((state: any) => state.AdminReducer);
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getSubTaskHandler()
  }, [])

  // console.log('subTaskssubTasks', subTasks);


  const getSubTaskHandler = () => {
    const params = {
      task_id: taskItem?.id
    }

    dispatch(
      getSubTasks({
        params,
        onSuccess: (response) => () => {
          console.log('response',response);
          
          // setSyncTickets(true)
        },
        onError: () => () => { },
      })
    );
  };

  // function setSyncTickets(sync = false) {
  //   dispatch(
  //     setIsSync({
  //       ...isSync,
  //       tasks: sync,
  //     })
  //   );
  // }

  const normalizedTableData = (data: any) => {
    // console.log('normalizedTableData', data);

    return data.map((el: any) => {
      // console.log('ellllllllllllllllllllll',JSON.stringify(el));
      
      return {
        title: el?.title,
        description: el?.description,
        task_attachments: <Image variant={'rounded'} src={getPhoto(el?.raised_by_company?.attachment_logo)} />,
        reference_number: el.reference_number,
        eta_time: el.eta_time,
      };
    });
  };

  return (
    <>

      {subTasks && subTasks.data.length > 0 ?
        <>
          <div className={'d-flex justify-content-end'} style={{ height: '82.3vh' }}>
            <Card className={'col-4 overflow-auto overflow-hide'}>
              <CommonTable
                title="Tasks"
                tableDataSet={subTasks?.data}
                displayDataSet={normalizedTableData(subTasks?.data)}
              />
            </Card>
          </div>
        </>
        : <NoDataFound />
      }

    </>
  );
}

export { Comments };