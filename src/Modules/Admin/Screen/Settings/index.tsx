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
import { convertToUpperCase } from "@Utils";
import { useLoader, useModal } from "@Hooks";

function Settings() {
  const dispatch = useDispatch();
  const { departmentData, designationData } = useSelector(
    (state: any) => state.AdminReducer
  );

  const [showDepartments, setShowDepartments] = useState(false);
  const [showDesignations, setShowDesignations] = useState(false);

  const addDepartMentModal = useModal(false);
  const addDesignationModal = useModal(false);

  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const departmentListLoader = useLoader(false);
  const designationListLoader = useLoader(false);
  const postAddingDepartmentLoader = useLoader(false);
  const postAddingDesignationLoader = useLoader(false);

  const getDepartmentList = () => {
    const params = {};

    dispatch(
      getDepartmentData({
        params,
        onSuccess: (success: any) => {
        setShowDepartments(!showDepartments)
          departmentListLoader.hideLoader();
        },
        onError: (error: string) => {
          departmentListLoader.hideLoader();
        },
      })
    );
  };

    const getDesignationList = () => {
      const params = {};

      dispatch(
        getDesignationData({
          params,
          onSuccess: (success: any) => {
            designationListLoader.hideLoader();
            setShowDesignations(!showDesignations)
          },
          onError: (error: string) => {
            designationListLoader.hideLoader();
          },
        })
      );
    };

    const postAddingDepartment = () => {
      const params = {
        name: convertToUpperCase(department),
      };
      postAddingDepartmentLoader.showLoader();
      dispatch(
        addDepartment({
          params,
          onSuccess: (success: any) => {
            addDepartMentModal.hide()
            postAddingDepartmentLoader.hideLoader();
            dispatch(getDepartmentData({}));
            setDepartment("");
            showToast("success", success.message);
          },
          onError: (error: string) => {
            postAddingDepartmentLoader.hideLoader();
          },
        })
      );
    };

    const postAddingDesignation = () => {
      const params = {
        name: convertToUpperCase(designation),
        is_admin: true,
      };
      postAddingDesignationLoader.showLoader();
      dispatch(
        addDesignation({
          params,
          onSuccess: (success: any) => {
            addDesignationModal.hide()
            postAddingDesignationLoader.hideLoader();
            dispatch(getDesignationData({}));
            setDesignation("");
            showToast("success", success.message);
          },
          onError: (error: string) => {
            postAddingDesignationLoader.hideLoader();
          },
        })
      );
    };

  const normalizedDepartmentData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
      };
    });
  };

  const normalizedDesignationData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
      };
    });
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row pt-4">
          <div className="col-sm-6 mt-2">
            <Card>
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
                        getDepartmentList();
                      }else{
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
                className="overflow-auto mt-0"
                style={{
                  height: showDepartments ? "" : "0vh",
                }}
              >
                {departmentData && departmentData?.length > 0 ? (
                  <CommonTable
                    displayDataSet={normalizedDepartmentData(departmentData)}
                    isLoading={departmentListLoader.loader}
                  />
                ) : (
                  <div
                    className=" d-flex justify-content-center align-items-center"
                    style={{
                      height: "80.5vh",
                    }}
                  >
                    <NoRecordsFound />
                  </div>
                )}
              </div>
            </Card>
          </div>
          <div className="col-sm-6 mt-2">
            <Card>
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
                            getDesignationList();
                          }else{
                            setShowDesignations(!showDesignations)
                          }
                      
                    }}
                  />
                  <Button
                    text={translate("product.addItem")}
                    size={"sm"}
                    onClick={() =>{ addDesignationModal.show()} }
                  />
                </div>
              </div>

              <div
                className="overflow-auto mt-0"
                style={{
                  height: showDesignations ? "" : "0vh",
                 
                }}
              >
                {designationData && designationData?.length > 0 ? (
                  <CommonTable
                    displayDataSet={normalizedDesignationData(designationData)}
                    isLoading={designationListLoader.loader}
                  />
                ) : (
                  <div
                    className=" d-flex justify-content-center align-items-center"
                    style={{
                      height: "80.5vh",
                    }}
                  >
                    <NoRecordsFound />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/**
         * Department
         */}

        <Modal
          isModalLoading={postAddingDepartmentLoader.loader}
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
          isModalLoading={postAddingDesignationLoader.loader}
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
  );
}

export { Settings };
