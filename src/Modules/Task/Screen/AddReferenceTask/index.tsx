import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEvent, getTasks} from "@Redux";
import { NoDataFound, CommonTable, Checkbox, showToast, HomeContainer, SearchInput, Button, Back, Spinner, InputHeading } from "@Components";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { RTS, getStatusFromCode, getArrayFromArrayOfObject, validate, ifObjectExist, getValidateError, ADD_REFERENCE_TASK, paginationHandler, SEARCH_PAGE, INITIAL_PAGE } from "@Utils";
import { translate } from "@I18n";
import { useParams } from "react-router-dom";


function AddReferenceTask() {

  const dispatch = useDispatch();

  const { tasks,  referencesTasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.TaskReducer);
  const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  const [selectedReferenceTask, setSelectedReferenceTask] = useState([...referencesTasks])
  const { goBack } = useNavigation();
  const [loading, setLoading] = useState(false)
  const search = useInput("");
  const loginLoader = useLoader(false);

  const isEnterPressed = useKeyPress("Enter");

  useEffect(() => {
    if (isEnterPressed) {
      addReferenceTaskHandler()
    }
  }, [isEnterPressed]);

 
  const {selectedTaskStatus } = useSelector((state: any) => state.TaskReducer);
  useEffect(() => {
    getTasksApiHandler(taskCurrentPages)
  }, [])
  const addReferenceTaskHandler = () => {

    const params = {
      code: selectedTaskStatus[0]?.code,
      event_type: RTS,
      reference_task: getArrayFromArrayOfObject(selectedReferenceTask, 'id'),
    };

    const validation = validate(ADD_REFERENCE_TASK, params)
    if (ifObjectExist(validation)) {
      loginLoader.show()
      dispatch(
        addTaskEvent({
          params,
          onSuccess: (response: any) => () => {

            if (response.success) {
         
              goBack()
            
              loginLoader.hide()
              showToast(response.message, "success");
            }
            // setLoading(false)
          },
          onError: (error) => () => {
            loginLoader.hide()
            showToast(error.error_message);

          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));
    }
  };





  const onSelectedTask = (item: any) => {

    let updatedSelectedReferenceTask: any = [...selectedReferenceTask];

    const ifExist = updatedSelectedReferenceTask.some(
      (el: any) => el.id === item?.id
    );
    if (ifExist) {
      updatedSelectedReferenceTask = updatedSelectedReferenceTask.filter(
        (filterItem: any) => filterItem.id !== item?.id
      );
    } else {
      updatedSelectedReferenceTask = [...updatedSelectedReferenceTask, item];
    }

    setSelectedReferenceTask(updatedSelectedReferenceTask);
  };



  const getTasksApiHandler = (page_number: number, q_many: string = search.value) => {
    setLoading(true)
    const params = {
      q_many,
      page_number,
      task_code: selectedTaskStatus[0]?.code,
    };

    dispatch(
      getTasks({
        params,
        onSuccess: () => () => {
          setLoading(false)
        },
        onError: () => () => {
          setLoading(false)
        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {

      const isReference = selectedReferenceTask.some(
        (element: any) => element.id === el?.id
      );

      return {
        task: el?.title,
        "raised by": el?.by_user?.name,
        status: getStatusFromCode(dashboardDetails, el?.task_status),
        "assigned to": el?.assigned_to?.name,
        phone: el.by_user?.phone,
        email: el.by_user?.email,
        '': <Checkbox id={el.id} onCheckChange={() => onSelectedTask(el)} defaultChecked={isReference} />,
      };
    });
  };

  return (
    <HomeContainer type={'card'} className="m-3" >
      <div >

        <div className="row justify-content-between m-3">
        <div className={'row col'}> <div className={'mr-2'}>
        <Back />
          </div>
          <div>
            <h3>Add ReferenceTask</h3>

          </div>
</div> 
          <div className="row ">
            <SearchInput onSearch={(text) => {
              getTasksApiHandler(INITIAL_PAGE, text)
            }} />

            <Button className="ml-3 mr-3" size={'sm'} text={translate("common.submit")}
              loading={loginLoader.loader}
             onClick={addReferenceTaskHandler} />
          </div>
        </div>

        <div>
          {
            loading && (
              <div className="d-flex justify-content-center align-item-center" style={{ minHeight: '200px', marginTop: '250px' }}>
                <Spinner />
              </div>
            )
          }
          {!loading && tasks && tasks.length > 0 ? <CommonTable title={translate("auth.task")}
            isPagination
            tableDataSet={tasks}
            currentPage={taskCurrentPages}
            noOfPage={taskNumOfPages}
            displayDataSet={normalizedTableData(tasks)}
            paginationNumberClick={(currentPage) => {
              getTasksApiHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getTasksApiHandler(paginationHandler("prev", taskCurrentPages))
            }
            }
            nextClick={() => {
              getTasksApiHandler(paginationHandler("next", taskCurrentPages));
            }
            }
          /> : <div className={'d-flex justify-content-center align-items-center'} style={{ height: '70vh' }}><NoDataFound text={translate("auth.noTextFound")!} /></div>}
        </div>
      </div>
    </HomeContainer >
  );
}

export { AddReferenceTask };
