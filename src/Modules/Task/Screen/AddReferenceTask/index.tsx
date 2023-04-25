import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEvent, getTasks } from "@Redux";
import { Button, NoDataFound, CommonTable, Checkbox, showToast, Image } from "@Components";
import { useInput, useNavigation } from "@Hooks";
import { translate } from "@I18n";
import { RTS, getStatusFromCode, getArrayFromArrayOfObject, validate, ifObjectExist, getValidateError, ADD_REFERENCE_TASK, paginationHandler, SEARCH_PAGE } from "@Utils";
import { icons } from "@Assets";

function AddReferenceTask() {
  const dispatch = useDispatch();
  const { isSync } = useSelector((state: any) => state.AppReducer);
  const { tasks, dashboardDetails, taskItem, referencesTasks, taskNumOfPages, taskCurrentPages } = useSelector((state: any) => state.AdminReducer);
  const [selectedReferenceTask, setSelectedReferenceTask] = useState([...referencesTasks])
  const { goBack } = useNavigation();
  const Search = useInput("");

  useEffect(() => {
    if (!isSync.tasks) {
      getSearchHandler(taskCurrentPages)
    }
  }, [isSync])
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
    // setSyncTickets()
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
    <div>
      <div className="container mt-4">
        <div className="row justify-content-end">
          <div className="col-lg-5  col-md-12 col-sm-12">
            <div className="input-group bg-white border rounded-pill ">
              <input
                type="text"
                className="form-control bg-transparent border border-0"
                placeholder={translate("auth.search")!}
                value={Search.value}
                onChange={Search.onChange}
              />
              <span
                className="input-group-text pointer border border-0"
                onClick={proceedTaskSearch}
              >
                {" "}
                <i className="fas fa-search" />
              </span>
              <span
                className="input-group-text pointer border border-0"
              >
                {" "}
                All{" "}
              </span>
              <span
                className="input-group-text pointer bg-transparent border border-0"
              >
                <i className="bi bi-chevron-down " />
              </span>
            </div>
          </div>
          <div className="col-lg-2 col-md-12 mt-lg-1 mt-sm-0 mt-md-3 mt-3 col-sm-12  ">
            <Button text={translate("common.submit")} onClick={submitHandler} size="sm" />
          </div>
        </div>
      </div>
      <div>
        <div className="m-3">
          <div className="row justify-content-center">
            {tasks && tasks.data?.length > 0 ? <CommonTable title={
              <div className='row col pt-2 '>
                <div
                  onClick={() => goBack()}
                ><Image
                    size={'sm'}
                    variant='rounded'
                    className='bg-white mt--1  pl-1'
                    src={icons.backArrow} /></div>
                <div className='pl-2'>  <h3>{'Add Reference Task'}</h3>
                </div>
              </div>}
              isPagination
              tableDataSet={tasks.data}
              currentPage={taskCurrentPages}
              noOfPage={taskNumOfPages}
              displayDataSet={normalizedTableData(tasks.data)}
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
      </div>
    </div>
  );
}

export { AddReferenceTask };