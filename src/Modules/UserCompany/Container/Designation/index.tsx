import { addDesignation, getDesignations } from '@Redux';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ADD_DESIGNATION, ifObjectExist, validate, getValidateError, INITIAL_PAGE } from "@Utils";
import { useDynamicHeight, useModal, useInput } from "@Hooks";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
  Checkbox,
} from "@Components";
import { translate } from "@I18n";


function Designation() {

  const {
    designations,
    designationCurrentPages,
    designationNumOfPages,
    dashboardDetails
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );
  const isUserAdmin = dashboardDetails.permission_details.is_admin
  const isUserSuperAdmin = dashboardDetails.permission_details.is_super_admin


  const dispatch = useDispatch();



  const dynamicHeight: any = useDynamicHeight()

  const [showDesignations, setShowDesignations] = useState(false);
  const addDesignationModal = useModal(false);

  const designationName = useInput('')
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);



  const getDesignationApiHandler = (page_number: number) => {
    const params = {
      page_number
    };

    dispatch(
      getDesignations({
        params,
        onSuccess: (response: any) => () => {
        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  const addDesignationApiHandler = (params: any) => {

    const validation = validate(ADD_DESIGNATION, params)

    if (ifObjectExist(validation)) {
      dispatch(
        addDesignation({
          params,
          onSuccess: (success: any) => () => {
            addDesignationModal.hide()
            getDesignationApiHandler(designationCurrentPages)
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

  return (
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
                setShowDesignations(!showDesignations)
                if (!showDesignations) {
                  getDesignationApiHandler(INITIAL_PAGE);
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
          }}>
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
      >

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
            onClick={() => {

              const params = {
                name: designationName.value,
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

export { Designation }