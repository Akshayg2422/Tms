import { addDepartment, getDepartmentData } from "@Redux";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ADD_DEPARTMENT, ADD_DESIGNATION, ADD_SECTOR, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP, getPhoto, ADD_SUB_TASK_GROUP } from "@Utils";
import { useDynamicHeight, useModal } from "@Hooks";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
  Checkbox,
 
  MenuBar,
  DateTimePicker
} from "@Components";
import { translate } from "@I18n";

function Department() {
  const { 
 
    dashboardDetails,
  

  } = useSelector(
    (state: any) => state.AdminReducer
  );

  const { 
    departmentData,
     departmentCurrentPages,
      departmentNumOfPages,
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );
  const subDepartment=[
    {id:'0',name:"Edit",icon:'bi bi-pencil'},
    {id:'1',name:"Create SubDepartment",icon:'bi bi-file-earmark-plus'}
  ]
  
  const subChildDepartments=[
    {id:'0',name:"Edit",icon:'bi bi-pencil'},
  ]
  const dynamicHeight: any = useDynamicHeight()
  const [showDepartments, setShowDepartments] = useState(false);
  const [departmentDataList, setDepartmentDataList] = useState(departmentData);
  const [department, setDepartment] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editIsAdmin, setEditIsAdmin] = useState<boolean>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [editIsSuperAdmin, setEditIsSuperAdmin] = useState<boolean>();
  const [addSubDepartmentItem,setAddSubDepartmentItem]=useState<any>('')
  const addDepartMentModal = useModal(false);
  const editDepartmentModal=useModal(false);
  const [addSubDepartment, setAddSubDepartment] = useState("");
  const [addSubDepartmentIsAdmin, setAddSubDepartmentIsAdmin] = useState(false);
  const [addSubDepartmentIsSuperAdmin, setAddSubDepartmentIsSuperAdmin] = useState(false);
  const addSubDepartmentModal=useModal(false)

  console.log(editIsSuperAdmin,"uuuuuuuuuu")
  const dispatch = useDispatch();

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


  const postAddingDepartment = () => {
    const params = {
      name:editDepartment?convertToUpperCase(editDepartment):convertToUpperCase(department),
      is_admin:editDepartment?editIsAdmin:isAdmin,
      ...(isSuperAdmin||addSubDepartmentItem.id && { is_super_admin:editDepartment?editIsSuperAdmin:isSuperAdmin }),
      ...(addSubDepartmentItem?.id &&{id:addSubDepartmentItem.id})
    };
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


  return (
    <div>  <>
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
              if(editIsAdmin===false){
             
                setEditIsAdmin(true)
              }
            
              
              } }/>
            </span>
            <span className="col-2">
              <Checkbox id={'SuperAdmin'} text={'SuperAdmin'} defaultChecked={editIsSuperAdmin} onCheckChange={() => {
               
                   if(editIsSuperAdmin===true){
                  
                    setEditIsSuperAdmin(false)
                   
                  }
                  if(editIsSuperAdmin===false){
                  
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
        </Modal></div>
  )
}

export { Department}