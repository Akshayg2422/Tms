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
  addDepartment,
  addDesignation,
  getDepartmentData,
  getDesignationData,
  addBrandSector,
  addTicketTag,
  getBrandSector,
  getTicketTag,
  getTaskGroup,
  addTaskGroup
} from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ADD_DEPARTMENT, ADD_DESIGNATION, ADD_SECTOR, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, ADD_SUB_TASK_GROUP } from "@Utils";
import { useModal, useDynamicHeight } from "@Hooks";

function Settings() {
  const dispatch = useDispatch();
  const { departmentData, designationData, departmentCurrentPages, departmentNumOfPages, designationCurrentPages, designationNumOfPages,
    brandSector,
    ticketTag,
    brandSectorCurrentPages,
    brandSectorNumOfPages,
    ticketTagCurrentPages,
    ticketTagNumOfPages,
    dashboardDetails,
    getTaskGroupDetails,
    taskGroupCurrentPages,
    taskGroupNumOfPages

  } = useSelector(
    (state: any) => state.AdminReducer
  );
  console.log(departmentData,"=====>ddddddddd")

  const [photo, setPhoto] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [addSubPhoto, setAddSubPhoto] = useState("");
  const [subCheckBox,setSubCheckBox]=useState(false)
  const [tagPhoto, setTagPhoto] = useState("");
  const [editId,setEditId]=useState('')
  const [showDepartments, setShowDepartments] = useState(false);
  const [showDesignations, setShowDesignations] = useState(false);
  const addDepartMentModal = useModal(false);
  const addDesignationModal = useModal(false);
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [showSector, setShowSector] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const addSectorModal = useModal(false);
  const addTagsModal = useModal(false);
  const [sector, setSector] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [editIsAdmin, setEditIsAdmin] = useState<boolean>(false);
  const [editIsSuperAdmin, setEditIsSuperAdmin] = useState<boolean>(false);
  const [departmentDataList, setDepartmentDataList] = useState(departmentData);
  const [designationDataList, setDesignationDataList] = useState(designationData);
  const [showTaskGroup, setShowTaskGroup] = useState(false);
  const [showClosedTaskGroup, setClosedTaskGroup] = useState<Boolean>();
  const addTaskGroupModal = useModal(false);
  const editTaskGroupModal=useModal(false);
  const editDepartmentModal=useModal(false);
  const addSubTaskModal=useModal(false);
  const addSubDepartmentModal=useModal(false)
  const [task, setTask] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [codeFill, setCodeFill] = useState(task.slice(0, 3).toUpperCase());
  const [TagCodeFill, setTagCodeFill] = useState(tags.slice(0, 3).toUpperCase());
  const [taskDescription, setTaskDescription] = useState("");
  const [addSubTask, setAddSubTask] = useState("");
  const [addSubDepartment, setAddSubDepartment] = useState("");
  const [addSubDepartmentIsAdmin, setAddSubDepartmentIsAdmin] = useState(false);
  const [addSubDepartmentIsSuperAdmin, setAddSubDepartmentIsSuperAdmin] = useState(false);
const [addSubDepartmentItem,setAddSubDepartmentItem]=useState<any>('')
  const [addSubTaskCode, setAddSubTaskCode] = useState("");
  const [addSubTaskDescription, setAddSubTaskDescription] = useState("");
  const [addSubTaskItem,setSubTaskItem] = useState<any>("");
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

  let tagAttach = [tagPhoto]
  let tagPhotoAttach = tagAttach.slice(-1, 4)

  const menuItemClose = [{ id: '0', name: "Edit", icon: 'bi bi-pencil' },
  { id: '1', name: "Create SubTask", icon: 'bi bi-file-earmark-plus' },
  { id: '2', name: "Mark As Closed", icon: "bi bi-x" }

  ]
  const menuItemOpen = [{ id: '0', name: "Edit", icon: 'bi bi-pencil' },
  { id: '1', name: "Create SubTask", icon: 'bi bi-file-earmark-plus' },
  { id: '2', name: "Mark As Open", icon: "bi bi-x" }

]

const subGroupMenuItemClose=[{id:'0',name:"Edit",icon:'bi bi-pencil'},
{id:'2',name:"Mark As Closed",icon:"bi bi-x"}

]
const subGroupMenuItemOpen=[{id:'0',name:"Edit",icon:'bi bi-pencil'},
{id:'2',name:"Mark As Open",icon:"bi bi-x"}

]
const subDepartment=[
  {id:'0',name:"Edit",icon:'bi bi-pencil'},
  {id:'1',name:"Create SubDepartment",icon:'bi bi-file-earmark-plus'}
]

const subChildDepartments=[
  {id:'0',name:"Edit",icon:'bi bi-pencil'},
]
console.log(departmentDataList,"-------dddddddddddddddddeee")
  const getDepartmentList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber
    };
    dispatch(
      getDepartmentData({
        params,
        onSuccess: (response: any) => () => {
          if (!showDepartments) {
            setShowDepartments(!showDepartments)
          }
          if (response.success) {
            setDepartmentDataList(response?.details?.data)
          }

        },
        onError: (error: string) => () => {

        },
      })
    );

  };

  console.log("============>", JSON.stringify(getTaskGroupDetails))


  /**get Brand sector */

  const getBrandSectorList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber
    };
    dispatch(
      getBrandSector({
        params,
        onSuccess: (success: any) => () => {
          if (!showSector) {
            setShowSector(!showSector)
          }
        },
        onError: (error: string) => () => {

        },
      })
    );

  };




  const getDesignationList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber
    };

    dispatch(
      getDesignationData({
        params,
        onSuccess: (response: any) => () => {

          if (!showDesignations) {
            setShowDesignations(!showDesignations)
          }

          if (response.success) {
            setDesignationDataList(response?.details?.data)
          }

        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  /**get ticket tag */
  const getTicketTagList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber
    };

    dispatch(
      getTicketTag({
        params,
        onSuccess: (success: any) => () => {

          if (!showTags) {

            setShowTags(!showTags)
          }
        },
        onError: (error: string) => () => {
        },
      })
    );
  };




  const getTaskGroupList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber,
      include_closed_taskgroup:subCheckBox
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



  const postAddingDepartment = () => {
    const params = {
      name:editDepartment?convertToUpperCase(editDepartment):convertToUpperCase(department),
      is_admin:editDepartment?editIsAdmin:isAdmin,
      ...(isSuperAdmin && { is_super_admin:editDepartment?editIsSuperAdmin:isSuperAdmin }),
      ...(addSubDepartmentItem?.id &&{id:addSubDepartmentItem.id})
    };
console.log(params,"ppppppppp")
    const validation = validate(ADD_DEPARTMENT, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addDepartment({
          params,
          onSuccess: (success: any) => () => {
            addDepartMentModal.hide()
            editDepartmentModal.hide()
            getDepartmentList(departmentCurrentPages)
            showToast(success.message, "success");
            setIsAdmin(false)
            setIsSuperAdmin(false)
            setDepartment("");
            setEditIsAdmin(false)
            setEditIsSuperAdmin(false)
            setEditDepartment('')
          },
          onError: (error: string) => () => {
            showToast('Department is already exists');
          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));

    }
  };

  const postAddingSubDepartment = () => {
    const params = {
      name:convertToUpperCase(addSubDepartment),
      is_admin:addSubDepartmentIsAdmin,
      ...(isSuperAdmin && { is_super_admin:addSubDepartmentIsSuperAdmin}),
      parent_id: addSubDepartmentItem?.id,
    };

    const validation = validate(ADD_DEPARTMENT, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addDepartment({
          params,
          onSuccess: (success: any) => () => {
            addDepartMentModal.hide()
            addSubDepartmentModal.hide()
             getDepartmentList(departmentCurrentPages)
            setAddSubDepartment('')
            setAddSubDepartmentIsAdmin(false)
            setAddSubDepartmentIsSuperAdmin(false)
            showToast(success.message, "success");
         
          },
          onError: (error: string) => () => {
            showToast('Department is already exists');
          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));

    }
  };

  /**add brand sector */

  const addBrandSectorAdding = () => {
    const params = {
      name: convertToUpperCase(sector),
    };
    const validation = validate(ADD_SECTOR, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addBrandSector({
          params,
          onSuccess: (success: any) => () => {
            addSectorModal.hide()
            dispatch(
              getBrandSector({
                params,
                onSuccess: (success: any) => () => { },
                onError: (error: string) => () => { },
              })
            );
            setSector("");
            setDescription("")
            showToast(success.message, "success");
          },
          onError: (error: string) => () => {
            showToast('Sector is already exists');

          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));

    }
  };

  const postAddingDesignation = () => {
    const params = {
      name: convertToUpperCase(designation),
      is_admin: isAdmin,
      ...(isSuperAdmin && { is_super_admin: isSuperAdmin })
    };
    const validation = validate(ADD_DESIGNATION, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addDesignation({

          params,
          onSuccess: (success: any) => () => {
            addDesignationModal.hide()
            getDesignationList(departmentCurrentPages)
            // dispatch(
            //   getDesignationData({
            //     params,
            //     onSuccess: (success: any) => () => { },
            //     onError: (error: string) => () => { },
            //   })
            // );
            setDesignation("");
            showToast(success.message, "success");
            setIsAdmin(false)
            setIsSuperAdmin(false)
          },
          onError: (error: string) => () => {
            showToast('Designation is already exists');

          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));

    }
  };

  /**add ticket tag */
  const addTicketTagAdding = () => {
    const params = {
      name: convertToUpperCase(tags),
      description: convertToUpperCase(description),
      code: TagCodeFill,
      photo: tagPhotoAttach[0]
    };
    const validation = validate(ADD_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTicketTag({
          params,
          onSuccess: (success: any) => () => {
            addTagsModal.hide()

            dispatch(
              getTicketTag({
                params,
                onSuccess: (success: any) => () => {

                  setDescription("")
                  setTagPhoto("")
                  setTagCodeFill("")
                  setTags("")

                },
                onError: (error: string) => () => { },
              })
            );

            showToast(success.message, "success");
          },
          onError: (error: string) => () => {
            showToast('Tags is already exists');

          },
        })
      );
    }
    else {
      showToast(getValidateError(validation));

    }
  };

  /**add task group */
  const addTaskGroupAdding = () => {
    const params = {
      name: editTask ? convertToUpperCase(editTask) : convertToUpperCase(task),
      description: editDescription ? convertToUpperCase(editDescription) : convertToUpperCase(taskDescription),
      code: editCode ? editCode : codeFill,
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
      code: addSubTaskCode,
      photo: addSubPhotoAttach[0],
      parent_id: addSubTaskItem?.id,
      start_time:startTimeEta,
      end_time:endTimeEta,
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
  const CloseTaskGroup = () => {

   const  params ={
    id:addSubTaskItem.id,
    marked_as_closed:showClosedTaskGroup
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
);}

const handleStartTimeEtaChange = (value: any) => {
  setStatTimeEta(value)
};
const handleEndTimeEtaChange = (value: any) => {
 
  let EndDate=new Date(value)
  const EndTime=EndDate.getHours()
  if(startTime<EndTime ){
    setEndTimeEta(value)

  }
  else{
    showToast('ETA END MORE THAN 1 HOUR !');

  }
  
};


  const handleDepartmentAdminProcess = (item) => {

    const updateData = departmentDataList.map((el: any) => {
      if (el.id === item.id) {
        return { ...el, is_admin: !el.is_admin }
      }
      return el
    })

    setDepartmentDataList(updateData)

    const findElement = updateData.find((finditem) => finditem.id === item.id)

    const params = {
      id: findElement?.id,
      is_admin: findElement?.is_admin
    }

    dispatch(
      addDepartment({
        params,
        onSuccess: (success: any) => () => { },
        onError: (error: string) => () => { },
      })
    );


  }


  const handleDepartmentSuperAdminProcess = (item) => {

    const updateData = departmentDataList.map((el: any) => {
      if (el.id === item.id) {
        return { ...el, is_super_admin: !el.is_super_admin }
      }
      return el
    })

    setDepartmentDataList(updateData)

    const findElement = updateData.find((finditem) => finditem.id === item.id)
    const params = {
      id: findElement?.id,
      is_super_admin: findElement?.is_super_admin
    }
    dispatch(
      addDepartment({
        params,
        onSuccess: (success: any) => () => { },
        onError: (error: string) => () => { },
      })
    );

  }

  const handleDesignationAdminProcess = (item) => {

    const updateData = designationDataList.map((el: any) => {
      if (el.id === item.id) {
        return { ...el, is_admin: !el.is_admin }
      }
      return el
    })

    setDesignationDataList(updateData)

    const findElement = updateData.find((finditem) => finditem.id === item.id)

    const params = {
      id: findElement?.id,
      is_admin: findElement?.is_admin
    }

    dispatch(
      addDesignation({
        params,
        onSuccess: (success: any) => () => { },
        onError: (error: string) => () => { },
      })
    );



  }

  const handleDesignationSuperAdminProcess = (item) => {

    const updateData = designationDataList.map((el: any) => {
      if (el.id === item.id) {
        return { ...el, is_super_admin: !el.is_super_admin }
      }
      return el
    })

    setDesignationDataList(updateData)

    const findElement = updateData.find((finditem) => finditem.id === item.id)
    const params = {
      id: findElement?.id,
      is_super_admin: findElement?.is_super_admin
    }

    dispatch(
      addDesignation({
        params,
        onSuccess: (success: any) => () => { },
        onError: (error: string) => () => { },
      })
    );

  }

  const normalizedDepartmentData = (data: any) => {
    return data.map((el: any, index: any) => {
      console.log('...>>>',el)
      return {
        name: el?.name,
        ... (dashboardDetails?.permission_details.is_admin && {
          Admin:
            <div className=" d-flex justify-content-center align-items-center ">
              <Input type={'checkbox'} checked={el?.is_admin} onChange={() => {
                handleDepartmentAdminProcess(el)
              }} />
            </div>,
            

        }),

        ...(dashboardDetails?.permission_details.is_super_admin && {
          superAdmin:
            <div className=" d-flex justify-content-center align-items-center">
              <Input type={'checkbox'} checked={el?.is_super_admin} onChange={() => {
                handleDepartmentSuperAdminProcess(el)
              }} />
            </div>,

            '':(el?.is_parent ?
               <MenuBar ListedData={subDepartment} onClick={(index)=>{
              setAddSubDepartmentItem(el)
              
             if(index===0)
             {
              editDepartmentModal.show()
              setEditDepartment(el?.name)
              setEditIsAdmin(el?.is_admin)
              setEditIsSuperAdmin(el?.is_super_admin)
             
             }
             if(index===1)
             {
              addSubDepartmentModal.show()
             }
          
            }}  />:
            <MenuBar ListedData={subChildDepartments} onClick={(index)=>{
              setAddSubDepartmentItem(el)

             if(index===0)
             {
              editDepartmentModal.show()
              setEditDepartment(el?.name)
              setEditIsAdmin(el?.is_admin)
              setEditIsSuperAdmin(el?.is_super_admin)
             
             }
          
          
            }}  />
            )
        }),

      };
    });
  };

  const normalizedDesignationData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        ... (dashboardDetails?.permission_details.is_admin && {
          Admin:
            <div className="d-flex justify-content-center align-items-center">
              <Input type={'checkbox'} className={''} checked={el?.is_admin} onChange={() => {
                handleDesignationAdminProcess(el)
              }} />
            </div>
        }),
        ...(dashboardDetails?.permission_details.is_super_admin && {
          superAdmin: <div className="d-flex justify-content-center align-items-center">
            <Input type={'checkbox'} checked={el?.is_super_admin} onChange={() => {
              handleDesignationSuperAdminProcess(el)
            }} />
          </div>
        }),


      };
    });
  };

  const normalizedTicketTagData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: <div className="row"><div><Image variant={'rounded'} src={getPhoto(el?.photo)} /></div>
          <div className="pt-3 pl-2">{el.name}</div>
        </div>,
        tag: el?.code,

      };
    });
  };

  const normalizedBrandSectorData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,

      };
    });
  };
  useEffect(() => {


  if(showClosedTaskGroup===true||showClosedTaskGroup===false){
    CloseTaskGroup()
  

  }
   },[showClosedTaskGroup])

   useEffect(()=>{
    if(showTaskGroup===true){
      
      getTaskGroupList(taskGroupCurrentPages)
  
    }
     },[subCheckBox])

  const normalizedTaskGroupData = (data: any) => {
    return data.map((el: any,) => {

      return {
        name: <div className="row"><div><Image variant={'rounded'} src={getPhoto(el?.photo)} /></div>
          <div className="pt-3 pl-2">
            {el?.marked_as_closed === true ? <div className="text-primary">{el.name}</div> : <div>{el.name}</div>}
            <div className="pt-1">
              {el?.parent?.name}</div></div>
        </div>,
        tag:el?.code,
        "":(el.marked_as_closed?
        (el?.is_parent ?
          
        <MenuBar ListedData={menuItemOpen} onClick={(index)=>{
          setSubTaskItem(el)
         if(index===0)
         {
          editTaskGroupModal.show()
          setEditTask(el?.name)
          setEditCode(el?.code)
          setEditDescription(el?.description)
          setEditPhoto(el?.photo)
          setEditId(el?.id)
         }
         if(index===1)
         {
          addSubTaskModal.show()
         }
         if(index===2)
         {
          setClosedTaskGroup(false)
         
      
         }
        }}  />:
        <MenuBar ListedData={subGroupMenuItemOpen} onClick={(index)=>{
          setSubTaskItem(el)
         if(index===0)
         {
          editTaskGroupModal.show()
          setEditTask(el?.name)
          setEditCode(el?.code)
          setEditDescription(el?.description)
          setEditPhoto(el?.photo)
          setEditId(el?.id)
         }
        
         if(index===1)
         {
          setClosedTaskGroup(false)
         }
        }}  />

        )
        : (el?.is_parent ?
          <MenuBar ListedData={menuItemClose} onClick={(index)=>{
            setSubTaskItem(el)
            // console.log(el,"=======>")
           if(index===0)
           {
            editTaskGroupModal.show()
            setEditTask(el?.name)
            setEditCode(el?.code)
            setEditDescription(el?.description)
            setEditPhoto(el?.photo)
            setEditId(el?.id)
           }
           if(index===1)
           {
            addSubTaskModal.show()
           }
           if(index===2)
           {
            setClosedTaskGroup(true)
           }
          }}  />
          : 
          <MenuBar ListedData={subGroupMenuItemClose} onClick={(index)=>{
            setSubTaskItem(el)
           if(index===0)
           {
            editTaskGroupModal.show()
            setEditTask(el?.name)
            setEditCode(el?.code)
            setEditDescription(el?.description)
            setEditPhoto(el?.photo)
            setEditId(el?.id)
           }
        
           if(index===1)
           {
            setClosedTaskGroup(true)
           
      
           }
          }}  />
          ))

      };
    });
  };
  return (
    <>
      <div className="mx-3 mb--2">
        <div className=" row mt-2 ">
          <div className="col-sm-6  pr-2 mt-2">
            <>
              <Card className={'mb-3'} style={{ height: showDepartments ? dynamicHeight.dynamicHeight - 35 : "5em" }} >
                <div className="row">
                  <div className="col">
                    <h3>{translate("common.department")}</h3>
                  </div>
                  <div className="text-right mr-3 ">
                    <Button
                      text={
                        showDepartments
                          ? translate("course.hide")
                          : translate("course.view")
                      }
                      size={"sm"}
                      onClick={() => {
                        if (!showDepartments) {

                          getDepartmentList(departmentCurrentPages)
                        } else {
                          setShowDepartments(!showDepartments)
                        }
                      }}
                    />
                    <Button
                      text={translate("product.addItem")}
                      size={"sm"}
                      onClick={() => {
                        addDepartMentModal.show();
                      }}
                    />
                  </div>
                </div>

                <div
                  className="overflow-auto overflow-hide"
                  style={{
                    height: showDepartments ? dynamicHeight.dynamicHeight - 100 : '0px',
                    margin: '0px -39px 0px -39px'
                  }}
                >
                  {departmentDataList && departmentDataList?.length > 0 ? (
                    <CommonTable
                      isPagination
                      tableDataSet={departmentDataList}
                      displayDataSet={normalizedDepartmentData(departmentDataList)}
                      noOfPage={departmentNumOfPages}
                      currentPage={departmentCurrentPages}
                      paginationNumberClick={(currentPage) => {

                        getDepartmentList(paginationHandler("current", currentPage));

                      }}
                      previousClick={() => {
                        getDepartmentList(paginationHandler("prev", departmentCurrentPages))
                      }
                      }
                      nextClick={() => {
                        getDepartmentList(paginationHandler("next", departmentCurrentPages));
                      }
                      }


                    />) : (
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
            </>
            <>
              <Card className={'mb-3'} style={{ height: showSector ? dynamicHeight.dynamicHeight - 35 : "5em" }} >
                <div className="row">
                  <div className="col">
                    <h3>{translate("auth.sector")}</h3>
                  </div>

                  <div className="text-right mr-3 ">
                    <Button
                      text={
                        showSector
                          ? translate("course.hide")
                          : translate("course.view")
                      }
                      size={"sm"}
                      onClick={() => {
                        if (!showSector) {

                          getBrandSectorList(brandSectorCurrentPages)
                        } else {
                          setShowSector(!showSector)
                        }
                      }}
                    />
                    <Button
                      text={translate("product.addItem")}
                      size={"sm"}
                      onClick={() => {
                        addSectorModal.show();
                      }}
                    />
                  </div>
                </div>

                <div
                  className="overflow-auto overflow-hide"
                  style={{
                    height: showSector ? dynamicHeight.dynamicHeight - 100 : '0px',
                    margin: '0px -39px 0px -39px'
                  }}
                >
                  {brandSector && brandSector?.length > 0 ? (
                    <CommonTable
                      isPagination
                      tableDataSet={brandSector}
                      displayDataSet={normalizedBrandSectorData(brandSector)}
                      noOfPage={brandSectorNumOfPages}
                      currentPage={brandSectorCurrentPages}
                      paginationNumberClick={(currentPage) => {

                        getBrandSectorList(paginationHandler("current", currentPage));

                      }}
                      previousClick={() => {
                        getBrandSectorList(paginationHandler("prev", brandSectorCurrentPages))
                      }
                      }
                      nextClick={() => {
                        getBrandSectorList(paginationHandler("next", brandSectorCurrentPages));
                      }
                      }


                    />) : (
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
              
              <Card className={'mb-3'} style={{ height: showTaskGroup ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
                <div className="row">
                  <div className="col">
                    <h3>{translate("auth.group")}</h3>
                  </div>
                  <div className="col ">
          <Checkbox id={'0'} onClick={()=>{
             
            if(subCheckBox===false){
            setSubCheckBox(true)
         
          }
            else{
              setSubCheckBox(false)
            
            }
          }} text={'Include Close'}/>
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

            </>
          </div>
          <div className="col-sm-6 pl-2 pt-2">
            <>
              <Card className={'mb-3'} style={{ height: showDesignations ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
                <div className="row">
                  <div className="col">
                    <h3>{translate("auth.designation")}</h3>
                  </div>
                  <div className="text-right mr-3 ">
                    <Button
                      text={
                        showDesignations
                          ? translate("course.hide")
                          : translate("course.view")
                      }
                      size={"sm"}
                      onClick={() => {
                        if (!showDesignations) {
                          getDesignationList(designationCurrentPages);
                        } else {
                          setShowDesignations(!showDesignations)
                        }

                      }}
                    />
                    <Button
                      text={translate("product.addItem")}
                      size={"sm"}
                      onClick={() => { addDesignationModal.show() }}
                    />
                  </div>
                </div>


                <div
                  className="overflow-auto overflow-hide"
                  style={{
                    height: showDesignations ? dynamicHeight.dynamicHeight - 100 : '0px',
                    margin: '0px -39px 0px -39px'
                  }}
                >
                  {designationDataList && designationDataList?.length > 0 ? (
                    <CommonTable
                      isPagination
                      tableDataSet={designationDataList}
                      displayDataSet={normalizedDesignationData(designationDataList)}
                      noOfPage={designationNumOfPages}
                      currentPage={designationCurrentPages}
                      paginationNumberClick={(currentPage) => {

                        getDesignationList(paginationHandler("current", currentPage));

                      }}
                      previousClick={() => {
                        getDesignationList(paginationHandler("prev", designationCurrentPages))
                      }
                      }
                      nextClick={() => {
                        getDesignationList(paginationHandler("next", designationCurrentPages));
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
            </>
            <>
              <Card style={{ height: showTags ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
                <div className="row">
                  <div className="col">
                    <h3>{translate("auth.tags")}</h3>
                  </div>
                  <div className="text-right mr-3 ">
                    <Button
                      text={
                        showTags
                          ? translate("course.hide")
                          : translate("course.view")
                      }
                      size={"sm"}
                      onClick={() => {
                        if (!showTags) {
                          getTicketTagList(ticketTagCurrentPages);
                        } else {
                          setShowTags(!showTags)
                        }

                      }}
                    />
                    <Button
                      text={translate("product.addItem")}
                      size={"sm"}
                      onClick={() => { addTagsModal.show() }}
                    />
                  </div>
                </div>


                <div
                  className="overflow-auto overflow-hide"
                  style={{
                    height: showTags ? dynamicHeight.dynamicHeight - 100 : '0px',
                    margin: '0px -39px 0px -39px'
                  }}
                >
                  {ticketTag && ticketTag?.length > 0 ? (
                    <CommonTable
                      isPagination
                      tableDataSet={ticketTag}
                      displayDataSet={normalizedTicketTagData(ticketTag)}
                      noOfPage={ticketTagNumOfPages}
                      currentPage={ticketTagCurrentPages}
                      paginationNumberClick={(currentPage) => {

                        getTicketTagList(paginationHandler("current", currentPage));

                      }}
                      previousClick={() => {
                        getTicketTagList(paginationHandler("prev", ticketTagCurrentPages))
                      }
                      }
                      nextClick={() => {
                        getTicketTagList(paginationHandler("next", ticketTagCurrentPages));
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
            </>
          </div>
        </div>

        {/**
         * Department
         */}

        <Modal

          isOpen={addDepartMentModal.visible}
          onClose={() => addDepartMentModal.hide()}
          title={translate("common.department")!}
        >
          <div className="">
            <Input
              placeholder={translate("common.department")!}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="row ">
            <span className="col-2">
              <Checkbox id={'Admin'} text={'Admin'} defaultChecked={isAdmin} onCheckChange={() => { setIsAdmin(!isAdmin) }} />
            </span>
            <span className="col-2">
              <Checkbox id={'SuperAdmin'} text={'SuperAdmin'} defaultChecked={isSuperAdmin} onCheckChange={() => { setIsSuperAdmin(!isSuperAdmin) }} />
            </span>
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => {
                addDepartMentModal.hide()
                setDepartment('')
              }}
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                postAddingDepartment();
              }}
            />
          </div>
        </Modal>

        {/**
         * Designation
         */}

        <Modal
          isOpen={addDesignationModal.visible}
          onClose={() => addDesignationModal.hide()}
          title={translate("auth.designation")!}
        >
          <div className="">
            <Input
              placeholder={translate("auth.designation")!}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          <div className="row ">
            <span className="col-2">
              <Checkbox id={'Admin'} text={'Admin'} defaultChecked={isAdmin} onCheckChange={() => { setIsAdmin(!isAdmin) }} />
            </span>
            <span className="col-2">
              <Checkbox id={'SuperAdmin'} text={'SuperAdmin'} defaultChecked={isSuperAdmin} onCheckChange={() => { setIsSuperAdmin(!isSuperAdmin) }} />
            </span>
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => {
                addDesignationModal.hide()
                setDesignation('')
              }}
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                postAddingDesignation();
              }}
            />
          </div>
        </Modal>

        {/**
         * brand sector
         */}

        <Modal

          isOpen={addSectorModal.visible}
          onClose={() => addSectorModal.hide()}
          title={translate("auth.sector")!}
        >
          <div className="">
            <Input
              placeholder={translate("auth.sector")}
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            />
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => {
                addSectorModal.hide()
                setSector('')
              }}
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                addBrandSectorAdding();

              }}
            />
          </div>
        </Modal>

        {/**
         * TicketTag
         */}

        <Modal
          isOpen={addTagsModal.visible}
          onClose={() => {
            addTagsModal.hide()
            setTags("")
            setDescription('')
            setTagPhoto('')
            setTagCodeFill('')
          }
          }
          title={translate("auth.tags")!}
        >

          <div className="row">
            <div className="col-6">
              <Input
                placeholder={translate("auth.tags")}
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value)
                  setTagCodeFill(e.target.value.slice(0, 3).toUpperCase())
                }}
              />
            </div>
            <div className="col-6">  <Input
              placeholder={translate("auth.code")}
              value={TagCodeFill}
              onChange={(e) => { setTagCodeFill(e.target.value.slice(0, 3).toUpperCase()) }}
            />
            </div>
          </div>
          <div>
            <Input
              placeholder={translate("auth.description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="pb-3">
            <Dropzone
              variant="ICON"
              icon={tagPhoto}
              size="xl"
              onSelect={(image) => {
                let encoded = image.toString().replace(/^data:(.*,)?/, "");
                setTagPhoto(encoded);

              }}
            />
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => {
                addTagsModal.hide()
                setTags("")
                setDescription('')
                setTagPhoto('')
                setTagCodeFill('')
              }
              }
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                addTicketTagAdding();
              }}
            />
          </div>
        </Modal>

        {/**
         * brand sector
         */}

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
              onChange={(e) => {setAddSubTask(e.target.value)
                setAddSubTaskCode(e.target.value.slice(0,3).toUpperCase())}}
            />
            </div>
          <div className="pt-2 pr-2 text-sm"> {addSubTaskItem?.code}-</div>
           <div className="col-5">  <Input
            placeholder={translate("auth.code")}
              value={addSubTaskCode}
              onChange={(e) => {setAddSubTaskCode(e.target.value.slice(0,3).toUpperCase())}}
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
                        type="both"
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

        <Modal

          isOpen={editDepartmentModal.visible}
          onClose={() => {editDepartmentModal.hide()
         
            setEditIsAdmin(false)
            setEditIsSuperAdmin(false)
            setEditDepartment('')
          }}
          title={translate("auth.task")!}
        >
          <div className="">
            <Input
              placeholder={translate("common.department")!}
              value={editDepartment}
              onChange={(e) => setEditDepartment(e.target.value)}
            />
          </div>
          <div className="row ">
            <span className="col-2">
              <Checkbox id={'Admin'} text={'Admin'} defaultChecked={editIsAdmin} onCheckChange={() =>  { 
                if(editIsAdmin===true){
                setEditIsAdmin(false)
              }
              else{
                setEditIsAdmin(true)
              }

              if(editIsSuperAdmin===true){
                setEditIsSuperAdmin(false)
              }
              else{
                setEditIsSuperAdmin(true)
              }
              
              
              } }/>
            </span>
            <span className="col-2">
              <Checkbox id={'SuperAdmin'} text={'SuperAdmin'} defaultChecked={editIsSuperAdmin} onCheckChange={() => {
                   if(editIsSuperAdmin===true){
                    setEditIsSuperAdmin(false)
                  }
                  else{
                    setEditIsSuperAdmin(true)
                  }}} />
            </span>
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() =>{editDepartmentModal.hide()
                setEditIsAdmin(false)
            setEditIsSuperAdmin(false)
            setEditDepartment('')}}
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                postAddingDepartment();
              }}
            />
          </div>
        </Modal>

        <Modal
          isOpen={addSubDepartmentModal.visible}
          onClose={() => {addSubDepartmentModal.hide()
            setAddSubDepartment('')
            setAddSubDepartmentIsAdmin(false)
            setAddSubDepartmentIsSuperAdmin(false)}}
          title={translate("common.department")!}
        >
          <div className="">
            <Input
              placeholder={translate("common.department")!}
              value={addSubDepartment}
              onChange={(e) => setAddSubDepartment(e.target.value)}
            />
          </div>
          <div className="row ">
            <span className="col-2">
              <Checkbox id={'Admin'} text={'Admin'} defaultChecked={addSubDepartmentIsAdmin} onCheckChange={() => { setAddSubDepartmentIsAdmin(!addSubDepartmentIsAdmin) }} />
            </span>
            <span className="col-2">
              <Checkbox id={'SuperAdmin'} text={'SuperAdmin'} defaultChecked={addSubDepartmentIsSuperAdmin} onCheckChange={() => {setAddSubDepartmentIsSuperAdmin(!addSubDepartmentIsSuperAdmin) }} />
            </span>
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() =>{
                addSubDepartmentModal.hide()
                setAddSubDepartment('')
                setAddSubDepartmentIsAdmin(false)
                setAddSubDepartmentIsSuperAdmin(false)
               
              }}
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                postAddingSubDepartment();
              }}
            />
          </div>
        </Modal>

        

      </div>
    </>
  )
}

export { Settings };
