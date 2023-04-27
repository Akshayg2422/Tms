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
import { convertToUpperCase, paginationHandler, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, ADD_SUB_TASK_GROUP } from "@Utils";
import { useModal, useDynamicHeight } from "@Hooks";



function GroupTask() {

  const dispatch = useDispatch();


  const {
    getTaskGroupDetails,
    taskGroupCurrentPages,
    taskGroupNumOfPages
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );
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


  const [photo, setPhoto] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [addSubPhoto, setAddSubPhoto] = useState("");

  const [subCheckBox, setSubCheckBox] = useState(false)

  const [tagPhoto, setTagPhoto] = useState("");
  const [editId, setEditId] = useState('')


  const [showTaskGroup, setShowTaskGroup] = useState(false);
  const [showClosedTaskGroup, setClosedTaskGroup] = useState<Boolean>();
  const addTaskGroupModal = useModal(false);
  const editTaskGroupModal = useModal(false);

  const addSubTaskModal = useModal(false);

  const [task, setTask] = useState("");

  const [editTask, setEditTask] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [codeFill, setCodeFill] = useState(task.slice(0, 3).toUpperCase());

  const [taskDescription, setTaskDescription] = useState("");
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



  const menuItemClose = [{ id: '0', name: "Edit", icon: 'bi bi-pencil' },
  { id: '1', name: "Create SubTask", icon: 'bi bi-file-earmark-plus' },
  { id: '2', name: "Mark As Closed", icon: "bi bi-x" }

  ]
  const menuItemOpen = [{ id: '0', name: "Edit", icon: 'bi bi-pencil' },
  { id: '1', name: "Create SubTask", icon: 'bi bi-file-earmark-plus' },
  { id: '2', name: "Mark As Open", icon: "bi bi-x" }

  ]

  const subGroupMenuItemClose = [{ id: '0', name: "Edit", icon: 'bi bi-pencil' },
  { id: '2', name: "Mark As Closed", icon: "bi bi-x" }

  ]
  const subGroupMenuItemOpen = [{ id: '0', name: "Edit", icon: 'bi bi-pencil' },
  { id: '2', name: "Mark As Open", icon: "bi bi-x" }

  ]

  const getTaskGroupList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber,
      include_closed_taskgroup: subCheckBox
    };

    dispatch(
      getTaskGroup({
        params,
        onSuccess: (success: any) => () => {


          if (!showTaskGroup) {

            setShowTaskGroup(!showTaskGroup)
          }

        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  const addTaskGroupAdding = () => {
    const params = {
      name: editTask ? convertToUpperCase(editTask) : convertToUpperCase(task),
      description: editDescription ? convertToUpperCase(editDescription) : convertToUpperCase(taskDescription),
      code: editCode ? editCode.trim() : codeFill.trim(),
      photo: editPhoto ? editPhotoAttach[0] : PhotoAttach[0],
      ...(editId && { id: editId })

    };

    const validation = validate(ADD_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTaskGroup({
          params,
          onSuccess: (success: any) => () => {
            addTaskGroupModal.hide()
            editTaskGroupModal.hide()

            dispatch(
              getTaskGroup({
                params,
                onSuccess: (success: any) => () => { },
                onError: (error: string) => () => { },
              })
            );
            setTask("");
            setCodeFill('')
            setTaskDescription('')
            setPhoto('')
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
  const addSubTaskGroupAdding = () => {
    const params = {
      name: convertToUpperCase(addSubTask),
      description: convertToUpperCase(addSubTaskDescription),
      code: addSubTaskCode.trim(),
      photo: addSubPhotoAttach[0],
      parent_id: addSubTaskItem?.id,
      start_time: startTimeEta,
      end_time: endTimeEta,
    };

    const validation = validate(ADD_SUB_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTaskGroup({
          params,
          onSuccess: (success: any) => () => {
            addSubTaskModal.hide()

            dispatch(
              getTaskGroup({
                params,
                onSuccess: (success: any) => () => { },
                onError: (error: string) => () => { },
              })
            );
            setAddSubTask('')
            setAddSubTaskCode('')
            setAddSubPhoto('')
            setAddSubTaskDescription('')
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
  const CloseTaskGroup = (item) => {

    const params = {
      id: addSubTaskItem.id,
      marked_as_closed: showClosedTaskGroup
    }
    dispatch(
      addTaskGroup({
        params,
        onSuccess: (success: any) => () => {

          dispatch(
            getTaskGroup({
              params,
              onSuccess: (success: any) => () => { },
              onError: (error: string) => () => { },
            })
          );
          showToast(success.message, "success");
        },
        onError: (error: string) => () => {
          showToast('Task is already exists');
        },
      })
    );
  }

  useEffect(() => {


    if (showClosedTaskGroup === true || showClosedTaskGroup === false) {
      // CloseTaskGroup()


    }
  }, [showClosedTaskGroup])

  useEffect(() => {
    if (showTaskGroup === true) {

      getTaskGroupList(taskGroupCurrentPages)

    }
  }, [subCheckBox])

  const normalizedTaskGroupData = (data: any) => {
    return data.map((el: any,) => {

      return {
        name: <div className="row"><div><Image variant={'rounded'} src={getPhoto(el?.photo)} /></div>
          <div className="pt-3 pl-2">
            {el?.marked_as_closed === true ? <div className="text-primary">{el.name}</div> : <div>{el.name}</div>}
            <div className="pt-1">
              {el?.parent?.name}</div></div>
        </div>,
        tag: el?.code,
        "": (el.marked_as_closed ?
          (el?.is_parent ?

            <MenuBar menuData={menuItemOpen} onClick={(index) => {
              setSubTaskItem(el)
              if (index === 0) {
                editTaskGroupModal.show()
                setEditTask(el?.name)
                setEditCode(el?.code)
                setEditDescription(el?.description)
                setEditPhoto(el?.photo)
                setEditId(el?.id)
              }
              if (index === 1) {
                addSubTaskModal.show()
              }
              if (index === 2) {
                setClosedTaskGroup(false)


              }
            }} /> :
            <MenuBar menuData={subGroupMenuItemOpen} onClick={(index) => {
              setSubTaskItem(el)
              if (index === 0) {
                editTaskGroupModal.show()
                setEditTask(el?.name)
                setEditCode(el?.code)
                setEditDescription(el?.description)
                setEditPhoto(el?.photo)
                setEditId(el?.id)
              }

              if (index === 1) {
                setClosedTaskGroup(false)
              }
            }} />

          )
          : (el?.is_parent ?
            <MenuBar menuData={menuItemClose} onClick={(index) => {
              setSubTaskItem(el)

              if (index === 0) {
                editTaskGroupModal.show()
                setEditTask(el?.name)
                setEditCode(el?.code)
                setEditDescription(el?.description)
                setEditPhoto(el?.photo)
                setEditId(el?.id)
              }
              if (index === 1) {
                addSubTaskModal.show()
              }
              if (index === 2) {
                setClosedTaskGroup(true)
              }
            }} />
            :
            <MenuBar menuData={subGroupMenuItemClose} onClick={(index) => {
              setSubTaskItem(el)
              if (index === 0) {
                editTaskGroupModal.show()
                setEditTask(el?.name)
                setEditCode(el?.code)
                setEditDescription(el?.description)
                setEditPhoto(el?.photo)
                setEditId(el?.id)
              }

              if (index === 1) {
                setClosedTaskGroup(true)


              }
            }} />
          ))

      };
    });
  };


  return (
    <div>
      <Card className={'mb-3'} style={{ height: showTaskGroup ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
        <div className="row">
          <div className="col">
            <h3>{translate("auth.group")}</h3>
          </div>
          <div className="col ">
            <Checkbox id={'0'} onClick={() => {

              if (subCheckBox === false) {
                setSubCheckBox(true)

              }
              else {
                setSubCheckBox(false)

              }
            }} text={'Include Close'} />
          </div>

          <div className="text-right mr-3 ">
            <Button
              text={
                showTaskGroup
                  ? translate("course.hide")
                  : translate("course.view")
              }
              size={"sm"}
              onClick={() => {
                if (!showTaskGroup) {
                  getTaskGroupList(taskGroupCurrentPages);
                } else {
                  setShowTaskGroup(!showTaskGroup)
                }

              }}
            />
            <Button
              text={translate("product.addItem")}
              size={"sm"}
              onClick={() => { addTaskGroupModal.show() }}
            />
          </div>
        </div>


        <div
          className="overflow-auto overflow-hide"
          style={{
            height: showTaskGroup ? dynamicHeight.dynamicHeight - 100 : '0px',
            margin: '0px -39px 0px -39px'
          }}
        >
          {getTaskGroupDetails && getTaskGroupDetails?.length > 0 ? (
            <CommonTable
              isPagination
              tableDataSet={getTaskGroupDetails}
              displayDataSet={normalizedTaskGroupData(getTaskGroupDetails)}
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
            <div
              className=" d-flex justify-content-center align-items-center"
              style={{
                height: "30.5rem",
              }}
            >
              <NoRecordsFound />
            </div>
          )}
        </div>

      </Card>

      <Modal

        isOpen={addTaskGroupModal.visible}
        onClose={() => {
          addTaskGroupModal.hide()
          setTask("");
          setCodeFill('')
          setTaskDescription('')
          setPhoto('')
        }}
        title={translate("auth.task")!}
      >
        <div className="mt--4">
          <div className='row'>
            <div className="col-6">
              <Input
                placeholder={translate("auth.task")}
                value={task}
                onChange={(e) => {
                  setTask(e.target.value)
                  setCodeFill(e.target.value.slice(0, 3).toUpperCase())
                }}
              />
            </div>
            <div className="col-6">  <Input
              placeholder={translate("auth.code")}
              value={codeFill}
              onChange={(e) => { setCodeFill(e.target.value.slice(0, 3).toUpperCase()) }}
            />
            </div>
          </div>

          <Input
            placeholder={translate("auth.description")}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
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
              setTask("");
              setCodeFill('')
              setTaskDescription('')
              setPhoto('')
            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {
              addTaskGroupAdding();
            }}
          />
        </div>
      </Modal>


      <Modal

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
      </Modal>



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


          {/* </div> */}
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
      </Modal>
    </div>
  )
}

export { GroupTask }