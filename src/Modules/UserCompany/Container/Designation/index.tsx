import { addDesignation, getDepartments, getDesignations, getEmployees } from '@Redux';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ADD_DESIGNATION, ifObjectExist, validate, getValidateError, INITIAL_PAGE, type, getDropDownDisplayData } from "@Utils";
import { useDynamicHeight, useModal, useInput, useLoader, useDropDown } from "@Hooks";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
  Checkbox,
  Spinner,
  DropDown,
  MenuBar,
} from "@Components";
import { translate } from "@I18n";
import { icons } from '@Assets';


function Designation() {

  const {
    designations,
    departments,
    designationCurrentPages,
    designationNumOfPages,
    dashboardDetails,

  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );
  const DEFAULT_COMPANY = { id: dashboardDetails?.permission_details?.branch_id, display_name: '𝗦𝗘𝗟𝗙', name: 'self' }
  const isUserAdmin = dashboardDetails?.permission_details?.is_admin
  const isUserSuperAdmin = dashboardDetails?.permission_details?.is_super_admin
  const company = useDropDown(DEFAULT_COMPANY)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const [taskType, setTaskType] = useState(type[1]);
  const department = useDropDown({})
  const dynamicHeight: any = useDynamicHeight()
  const [showDesignations, setShowDesignations] = useState(false);
  const addDesignationModal = useModal(false);
  const designationName = useInput('')
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const loginLoader = useLoader(false)
  const [ selectDesignation,setSelectedDesignation]=useState<any>()
  const [isDelete,setDelete]=useState(false)

  console.log(selectDesignation,"selectDesignation====")
 

  const getDesignationMenu = () => [
    { id: '0', name: "Edit", icon: icons.edit },
    { id: '1', name: "Delete", icon: icons.delete }
  ]

  const getDesignationApiHandler = (page_number: number) => {

    

    setLoading(true)
    const params = {
      page_number,
      // per_page_count: -1,

    };
    loginLoader.show()
    dispatch(
      getDesignations({
        params,
        onSuccess: (response: any) => () => {
          setLoading(false)
          loginLoader.hide()
        },
        onError: (error: string) => () => {
          setLoading(false)
          loginLoader.hide()
        },
      })
    );
  };


  const addDesignationApiHandler = (params: any) => {

    const validation = validate(ADD_DESIGNATION, params)

    if (ifObjectExist(validation)) {
      loginLoader.show()
      dispatch(
        addDesignation({
          params,
          onSuccess: (success: any) => () => {
            addDesignationModal.hide()
            loginLoader.hide()
            getDesignationApiHandler(designationCurrentPages)
            resetValues()
            setSelectedDesignation('')
          },
          onError: (error: string) => () => {
            loginLoader.hide()
            showToast('Designation is already exists');
          },
        })
      );
    }
    else {
      setTaskType(type[1])
      showToast(getValidateError(validation));
    }
  };


  const getDepartmentList = () => {
    const params = {
      branch_id: dashboardDetails?.permission_details?.branch_id,
      per_page_count: -1,

    };

    dispatch(
      getDepartments({
        params,
        onSuccess: (response) => () => {

        },
        onError: () => () => {

        },
      })

    );
  }





  const normalizedDesignationData = (data: any) => {

    return data.map((el: any) => {

      const { name, id, is_admin, is_super_admin } = el

      return {
        name: name,
        ...(isUserAdmin && {
          Admin:
            <div className="mb--4">
              <Checkbox id={id + "_admin"} defaultChecked={is_admin} checked={is_admin} onCheckChange={(checked) => {
                const params = {
                  is_admin: checked,
                  id: id,
                  name
                };
                addDesignationApiHandler(params)

              }} />
            </div>
        }),
        ...(isUserSuperAdmin && {
          'Super Admin':
            <div className="mb--4">
              <Checkbox id={id + "super_admin"} defaultChecked={is_super_admin} checked={is_super_admin} onCheckChange={(checked) => {
                const params = {
                  is_super_admin: checked,
                  id: id,
                  name
                };
                addDesignationApiHandler(params)

              }} />


            </div>
        }),

'': 
 ((isUserAdmin||isUserSuperAdmin) &&
<MenuBar menuData={getDesignationMenu()} onClick={(item) => {


  if (item?.id === '0') {
 
    setSelectedDesignation(el)
    const { name, is_admin, is_super_admin } = el
    designationName.set(name)
     department.set({id:'6137b9c7-c7e4-429b-8cb3-ed018fe544e9',text:'Mobile developer '})
    setIsAdmin(is_admin)
    resetValues()
    setIsSuperAdmin(is_super_admin)
    
  addDesignationModal.show()
    // setIsSubTask(false)
  }
   else if (item?.id === '1') {
    const { name, is_admin, is_super_admin } = el
    // setIsSubTask(true)
    setSelectedDesignation(el)
    setDelete(true)
    designationName.set(name)
    // department.set({})
    // department.set({id:'6137b9c7-c7e4-429b-8cb3-ed018fe544e9',text:'Mobile developer',name:'Mobile developer'})
    setIsAdmin(is_admin)
    resetValues()
    setIsSuperAdmin(is_super_admin)
  }

}} />
)
        
      };
    });
  };


  function resetValues() {
    designationName.set('')
    department.set({})
    setIsAdmin(false)
    setIsSuperAdmin(false)
    setDelete(false)

  }


  return (
    <>
      <Card className={'mb-3'} style={{
        height: showDesignations ? dynamicHeight.dynamicHeight - 35 : '5em',
      }}>
        <div className="row">
          <div className="col">
            <h3>{translate("auth.designation")}</h3>
          </div>

          <div className="text-right mr-3 ">
            <Button
              className={'text-white'}
              text={
                showDesignations
                  ? translate("course.hide")
                  : translate("course.view")
              }
              size={"sm"}
              onClick={() => {
                setShowDesignations(!showDesignations)
                if (!showDesignations) {
                  getDesignationApiHandler(INITIAL_PAGE);
                }
              }}
            />
            <Button
              className={'text-white'}
              text={translate("product.addItem")}
              size={"sm"}
              onClick={() => {
                addDesignationModal.show()
                getDepartmentList()
              }}
            />
          </div>
        </div>


        <div
          className="overflow-auto overflow-hide"
          style={{
            height: showDesignations ? dynamicHeight.dynamicHeight - 100 : '0px',
            marginLeft: "-23px",
            marginRight: "-23px"
          }}>
          {
            loading && (
              <div className='d-flex justify-content-center align-item-center' style={{ marginTop: '200px' }}>
                <Spinner />
              </div>
            )
          }
          {designations && designations?.length > 0 ? (
            <CommonTable
              isPagination
              tableDataSet={designations}
              displayDataSet={normalizedDesignationData(designations)}
              noOfPage={designationNumOfPages}
              currentPage={designationCurrentPages}
              paginationNumberClick={(currentPage) => {
                getDesignationApiHandler(paginationHandler("current", currentPage));
              }}
              previousClick={() => {
                getDesignationApiHandler(paginationHandler("prev", designationCurrentPages))
              }
              }
              nextClick={() => {
                getDesignationApiHandler(paginationHandler("next", designationCurrentPages));
              }
              }

            />
          ) : (
            <div
              className="h-100 d-flex justify-content-center align-items-center">
              <NoRecordsFound />
            </div>
          )}
        </div>
      </Card>

      {
        /**
         * add Designation Modal
         */
      }

      <Modal
        isOpen={addDesignationModal.visible}
        onClose={() => {
          addDesignationModal.hide()
          resetValues()
        }}
        title={translate("auth.designation")!}
        size='md'
      >
        {
          departments && departments.length > 0 &&
          <DropDown
            heading={translate("common.department")}
            placeHolder={translate("order.Select a Department")!}
            data={getDropDownDisplayData(departments)}
            onChange={(item) => {
              department.onChange(item)
            }}
            selected={department.value}
          />
        }
        <Input
          placeholder={'Enter Designation'}
          value={designationName.value}
          onChange={designationName.onChange}
        />

        <div className="col">
          <div className='row'>
            {isUserAdmin && <Checkbox id={'admin'} text={'Admin'} defaultChecked={isAdmin} onCheckChange={setIsAdmin} />}
            <div className='ml-5'>
              {isUserSuperAdmin && <Checkbox id={'super-admin'} text={'SuperAdmin'} defaultChecked={isSuperAdmin} onCheckChange={setIsSuperAdmin} />}
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              addDesignationModal.hide()
              resetValues()
            }}
          />
          <Button
            text={translate("common.submit")}
            loading={loginLoader.loader}
            onClick={() => {

              const params = {
                ...(selectDesignation && { id: selectDesignation?.id }),
                name: designationName.value,
                department_id: department.value?.id,
                is_admin: isAdmin,
                ...(isDelete && {is_delete:isDelete}),
                ...(isSuperAdmin && { is_super_admin: isSuperAdmin })
              };

              addDesignationApiHandler(params)
            }}
          />
        </div>
      </Modal>
    </>

  )
}

export { Designation }