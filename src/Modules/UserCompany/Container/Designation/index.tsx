import {
  Button,
  Card,
  Checkbox,
  CommonTable,
  DropDown,
  Input,
  Modal,
  NoRecordsFound,
  Spinner,
  showToast,
} from "@Components";
import { useDropDown, useDynamicHeight, useInput, useLoader, useModal } from "@Hooks";
import { translate } from "@I18n";
import { addDesignation, getDepartments, getDesignations } from '@Redux';
import { ADD_DESIGNATION, INITIAL_PAGE, getDropDownDisplayData, getValidateError, ifObjectExist, paginationHandler, type, validate } from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


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
  console.log('department======>', departments);

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


  useEffect(() => {


    const params = {
      branch_id: dashboardDetails?.permission_details?.branch_id,
      per_page_count: -1,

    };

    dispatch(
      getDepartments({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => {
        },
      })

    );



  }, [])

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
      };
    });
  };


  function resetValues() {
    designationName.set('')

    setIsAdmin(false)
    setIsSuperAdmin(false)
  }

  const getExternalCompanyStatus = () => ((taskType && taskType?.id === "2") || company.value?.id)

  return (
    <>
      <div className={'card justify-content-center'} style={{
        height: showDesignations ? dynamicHeight.dynamicHeight - 35 : '5em',
      }}>
        <div className="row mx-2">
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
              onClick={() => { addDesignationModal.show() }}
            />
          </div>
        </div>


        <div
          className="overflow-auto overflow-hide"
          style={{
            height: showDesignations ? dynamicHeight.dynamicHeight - 100 : '0px',
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
      </div>

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
          getExternalCompanyStatus() && departments && departments.length > 0 &&

          <div className="mt--2">
            <DropDown

              placeHolder={translate("order.Select a Department")!}
              data={getDropDownDisplayData(departments)}
              onChange={(item) => {
                department.onChange(item)
              }}
              selected={department.value}
            />
          </div>
        }

        <Input
          placeholder={translate("auth.designation")!}
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
                name: designationName.value,
                department_id: department.value?.id,
                is_admin: isAdmin,
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

export { Designation };
