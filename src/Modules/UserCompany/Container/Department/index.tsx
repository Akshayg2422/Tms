import { icons } from "@Assets";
import {
  Button,
  Card,
  Checkbox,
  CommonTable,
  Input,
  MenuBar,
  Modal,
  NoRecordsFound,
  Spinner
} from "@Components";
import { useDynamicHeight, useInput, useLoader, useModal } from "@Hooks";
import { translate } from "@I18n";
import { addDepartment, getDepartments } from "@Redux";
import { paginationHandler, capitalizeFirstLetter, INITIAL_PAGE } from "@Utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Department() {
  const {
    departments,
    departmentsCurrentPages,
    departmentsNumOfPages,
    dashboardDetails
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );


  const dynamicHeight: any = useDynamicHeight()
  const [showDepartments, setShowDepartments] = useState(false);
  const isUserAdmin = dashboardDetails?.permission_details?.is_admin
  const isUserSuperAdmin = dashboardDetails?.permission_details?.is_super_admin
  const addDepartmentModal = useModal(false)
  const departmentName = useInput('')
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(undefined);
  const [isSubTask, setIsSubTask] = useState(false);
  const [loading, setLoading] = useState(false)
  const loginLoader = useLoader(false)



  function addDepartmentApiHandler(params: object) {
    loginLoader.show()

    dispatch(
      addDepartment({
        params,
        onSuccess: (success: any) => () => {
          getDepartmentList(departmentsCurrentPages)
          addDepartmentModal.hide()
          loginLoader.hide()
          resetValues()
        },
        onError: (error: string) => () => {
          loginLoader.hide()
        },
      })
    );

  }
  const getDepartmentMenu = (is_parent: boolean) => [
    { id: '0', name: "Edit", icon: icons.edit },
    ...(is_parent ? [{ id: '1', name: "Create Sub Department", icon: icons.addSub }] : [])
  ]

  const dispatch = useDispatch();


  const getDepartmentList = (page_number: number) => {
    setLoading(true)
    const params = {
      page_number
    };

    dispatch(
      getDepartments({
        params,
        onSuccess: (response: any) => () => {


          setLoading(false)

        },
        onError: (error: string) => () => {
          setLoading(false)

        },
      })
    );

  };

  const normalizedDepartmentData = (data: any) => {
    return data.map((item: any, index: any) => {
      const { name, id, is_admin, is_super_admin, is_parent, parent } = item
      return {
        name: <div >
          <span>{capitalizeFirstLetter(name)}</span><br></br>
          {!is_parent && <small>{parent?.name}</small>
          }
        </div>,
        ...(isUserAdmin ? {
          Admin:
            <div className="mb--4">
              <Checkbox id={id + "_admin"} defaultChecked={is_admin} checked={is_admin} onCheckChange={(checked) => {
                const params = {
                  is_admin: checked,
                  id: id,
                  name
                };

                addDepartmentApiHandler(params)
              }} />
            </div>
        } : {}),
        ...(isUserSuperAdmin ? {
          'Super Admin':
            <div className="mb--4">
              <Checkbox id={id + "super_admin"} defaultChecked={is_super_admin} checked={is_super_admin} onCheckChange={(checked) => {
                const params = {
                  is_super_admin: checked,
                  id: id,
                  name
                };
                addDepartmentApiHandler(params)
              }} />
            </div>
        } : {}),
        '':
        ((isUserAdmin||isUserSuperAdmin) &&
        <MenuBar menuData={getDepartmentMenu(is_parent)} onClick={(el) => {


          if (el?.id === '0') {
            setSelectedDepartment(item)
            const { name, is_admin, is_super_admin } = item
            departmentName.set(name)
            setIsAdmin(is_admin)
            setIsSuperAdmin(is_super_admin)
            setIsSubTask(false)
          } else if (el?.id === '1') {
            setIsSubTask(true)
            setSelectedDepartment(item)
            resetValues()
          }

          addDepartmentModal.show()



        }} />
        )
      };
    });
  };

  function resetValues() {
    departmentName.set('')
    setIsAdmin(false)
    setIsSuperAdmin(false)
  }

  return (
    <>
      <div className={'card justify-content-center'} style={{ height: showDepartments ? dynamicHeight.dynamicHeight - 35 : "5em" }} >
        <div className="row mx-2">
          <div className="col">
            <h3>{translate("common.department")}</h3>
          </div>
          <div className="text-right mr-3 ">
            <Button
              className={'text-white'}
              text={
                showDepartments
                  ? translate("course.hide")
                  : translate("course.view")
              }
              size={"sm"}
              onClick={() => {
                setShowDepartments(!showDepartments)

                if (!showDepartments) {

                  departmentsCurrentPages ? getDepartmentList(departmentsCurrentPages) : getDepartmentList(INITIAL_PAGE)
                }

              }}
            />
            <Button
              className={'text-white'}
              text={translate("product.addItem")}
              size={"sm"}
              onClick={() => {
                addDepartmentModal.show()
                setSelectedDepartment(undefined)
                setIsSubTask(false)
              }
              }
            />
          </div>
        </div>

        <div
          className="overflow-auto overflow-hide"
          style={{
            height: showDepartments ? dynamicHeight.dynamicHeight - 100 : '0px',
          }}
        >
          {
            loading && (
              <div className='d-flex justify-content-center align-item-center' style={{ marginTop: '200px' }}>
                <Spinner />
              </div>
            )
          }

          {departments && departments?.length > 0 ? (
            <CommonTable
              isPagination
              tableDataSet={departments}
              displayDataSet={normalizedDepartmentData(departments)}
              noOfPage={departmentsNumOfPages}
              currentPage={departmentsCurrentPages}
              paginationNumberClick={(currentPage) => {

                getDepartmentList(paginationHandler("current", currentPage));

              }}
              previousClick={() => {
                getDepartmentList(paginationHandler("prev", departmentsCurrentPages))
              }
              }
              nextClick={() => {
                getDepartmentList(paginationHandler("next", departmentsCurrentPages));
              }
              }

            />) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <NoRecordsFound />
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={addDepartmentModal.visible}
        onClose={() => {
          addDepartmentModal.hide()
          resetValues()
        }}
        title={translate("common.department")!}
        size='md'
      >
        <Input
          placeholder={'Enter Department'}
          value={departmentName.value}
          onChange={departmentName.onChange}
        />

        <div className="row">
          <span className="col-2">
            {(isUserAdmin && isSubTask ? selectedDepartment?.is_admin : true) && <Checkbox id={'Admin'} text={'Admin'} defaultChecked={isAdmin} onCheckChange={() => { setIsAdmin(!isAdmin) }} />}
          </span>
          <span className="col-2">
            {(isUserSuperAdmin && isSubTask ? selectedDepartment?.is_super_admin : true) && <Checkbox id={'SuperAdmin'} text={'SuperAdmin'} defaultChecked={isSuperAdmin} onCheckChange={() => { setIsSuperAdmin(!isSuperAdmin) }} />}
          </span>
        </div>

        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={addDepartmentModal.hide}
          />
          <Button
            text={translate("common.submit")}
            loading={loginLoader.loader}
            onClick={() => {

              const params = {
                ...((!isSubTask && selectedDepartment) && { id: selectedDepartment?.id }),
                ...((isSubTask && selectedDepartment) && { parent_id: selectedDepartment?.id }),
                name: departmentName.value,
                is_admin: isAdmin,
                is_super_admin: isSuperAdmin,
              }
              addDepartmentApiHandler(params);
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export { Department };
