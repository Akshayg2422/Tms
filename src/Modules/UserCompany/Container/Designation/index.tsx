import { addDesignation, getDesignationData } from '@Redux';
import React, {  useState } from "react";
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

} from "@Components";
import { translate } from "@I18n";


function Designation() {

    const { 
         designationData, 
          designationCurrentPages, 
          designationNumOfPages,
      } = useSelector(
        (state: any) => state.UserCompanyReducer
      );
    
    const dispatch = useDispatch();
    
    const { 

        dashboardDetails,
      } = useSelector(
        (state: any) => state.AdminReducer
      );
      const dynamicHeight: any = useDynamicHeight()
      const [showDesignations, setShowDesignations] = useState(false);
      const addDesignationModal = useModal(false);
      const [designation, setDesignation] = useState("");
      const [designationDataList, setDesignationDataList] = useState(designationData);
      const [isAdmin, setIsAdmin] = useState(false);
      const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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
                getDesignationList( designationCurrentPages)
           
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
    
  return (
    <div>  <>
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
  </></div>
  )
}

export {Designation}