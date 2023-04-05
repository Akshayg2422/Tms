import React, { useState } from "react";
import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  showToast,
  Checkbox
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
import { convertToUpperCase, paginationHandler, ADD_DEPARTMENT, ADD_DESIGNATION, ADD_SECTOR, ADD_TAG, ifObjectExist, validate, getValidateError, ADD_TASK_GROUP } from "@Utils";
import { useModal, useDynamicHeight } from "@Hooks";
import { log } from "console";

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
  const [departmentDataList, setDepartmentDataList] = useState(departmentData);
  const [designationDataList, setDesignationDataList] = useState(designationData);
  const [showTaskGroup, setShowTaskGroup] = useState(false);
  const addTaskGroupModal = useModal(false);
  const [task, setTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const dynamicHeight: any = useDynamicHeight()


  console.log("dashboardDetails", dashboardDetails)



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
      page_number: pageNumber
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
      name: convertToUpperCase(department),
      is_admin: isAdmin,
      ...(isSuperAdmin && { is_super_admin: isSuperAdmin })
    };

    const validation = validate(ADD_DEPARTMENT, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addDepartment({
          params,
          onSuccess: (success: any) => () => {
            addDepartMentModal.hide()

            getDepartmentList(departmentCurrentPages)
            // dispatch(
            //   getDepartmentData({
            //     params,
            //     onSuccess: (success: any) => () => { },
            //     onError: (error: string) => () => { },
            //   })
            // );
            setDepartment("");
            showToast(success.message, "success");
            setIsAdmin(false)
            setIsSuperAdmin(false)
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
      description: convertToUpperCase(description)
    };
    const validation = validate(ADD_TAG, params)
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

                  setDescription('')

                 },
                onError: (error: string) => () => { },
              })
            );
            setTags("");
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
      name: convertToUpperCase(task),
      description: convertToUpperCase(taskDescription)
    };

    const validation = validate(ADD_TASK_GROUP, params)
    if (ifObjectExist(validation)) {
      dispatch(
        addTaskGroup({
          params,
          onSuccess: (success: any) => () => {
            addTaskGroupModal.hide()

            dispatch(
              getTaskGroup({
                params,
                onSuccess: (success: any) => () => { },
                onError: (error: string) => () => { },
              })
            );
            setTask("");
            setTaskDescription('')
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
      return {
        name: el?.name,
        ... (dashboardDetails?.permission_details.is_admin && {
          Admin:
            <div className=" d-flex justify-content-center align-items-center ">
              <Input type={'checkbox'} checked={el?.is_admin} onChange={() => {
                handleDepartmentAdminProcess(el)
              }} />
            </div>
        }),

        ...(dashboardDetails?.permission_details.is_super_admin && {
          superAdmin:
            <div className=" d-flex justify-content-center align-items-center">
              <Input type={'checkbox'} checked={el?.is_super_admin} onChange={() => {
                handleDepartmentSuperAdminProcess(el)
              }} />
            </div>
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
        name: el.name,

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

  const normalizedTaskGroupData = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,

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
              onClick={() => addSectorModal.hide()}
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
          onClose={() => addTagsModal.hide()}
          title={translate("auth.tags")!}
        >
          <div className="">
            <Input
              placeholder={translate("auth.tags")}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Input
              placeholder={translate("auth.description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => addTagsModal.hide()}
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
          onClose={() => addTaskGroupModal.hide()}
          title={translate("auth.task")!}
        >
          <div className="">
            <Input
              placeholder={translate("auth.task")}
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Input
              placeholder={translate("auth.description")}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div className="text-right">
            <Button
              color={"secondary"}
              text={translate("common.cancel")}
              onClick={() => addTaskGroupModal.hide()}
            />
            <Button
              text={translate("common.submit")}
              onClick={() => {
                addTaskGroupAdding();
              }}
            />
          </div>
        </Modal>

      </div>
    </>
  )
}

export { Settings };
