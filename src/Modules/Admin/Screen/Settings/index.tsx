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
import { useModal } from "@Hooks";

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


  const getDepartmentList = () => {
    const params = {};

    dispatch(
      getDepartmentData({
        params,
        onSuccess: (success: any) => () => {
          setShowDepartments(!showDepartments)

        },
        onError: (error: string) => () => {

        },
      })
    );
  };

  const getDesignationList = () => {

    const params = {};

    dispatch(
      getDesignationData({
        params,

        onSuccess: (success: any) => () => {


          setShowDesignations(!showDesignations)
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

          dispatch(getDepartmentData({}));
          setDepartment("");
          showToast("success", success.message);
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

          dispatch(getDesignationData({}));
          setDesignation("");
          showToast("success", success.message);
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
      <div className=" container">
        <div className=" row mt-2 ">
          <div className="col-sm-6 mb-0 pr-2">
            <>
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
              </Card>
              <div
                className="overflow-auto overflow-hide mt--4"
                style={{
                  height: showDepartments ? "30.5rem" : "0vh",
                }}
              >
                {departmentData && departmentData?.length > 0 ? (
                  <CommonTable
                    displayDataSet={normalizedDepartmentData(departmentData)} />) : (
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
            </>
          </div>
          <div className="col-sm-6 pl-2">
            <>
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
              </Card>

              <div
                className="overflow-auto overflow-hide mt--4"
                style={{
                  height: showDesignations ? "30.5rem" : "0vh",

                }}
              >
                {designationData && designationData.data.length > 0 ? (
                  <CommonTable
                    displayDataSet={normalizedDesignationData(designationData.data)}
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
