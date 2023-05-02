import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
  Checkbox,
  Dropzone,
  Image,
  MenuBar,
  DateTimePicker
} from "@Components";
import { translate } from "@I18n";
import {

  getTaskGroup,
  addTaskGroup
} from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, ADD_SUB_TASK_GROUP, stringSlice, stringToUpperCase, INITIAL_PAGE } from "@Utils";
import { useModal, useDynamicHeight, useInput } from "@Hooks";



function TaskGroup() {

  const dispatch = useDispatch();
  const {
    taskGroups,
    taskGroupCurrentPages,
    taskGroupNumOfPages
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );

  const [inCludeSubGroup, setIncludeSubGroup] = useState(false)
  const addTaskGroupModal = useModal(false);

  const taskGroupName = useInput("");
  const taskGroupCode = useInput("");
  const taskGroupDescription = useInput("");
  const [photo, setPhoto] = useState("");
  const [selectedTaskGroup, setSelectedTaskGroup] = useState<any>(undefined);








  const handleStartTimeEtaChange = (value: any) => {
    setStatTimeEta(value)
  };
  const handleEndTimeEtaChange = (value: any) => {

    let EndDate = new Date(value)
    const EndTime = EndDate.getHours()
    if (startTime < EndTime) {
      setEndTimeEta(value)

    }
    else {
      showToast('ETA END MORE THAN 1 HOUR !');
    }

  };




  const [editPhoto, setEditPhoto] = useState("");
  const [addSubPhoto, setAddSubPhoto] = useState("");

  // const [subCheckBox, setSubCheckBox] = useState(false)

  const [tagPhoto, setTagPhoto] = useState("");
  const [editId, setEditId] = useState('')


  const [showTaskGroup, setShowTaskGroup] = useState(false);
  const [showClosedTaskGroup, setClosedTaskGroup] = useState<Boolean>();
  const editTaskGroupModal = useModal(false);

  const addSubTaskModal = useModal(false);


  const [editTask, setEditTask] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editDescription, setEditDescription] = useState("");
  // const [codeFill, setCodeFill] = useState(task.slice(0, 3).toUpperCase());

  const [addSubTask, setAddSubTask] = useState("");

  const [addSubTaskCode, setAddSubTaskCode] = useState("");
  const [addSubTaskDescription, setAddSubTaskDescription] = useState("");
  const [addSubTaskItem, setSubTaskItem] = useState<any>("");
  const [startTimeEta, setStatTimeEta] = useState("")
  const [endTimeEta, setEndTimeEta] = useState("")
  const startDate = new Date(startTimeEta)
  const startTime = startDate.getHours()

  const dynamicHeight: any = useDynamicHeight()
  let attach = [photo]
  let PhotoAttach = attach.slice(-1, 4)

  let editAttach = [editPhoto]
  let editPhotoAttach = editAttach.slice(-1, 4)

  let addSubAttach = [addSubPhoto]
  let addSubPhotoAttach = addSubAttach.slice(-1, 4)



  const getGroupMenuItem = (marked_as_closed: boolean, is_parent: boolean) => [
    { id: '0', name: "Edit", icon: 'bi bi-pencil' },
    ...(is_parent ? [{ id: '1', name: "Create Sub Task", icon: 'bi bi-file-earmark-plus' }] : []),
    ...(marked_as_closed ? [{ id: '3', name: "Mark As Open", icon: "bi bi-x" }] : [{ id: '2', name: "Mark As Closed", icon: "bi bi-x" }]),
  ]

  const getTaskGroupList = (page_number: number, include: boolean = inCludeSubGroup) => {

    const params = {
      page_number,
      include_closed_taskgroup: include
    };

    dispatch(
      getTaskGroup({
        params,
        onSuccess: (success: any) => () => {
        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  const addTaskGroupApiHandler = () => {
    const params = {
      ...(selectedTaskGroup && { id: selectedTaskGroup.id }),
      name: taskGroupName.value,
      description: taskGroupDescription.value,
      code: taskGroupCode.value.trim(),
      photo: photo
    };


    console.log(JSON.stringify(params) + "======params");

    const validation = validate(ADD_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTaskGroup({
          params,
          onSuccess: (success: any) => () => {
            addTaskGroupModal.hide()
            resetValues()
            getTaskGroupList(INITIAL_PAGE)
            showToast(success.message, "success");
          },
          onError: (error: string) => () => {
            showToast('Task is already exists');
          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));
    }
  };



  // add sub task
  // const addSubTaskGroupAdding = () => {
  //   const params = {
  //     name: convertToUpperCase(addSubTask),
  //     description: convertToUpperCase(addSubTaskDescription),
  //     code: addSubTaskCode.trim(),
  //     photo: addSubPhotoAttach[0],
  //     parent_id: addSubTaskItem?.id,
  //     start_time: startTimeEta,
  //     end_time: endTimeEta,
  //   };

  //   const validation = validate(ADD_SUB_TASK_GROUP, params)
  //   if (ifObjectExist(validation)) {
  //     dispatch(
  //       addTaskGroup({
  //         params,
  //         onSuccess: (success: any) => () => {
  //           addSubTaskModal.hide()

  //           dispatch(
  //             getTaskGroup({
  //               params,
  //               onSuccess: (success: any) => () => { },
  //               onError: (error: string) => () => { },
  //             })
  //           );
  //           setAddSubTask('')
  //           setAddSubTaskCode('')
  //           setAddSubPhoto('')
  //           setAddSubTaskDescription('')
  //           showToast(success.message, "success");
  //         },
  //         onError: (error: string) => () => {
  //           showToast('Task is already exists');


  //         },
  //       })
  //     );
  //   }
  //   else {
  //     showToast(getValidateError(validation));

  //   }
  // };
  // const CloseTaskGroup = (item) => {

  //   const params = {
  //     id: addSubTaskItem.id,
  //     marked_as_closed: showClosedTaskGroup
  //   }
  //   dispatch(
  //     addTaskGroup({
  //       params,
  //       onSuccess: (success: any) => () => {

  //         dispatch(
  //           getTaskGroup({
  //             params,
  //             onSuccess: (success: any) => () => { },
  //             onError: (error: string) => () => { },
  //           })
  //         );
  //         showToast(success.message, "success");
  //       },
  //       onError: (error: string) => () => {
  //         showToast('Task is already exists');
  //       },
  //     })
  //   );
  // }

  // useEffect(() => {


  //   if (showClosedTaskGroup === true || showClosedTaskGroup === false) {


  //   }
  // }, [showClosedTaskGroup])

  // useEffect(() => {
  //   if (showTaskGroup === true) {

  //     getTaskGroupList(taskGroupCurrentPages)

  //   }
  // }, [subCheckBox])

  const normalizedTaskGroupData = (data: any) => {
    return data.map((taskGroup: any,) => {

      const { photo, name, parent, is_parent, marked_as_closed, code } = taskGroup

      return {
        name: <div className="row  align-items-center">
          <Image variant={'rounded'} src={getPhoto(photo)} />
          <div className="pl-3">
            <span className={`${marked_as_closed && 'text-primary'}`}>{name}</span>
            <br></br>
            {!is_parent && <small> {parent.name}</small>}
          </div>
        </div >,
        tag: code,
        "": <MenuBar menuData={getGroupMenuItem(marked_as_closed, is_parent)} onClick={(el) => {

          if (el.id === '0') {
            addTaskGroupModal.show()
            setSelectedTaskGroup(taskGroup)
            const { name, description, code, photo } = taskGroup
            taskGroupName.set(name)
            taskGroupDescription.set(description)
            taskGroupCode.set(code)
            setPhoto(getPhoto(photo))

          }


        }} />

      };
    });
  };


  function resetValues() {
    taskGroupName.set('')
    taskGroupCode.set('')
    taskGroupDescription.set('')
    setPhoto('')
  }

  return (
    <div>
      <Card className={'mb-3'} style={{ height: showTaskGroup ? dynamicHeight.dynamicHeight : '5em' }}>
        <div className="row justify-content-center align-items-center mb-3" >
          <div className="col">
            <h3>{translate("auth.group")}</h3>
          </div>
          <div className="col mb--4">
            <Checkbox id={'group'} text={'Include Close'} onCheckChange={(checked) => {
              getTaskGroupList(taskGroupCurrentPages, checked);
            }} />
          </div>

          <div className="text-right mr-3">
            <Button
              text={
                showTaskGroup
                  ? translate("course.hide")
                  : translate("course.view")
              }
              size={"sm"}
              onClick={() => {
                setShowTaskGroup(!showTaskGroup)
                if (!showTaskGroup) {
                  getTaskGroupList(taskGroupCurrentPages);
                }

              }}
            />
            <Button
              text={translate("product.addItem")}
              size={"sm"}
              onClick={() => {
                setSelectedTaskGroup(undefined)
                addTaskGroupModal.show()
              }}
            />
          </div>
        </div>


        <div
          className="overflow-auto overflow-hide"
          style={{
            height: showTaskGroup ? dynamicHeight.dynamicHeight - 100 : '0px',
          }}
        >
          {taskGroups && taskGroups?.length > 0 ? (
            <CommonTable
              isPagination
              tableDataSet={taskGroups}
              displayDataSet={normalizedTaskGroupData(taskGroups)}
              noOfPage={taskGroupNumOfPages}
              currentPage={taskGroupCurrentPages}
              paginationNumberClick={(currentPage) => {

                getTaskGroupList(paginationHandler("current", currentPage));

              }}
              previousClick={() => {
                getTaskGroupList(paginationHandler("prev", taskGroupCurrentPages))
              }
              }
              nextClick={() => {
                getTaskGroupList(paginationHandler("next", taskGroupCurrentPages));
              }
              }
            />
          ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <NoRecordsFound />
            </div>
          )}
        </div>

      </Card>

      <Modal
        isOpen={addTaskGroupModal.visible}
        onClose={() => {
          addTaskGroupModal.hide()
          resetValues()
        }}
        title={translate("auth.task")!}
      >
        <div className="mt--4">
          <div className='row'>
            <div className="col-6">
              <Input
                placeholder={translate("auth.task")}
                value={taskGroupName.value}
                onChange={(e) => {
                  taskGroupName.onChange(e)
                  taskGroupCode.set(stringToUpperCase(stringSlice(e.target.value)))
                }}
              />
            </div>
            <div className="col-6">
              <Input
                placeholder={translate("auth.code")}
                value={taskGroupCode.value}
                onChange={(e) => { taskGroupCode.set(stringToUpperCase((stringSlice(e.target.value)))) }}
              />
            </div>
          </div>

          <Input
            placeholder={translate("auth.description")}
            value={taskGroupDescription.value}
            onChange={taskGroupDescription.onChange}
          />
        </div>
        <div className="pb-3">
          <Dropzone
            variant="ICON"
            icon={photo}
            size="xl"
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, "");
              setPhoto(encoded);

            }}
          />
        </div>
        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              addTaskGroupModal.hide()
              resetValues()
            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {
              addTaskGroupApiHandler()
            }}
          />
        </div>
      </Modal>


      {/* <Modal

        isOpen={editTaskGroupModal.visible}
        onClose={() => {
          editTaskGroupModal.hide()
          setEditTask("");
          setEditCode('')
          setEditDescription('')
          setEditPhoto('')
          setEditId('')
        }}
        title={translate("auth.task")!}
      >
        <div className="mt--4">
          <div className='row'>
            <div className="col-6">
              <Input
                placeholder={translate("auth.task")}
                value={editTask}
                onChange={(e) => {
                  setEditTask(e.target.value)
                  setEditCode(e.target.value.slice(0, 3).toUpperCase())
                }}
              />
            </div>
            <div className="col-6">  <Input
              placeholder={translate("auth.code")}
              value={editCode}
              onChange={(e) => { setEditCode(e.target.value.slice(0, 3).toUpperCase()) }}
            />
            </div>
          </div>

          <Input
            placeholder={translate("auth.description")}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </div>
        <div className="pb-3">
          <Dropzone
            variant="ICON"
            icon={getPhoto(editPhoto)}
            size="xl"
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, "");
              setEditPhoto(encoded);
            }}
          />

        </div>
        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              editTaskGroupModal.hide()
              setEditTask("");
              setEditCode('')
              setEditDescription('')
              setEditPhoto('')
              setEditId('')
            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {
              addTaskGroupAdding();
            }}
          />
        </div>
      </Modal> */}


      {/* 
      <Modal

        isOpen={addSubTaskModal.visible}
        onClose={() => {
          addSubTaskModal.hide()

        }}
        title={translate("auth.task")!}
      >
        <div className="mt--4">
          <div className='row'>
            <div className="col-6">
              <Input
                placeholder={translate("auth.task")}
                value={addSubTask}
                onChange={(e) => {
                  setAddSubTask(e.target.value)
                  setAddSubTaskCode(e.target.value.slice(0, 3).toUpperCase())
                }}
              />
            </div>
            <div className="pt-2 pr-2 text-sm"> {addSubTaskItem?.code}-</div>
            <div className="col-5">  <Input
              placeholder={translate("auth.code")}
              value={addSubTaskCode}
              onChange={(e) => { setAddSubTaskCode(e.target.value.slice(0, 3).toUpperCase()) }}
            />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <DateTimePicker

                id="eta-picker"
                placeholder={'Start Time'}
                type="both"
                onChange={handleStartTimeEtaChange}
              />
            </div>
            <div className="col-6">
              <DateTimePicker
                id="eta-picker"
                placeholder={'End Time'}
                onChange={handleEndTimeEtaChange}
              />
            </div>
          </div>

          <Input
            placeholder={translate("auth.description")}
            value={addSubTaskDescription}
            onChange={(e) => setAddSubTaskDescription(e.target.value)}
          />
        </div>
        <div className="pb-3">
          <Dropzone
            variant="ICON"
            icon={addSubPhoto}
            size="xl"
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, "");
              setAddSubPhoto(encoded);
            }}
          />

        </div>
        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              addSubTaskModal.hide()

            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {
              addSubTaskGroupAdding();
            }}
          />
        </div>
      </Modal> */}
    </div>
  )
}

export { TaskGroup }