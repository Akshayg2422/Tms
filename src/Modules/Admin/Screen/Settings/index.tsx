import React, { useState } from "react";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
} from "@Components";
import { translate } from "@I18n";
import {
  addDepartment,
  addDesignation,
  getDepartmentData,
  getDesignationData,
} from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler } from "@Utils";
import { useModal, useDynamicHeight } from "@Hooks";

function Settings() {
  const dispatch = useDispatch();
  const { departmentData, designationData,  departmentCurrentPages, departmentNumOfPages, designationCurrentPages,designationNumOfPages } = useSelector(
    (state: any) => state.AdminReducer
  );
  // console.log(departmentData,"departmentData--------->");
  // console.log(departmentNumOfPages,"departmentData--------->");
  // console.log(departmentCurrentPages,"departmentData--------->");
  console.log(departmentCurrentPages,"bbbbbbbbbcccccccccccc");
  

  const [showDepartments, setShowDepartments] = useState(false);
  const [showDesignations, setShowDesignations] = useState(false);

  const addDepartMentModal = useModal(false);
  const addDesignationModal = useModal(false);

  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const dynamicHeight: any = useDynamicHeight()



  const getDepartmentList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber
    };
    dispatch(
      getDepartmentData({
        params,
        onSuccess: (success: any) => () => {
          if(!showDepartments){
           setShowDepartments(!showDepartments)
          }
        },
        onError: (error: string) => () => {

        },
      })
    );
    
  };
  

  const getDesignationList = (pageNumber: number) => {
    console.log(pageNumber,"----------->");
    

    const params = {
      page_number: pageNumber
    };

    dispatch(
      getDesignationData({
        params,
        onSuccess: (success: any) => () => {

          if(!showDesignations){
           
            
          setShowDesignations(!showDesignations)
          }
        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  const postAddingDepartment = () => {
    const params = {
      name: convertToUpperCase(department),
    };

    dispatch(
      addDepartment({
        params,
        onSuccess: (success: any) => () => {
          addDepartMentModal.hide()
          dispatch(
            getDepartmentData({
              params,
              onSuccess: (success: any) => () => { },
              onError: (error: string) => () => { },
            })
          );
          setDepartment("");
          showToast(success.message, "success");
        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  const postAddingDesignation = () => {
    const params = {
      name: convertToUpperCase(designation),
      is_admin: true,
    };

    dispatch(
      addDesignation({

        params,
        onSuccess: (success: any) => () => {
          addDesignationModal.hide()

          dispatch(
            getDesignationData({
              params,
              onSuccess: (success: any) => () => { },
              onError: (error: string) => () => { },
            })
          );
          setDesignation("");
          showToast(success.message, "success");
        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  const normalizedDepartmentData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        Admin:
        <div className="d-flex justify-content-center ">
        <Input className="form-check-input" type="checkbox" id="flexCheckDefault"></Input>
        </div>,
       superAdmin: <div className="d-flex justify-content-center ">
       <Input className="form-check-input" type="checkbox" id="flexCheckDefault"></Input>
       </div>,
       edit:<i className="bi bi-pencil"></i>,
      };
    });
  };

  const normalizedDesignationData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
         Admin:
         <div className="d-flex justify-content-center ">
         <Input className="form-check-input" type="checkbox" id="flexCheckDefault"></Input>
         </div>,
        superAdmin: <div className="d-flex justify-content-center ">
        <Input className="form-check-input" type="checkbox" id="flexCheckDefault"></Input>
        </div>,
        edit:<i className="bi bi-pencil "></i>,

      };
    });
  };



  return (
    <>
      <div className="mx-3">
        <div className=" row mt-2 ">
          <div className="col-sm-6 mb-0 pr-2 mt-2">
            <>
              <Card style={{ height: showDepartments ? dynamicHeight.dynamicHeight - 35 : "5em" }} >
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
                  {departmentData && departmentData?.length > 0 ? (
                    <CommonTable
                    isPagination
                    tableDataSet={departmentData}
                    displayDataSet={normalizedDepartmentData(departmentData)}
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
          </div>
          <div className="col-sm-6 pl-2 pt-2">
            <>
              <Card style={{ height: showDesignations ? dynamicHeight.dynamicHeight - 35 : '5em' }}>
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
                  {designationData && designationData?.length > 0 ? (
                    <CommonTable
                    isPagination
                    tableDataSet={designationData}
                    displayDataSet={normalizedDesignationData(designationData)}
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
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => addDepartMentModal.hide()}
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
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => addDesignationModal.hide()}
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                postAddingDesignation();
              }}
            />
          </div>
        </Modal>
      </div>
    </>
  )
}

export { Settings };
