import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEvent, getTasks } from "@Redux";
import { Divider, Button, NoDataFound, CommonTable, Input, Checkbox, showToast, } from "@Components";
import { ReferenceIssueItem } from "@Modules";
import { useInput } from "@Hooks";
import { translate } from "@I18n";
import { RTS, getStatusFromCode, getArrayFromArrayOfObject, validate, ifObjectExist, getValidateError, ADD_REFERENCE_TASK } from "@Utils";

function AddReferenceTask() {
  const dispatch = useDispatch();
  const { tasks, dashboardDetails, taskItem } = useSelector((state: any) => state.AdminReducer);
  const { selectedIssues } = useSelector(
    (state: any) => state.AdminReducer
  );
  const [selectedReferenceTask, setSelectedReferenceTask] = useState([])
  const Search = useInput("");

  console.log('tasks--->', JSON.stringify(tasks))

  const submitHandler = () => {

    const params = {

      id: taskItem?.id,
      event_type: RTS,
      reference_task: getArrayFromArrayOfObject(selectedReferenceTask, 'id'),
    };
    console.log('param-------->', params);


    const validation = validate(ADD_REFERENCE_TASK, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTaskEvent({
          params,
          onSuccess: (response: any) => () => {
            if (response.success) {
              showToast(response.message, "success");
              // goBack();
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

  const getSearchHandler = () => {
    const params = { q_many: Search.value };
    dispatch(
      getTasks({
        params,
        onSuccess: () => () => {},
        onError: () => () => { },
      })
    );
  };

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
                className="input-group-text  border border-0"
                onClick={getSearchHandler}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <i className="fas fa-search" />
              </span>
              <span
                className="input-group-text  border border-0"
                style={{ cursor: "pointer" }}
              >
                {" "}
                All{" "}
              </span>
              <span
                className="input-group-text  bg-transparent border border-0"
                style={{ cursor: "pointer" }}
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



            {tasks && tasks.data?.length > 0 ? <CommonTable title={'Add Reference task'} tableDataSet={tasks.data} displayDataSet={normalizedTableData(tasks.data)}
            /> : <NoDataFound />}

          </div>
        </div>
      </div>
    </div>
  );
}

export { AddReferenceTask };
