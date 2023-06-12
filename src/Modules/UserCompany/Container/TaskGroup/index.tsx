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
  DateTimePicker,
  Spinner
} from "@Components";
import { translate } from "@I18n";
import {

  getTaskGroup,
  addTaskGroup,
  addGroupUser,
  getGroupsEmployees
} from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, ADD_SUB_TASK_GROUP, stringSlice, stringToUpperCase, INITIAL_PAGE, getDisplayDateFromMomentByType, HDD_MMMM_YYYY_HH_MM_A, getMomentObjFromServer, getDisplayTimeDateMonthYearTime, stringSlices, getArrayFromArrayOfObject, TGU } from "@Utils";
import { useModal, useDynamicHeight, useInput } from "@Hooks";
import { icons } from "@Assets";
import { Employees, GroupEmployeeList } from '@Modules'
import moment from "moment";



function TaskGroup() {

  const dispatch = useDispatch();
  const {
    taskGroups,
    taskGroupCurrentPages,
    taskGroupNumOfPages,
    selectedGroupChatCode,
    dashboardDetails
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );
  const { company } = dashboardDetails || ''

  const dynamicHeight: any = useDynamicHeight()
  useEffect(() => {
    getGroupEmployees()
  }, [selectedGroupChatCode])
  const getGroupMenuItem = (marked_as_closed: boolean, is_parent: boolean) => [
    { id: '0', name: "Edit", icon: icons.edit },
    ...(is_parent ? [{ id: '1', name: "Create Sub Group", icon: icons.addSub }] : []),
    ...(marked_as_closed ? [{ id: '3', name: "Mark As Open", icon: icons.markAsOpen }] : [{ id: '2', name: "Mark As Closed", icon: icons.markAsClose }]),
    ...(is_parent ? [{ id: '4', name: "Add Member ", icon: icons.addSub }] : []),
  ]
  const [showTaskGroup, setShowTaskGroup] = useState(false);
  const [inCludeSubGroup, setIncludeSubGroup] = useState(false)
  const addTaskGroupModal = useModal(false);
  const [loading,setLoading] =useState(false)
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
  const [startTimeEta, setStatTimeEta] = useState<any>("")
  const [endTimeEta, setEndTimeEta] = useState<any>("")
  const [subTaskPhoto, setSubTaskPhoto] = useState("");
  const addMemberModal = useModal(false);
  const [taggedUsers, setTaggedUsers] = useState([])
  const [defaultSelectedUsers, setDefaultSelectedUser] = useState<any>([])
  const [addGroupId,setGroupId]=useState<any>()
  const startDate = new Date(startTimeEta)
  const startTime = startDate.getHours()
  const [date, setDate] = useState<any>(moment().format())
  const [endDate, setEndDate] = useState<any>(moment().format())


  const handleStartTimeEtaChange = (value: any) => {
    setStatTimeEta(value)
    setDate(value)
  };

  const handleEndTimeEtaChange = (value: any) => {
    setEndTimeEta(value)
    setEndDate(value)
  };

  const getTaskGroupList = (page_number: number, include: boolean = inCludeSubGroup) => {
      setLoading(true)
    const params = {
      page_number,
      include_closed_taskgroup: include
    };

    dispatch(
      getTaskGroup({
        params,
        onSuccess: (success: any) => () => {
          setLoading(false)
        },
        onError: (error: string) => () => {
               setLoading(false)
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
        branch_id:company?.id,
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
        branch_id:company?.id,
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

  // EMPLOYEES

  const getGroupEmployees = (q: string = '') => {

    const params = {
      group_id: selectedGroupChatCode,
      // ...(otherParams && { ...otherParams }),
      q
    }


    if (selectedGroupChatCode) {
      dispatch(
        getGroupsEmployees({
          params,
          onSuccess: (response) => () => {
            const selectedUsers = response.details
            if (selectedUsers && selectedUsers.length > 0) {
              setDefaultSelectedUser(selectedUsers)
            }

          },
          onError: () => () => {

          }
        })
      )
    }
  }

  // ADD MEMBER

  const addGroupUsers = (addUsers: any) => {

    const params = {
      group_id: addGroupId,
      users_id: addUsers.tagged_users
    }

    dispatch(
      addGroupUser({
        params,
        onSuccess: (response) => () => {
          addMemberModal.hide()
          getGroupEmployees()
          showToast('Member added successfully');
        },
        onError: () => () => {
          // showToast('Add member not added');
        }
      })
    )

  }

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
          else if (el.id === '4') {
            const { id } = taskGroup
           
            // addGroupUsers(id)
            addMemberModal.show()
            setGroupId(taskGroup.id)
           
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
    console.log("xhr---->", xhr)
    xhr.onload = function () {
      var reader = new FileReader();
      console.log("reader", reader)
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
            <Checkbox id={'group'} text={translate('order.Include Close')!} onCheckChange={(checked) => {
              getTaskGroupList(taskGroupCurrentPages, checked);
            }} />
          </div>

          <div className="text-right mr-3">
            <Button
              className={'text-white'}
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
              className={'text-white'}
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
            marginLeft: "-23px",
            marginRight: "-23px"
          }}
        >
          {
              loading && (
                <div className='d-flex justify-content-center align-item-center' style={{marginTop:'200px'}}>
                  <Spinner/>
                </div>
              )
            }
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
                placeholder={'Start Time'}
                type="both"
                initialValue={(getMomentObjFromServer(startTimeEta))}
                onChange={handleStartTimeEtaChange}
                value={date ? getMomentObjFromServer(date) : null!}
              />
            </div>
            <div className="col-6">
              <DateTimePicker
                type="both"
                initialValue={(getMomentObjFromServer(endTimeEta))}
                placeholder={'End Time'}
                onChange={handleEndTimeEtaChange}
                value={endDate ? getMomentObjFromServer(endDate) : null!}
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

      {
        /**
         * Tag User
         */
      }

      <Modal fade={false} isOpen={addMemberModal.visible} onClose={addMemberModal.hide} style={{ maxHeight: '90vh', }}>
        
        {/* <Employees selection={'multiple'}
          defaultSelect={defaultSelectedUsers}
          onSelected={(users) => {
            const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
            setTaggedUsers(taggedUserIds)
          }}
          
          /> */}
          <GroupEmployeeList
          selection={'multiple'}
          defaultSelect={defaultSelectedUsers}
          selectedCode={addGroupId}
          onSelected={(users) => {
            const taggedUserIds = getArrayFromArrayOfObject(users, 'id')
            setTaggedUsers(taggedUserIds)
          }}/>
        <div className="pt-3 mr-2 text-right">
          <Button
            size={'sm'}
            text={translate("common.submit")}
            onClick={() => {
              addGroupUsers({ event_type: TGU, tagged_users: taggedUsers })
            }} />
        </div>
      </Modal>
    </div>
  )
}

export { TaskGroup }