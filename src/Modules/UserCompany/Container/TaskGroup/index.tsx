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
import { convertToUpperCase, paginationHandler, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, ADD_SUB_TASK_GROUP, stringSlice, stringToUpperCase, INITIAL_PAGE, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, stringSlices } from "@Utils";
import { useModal, useDynamicHeight, useInput } from "@Hooks";
import { icons } from "@Assets";



function TaskGroup() {

  const dispatch = useDispatch();
  const {
    taskGroups,
    taskGroupCurrentPages,
    taskGroupNumOfPages
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );

  const dynamicHeight: any = useDynamicHeight()


  const getGroupMenuItem = (marked_as_closed: boolean, is_parent: boolean) => [
    { id: '0', name: "Edit", icon: icons.edit },
    ...(is_parent ? [{ id: '1', name: "Create Sub Task", icon: icons.addSub }] : []),
    ...(marked_as_closed ? [{ id: '3', name: "Mark As Open", icon: icons.markAsOpen }] : [{ id: '2', name: "Mark As Closed", icon: icons.markAsClose }]),
  ]
  const [showTaskGroup, setShowTaskGroup] = useState(false);

  const [inCludeSubGroup, setIncludeSubGroup] = useState(false)
  const addTaskGroupModal = useModal(false);

  const taskGroupName = useInput("");
  const taskGroupCode = useInput("");
  const taskGroupDescription = useInput("");
  const [photo, setPhoto] = useState("");
  const [selectedTaskGroup, setSelectedTaskGroup] = useState<any>(undefined);

  /**
   * add sub task State
   */
  const addSubTaskGroupModal = useModal(false);
  const subTaskGroupName = useInput("");
  const subTaskGroupCode = useInput("");
  const subTaskGroupDescription = useInput("");
  const [selectedSubTaskGroup, setSelectedSubTaskGroup] = useState<any>(undefined);
  const [isEdit, setIsEdit] = useState<any>(false);
  const [startTimeEta, setStatTimeEta] = useState("")
  const [endTimeEta, setEndTimeEta] = useState("")
  const [subTaskPhoto, setSubTaskPhoto] = useState("");


  const startDate = new Date(startTimeEta)
  const startTime = startDate.getHours()


  const handleStartTimeEtaChange = (value: any) => {
    setStatTimeEta(value)
  };

  const handleEndTimeEtaChange = (value: any) => {
    setEndTimeEta(value)
  };









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

  const addTaskGroupApiHandler = async () => {

    toDataUrl(photo, function (myBase64) {

      let updatedPhoto = photo
      if (photo.includes('http')) {
        let encoded = myBase64.toString().replace(/^data:(.*,)?/, "")
        updatedPhoto = encoded
      }

      const params = {
        ...(selectedTaskGroup && { id: selectedTaskGroup.id }),
        name: taskGroupName.value,
        description: taskGroupDescription.value,
        code: taskGroupCode.value.trim(),
        photo: updatedPhoto
      };
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
    });


  };

  const changeGroupStatusApiHandler = (id: number, marked_as_closed: boolean) => {

    const params = {
      id,
      marked_as_closed
    }

    dispatch(
      addTaskGroup({
        params,
        onSuccess: (success: any) => () => {
          getTaskGroupList(taskGroupCurrentPages)
        },
        onError: (error: string) => () => {
          showToast('Task is already exists');
        },
      })
    );
  }

  // add sub task
  const addSubTaskGroupApiHandler = () => {

    toDataUrl(subTaskPhoto, function (myBase64) {

      let updatedPhoto = subTaskPhoto
      if (subTaskPhoto.includes('http')) {
        let encoded = myBase64.toString().replace(/^data:(.*,)?/, "")
        updatedPhoto = encoded
      }
      const params = {
        name: convertToUpperCase(subTaskGroupName.value),
        description: convertToUpperCase(subTaskGroupDescription.value),
        code: subTaskGroupCode.value.trim(),
        photo: updatedPhoto,
        parent_id: selectedSubTaskGroup?.id,
        start_time: startTimeEta,
        end_time: endTimeEta,
        ...(isEdit && { id: selectedSubTaskGroup.id }),
      };

      const validation = validate(ADD_SUB_TASK_GROUP, params)


      if (ifObjectExist(validation)) {
        dispatch(
          addTaskGroup({
            params,
            onSuccess: (success: any) => () => {
              addSubTaskGroupModal.hide();
              resetSubTaskValues();
              getTaskGroupList(INITIAL_PAGE)
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


    })


  };

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
            if (is_parent) {
              addTaskGroupModal.show()
              setSelectedTaskGroup(taskGroup)
              const { name, description, code, photo } = taskGroup
              taskGroupName.set(name)
              taskGroupDescription.set(description)
              taskGroupCode.set(code)
              setPhoto(getPhoto(photo))

            } else {
              addSubTaskGroupModal.show()
              setSelectedSubTaskGroup(taskGroup)
              const { name, description, code, photo, start_time, end_time } = taskGroup
              subTaskGroupName.set(name)
              subTaskGroupDescription.set(description)
              subTaskGroupCode.set(code)
              setSubTaskPhoto(getPhoto(photo))
              setStatTimeEta(start_time)
              setEndTimeEta(end_time)
              setIsEdit(true)
            }
          }
          else if (el.id === '1') {
            addSubTaskGroupModal.show();
            setIsEdit(false)
            setSelectedSubTaskGroup(taskGroup)
          }
          else if (el.id === '2') {
            const { id } = taskGroup
            changeGroupStatusApiHandler(id, true)
          }
          else if (el.id === '3') {
            const { id } = taskGroup
            changeGroupStatusApiHandler(id, false)
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



  function resetSubTaskValues() {
    subTaskGroupName.set('')
    subTaskGroupCode.set('')
    subTaskGroupDescription.set('')
    setSubTaskPhoto('')
    setEndTimeEta('')
    setStatTimeEta('')
  }

  async function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
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
            marginLeft:"-23px",
            marginRight:"-23px"
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
                value={stringSlices(taskGroupName.value)}
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



      <Modal
        isOpen={addSubTaskGroupModal.visible}
        onClose={() => {
          addSubTaskGroupModal.hide();
          resetSubTaskValues();
        }}
        title={translate("auth.task")!}
      >
        <div className="mt--4">
          <div className='row'>
            <div className="col-6">
              <Input
                placeholder={translate("auth.task")}
                value={stringSlices(subTaskGroupName.value)}
                onChange={(e) => {
                  subTaskGroupName.onChange(e)
                  subTaskGroupCode.set(stringToUpperCase(stringSlice(e.target.value)))
                }}
              />
            </div>
            <div className="pt-2 pr-2 text-sm col-auto"> {selectedSubTaskGroup?.parent?.code}-</div>
            <div className="col">
              <Input
                placeholder={translate("auth.code")}
                value={subTaskGroupCode.value}
                onChange={(e) => { subTaskGroupCode.set(stringToUpperCase((stringSlice(e.target.value)))) }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <DateTimePicker
                id="eta-picker"
                placeholder={'Start Time'}
                type="both"
                value={startTimeEta}
                onChange={handleStartTimeEtaChange}
              />
            </div>
            <div className="col-6">
              <DateTimePicker
                id="eta-picker"
                type="both"
                value={endTimeEta}
                placeholder={'End Time'}
                onChange={handleEndTimeEtaChange}
              />
            </div>
          </div>

          <Input
            placeholder={translate("auth.description")}
            value={subTaskGroupDescription.value}
            onChange={(e) => subTaskGroupDescription.onChange(e)}
          />

        </div>
        <div className="pb-3">
          <Dropzone
            variant="ICON"
            icon={subTaskPhoto}
            size="xl"
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, "");
              setSubTaskPhoto(encoded);
            }}
          />

        </div>
        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              addSubTaskGroupModal.hide();
              resetSubTaskValues();
            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={() => {
              addSubTaskGroupApiHandler();
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export { TaskGroup }