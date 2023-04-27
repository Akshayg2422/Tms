import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEvent, getTasks } from "@Redux";
import { NoDataFound, CommonTable, Checkbox, showToast, HomeContainer, SearchInput } from "@Components";
import { useInput, useNavigation, useWindowDimensions } from "@Hooks";
import { translate } from "@I18n";
import { RTS, getStatusFromCode, getArrayFromArrayOfObject, validate, ifObjectExist, getValidateError, ADD_REFERENCE_TASK, paginationHandler, SEARCH_PAGE } from "@Utils";
import { icons } from "@Assets";


function AddReferenceTask() {

  const dispatch = useDispatch();

  const { tasks, dashboardDetails, taskItem, referencesTasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.TaskReducer);
  const [selectedReferenceTask, setSelectedReferenceTask] = useState([...referencesTasks])
  const { goBack } = useNavigation();

  const Search = useInput("");
  const { height, width } = useWindowDimensions()
  useEffect(() => {
    getSearchHandler(taskCurrentPages)
  }, [])


  const submitHandler = () => {

    const params = {
      id: taskItem?.id,
      event_type: RTS,
      reference_task: getArrayFromArrayOfObject(selectedReferenceTask, 'id'),
    };


    const validation = validate(ADD_REFERENCE_TASK, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTaskEvent({
          params,
          onSuccess: (response: any) => () => {

            if (response.success) {
              goBack()
              showToast(response.message, "success");
            }
          },
          onError: (error) => () => {
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

  const getSearchHandler = (pageNumber: any) => {
    const params = {
      q_many: Search.value,
      page_number: pageNumber,
    };

    dispatch(
      getTasks({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => { },
      })
    );
  };

  function proceedTaskSearch() {
    getSearchHandler(SEARCH_PAGE)
  }


  const normalizedTableData = (data: any) => {

    return data.map((el: any) => {

      const isReference = selectedReferenceTask.some(
        (element: any) => element.id === el?.id
      );
      return {
        issue: el.title,
        "raised by": el?.by_user.name,
        status: getStatusFromCode(dashboardDetails, el.tasks_status),
        "assigned to": el?.assigned_to.name,
        phone: el.by_user?.phone,
        email: el.by_user?.email,
        '': <Checkbox id={el.id} onCheckChange={() => onSelectedTask(el)}
          defaultChecked={isReference} />,

      };
    });
  };

  return (
    <HomeContainer type={'card'} className="h-100 m-3">
      <div >
        <div className="row justify-content-end">
          <div className="col-4 mb-3">
            <SearchInput onSearch={() => { }} />
          </div>
        </div>
        <div>
          {tasks && tasks.length > 0 ? <CommonTable title={'Tasks'}
            isPagination
            tableDataSet={tasks}
            currentPage={taskCurrentPages}
            noOfPage={taskNumOfPages}
            displayDataSet={normalizedTableData(tasks)}
            paginationNumberClick={(currentPage) => {
              getSearchHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getSearchHandler(paginationHandler("prev", taskCurrentPages))
            }
            }
            nextClick={() => {
              getSearchHandler(paginationHandler("next", taskCurrentPages));
            }
            }
          /> : <NoDataFound />}
        </div>
      </div>
    </HomeContainer >
  );
}

export { AddReferenceTask };
