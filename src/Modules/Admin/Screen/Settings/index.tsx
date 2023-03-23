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
  addBrandSector,
  addTicketTag,
  getBrandSector,
  getTicketTag
} from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler } from "@Utils";
import { useModal, useDynamicHeight } from "@Hooks";

function Settings() {
  const dispatch = useDispatch();
  const { departmentData, designationData, departmentCurrentPages, departmentNumOfPages, designationCurrentPages, designationNumOfPages,
    brandSector,
    ticketTag,
    brandSectorCurrentPages,
    brandSectorNumOfPages,
    ticketTagCurrentPages,
    ticketTagNumOfPages,
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

  const dynamicHeight: any = useDynamicHeight()



  const getDepartmentList = (pageNumber: number) => {

    const params = {
      page_number: pageNumber
    };
    dispatch(
      getDepartmentData({
        params,
        onSuccess: (success: any) => () => {
          if (!showDepartments) {
            setShowDepartments(!showDepartments)
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
        onSuccess: (success: any) => () => {

          if (!showDesignations) {


            setShowDesignations(!showDesignations)
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

  /**add brand sector */

  const addBrandSectorAdding = () => {
    const params = {
      name: convertToUpperCase(sector),
    };

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

  /**add ticket tag */
  const addTicketTagAdding = () => {
    const params = {
      name: convertToUpperCase(tags),
      description: convertToUpperCase(description)
    };

    dispatch(
      addTicketTag({

        params,
        onSuccess: (success: any) => () => {
          addTagsModal.hide()

          dispatch(
            getTicketTag({
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
        edit: <i className="bi bi-pencil"></i>,
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
        edit: <i className="bi bi-pencil "></i>,

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




  return (
    <>
      <div className="mx-3 mb--2">
        <div className=" row mt-2 ">
          <div className="col-sm-6  pr-2 mt-2">
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
      <div className="mx-3">
        <div className=" row">
          <div className="col-sm-6 mb-0 pr-2 ">
            <>
              <Card style={{ height: showSector ? dynamicHeight.dynamicHeight - 35 : "5em" }} >
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
            </>
          </div>
          <div className="col-sm-6 pl-2 pt-0">
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
      </div>
    </>
  )
}

export { Settings };
