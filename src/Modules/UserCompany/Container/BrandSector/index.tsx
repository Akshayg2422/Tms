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

} from "@Components";
import { translate } from "@I18n";
import { addBrandSector, getBrandSector } from "@Redux";


function BrandSector() {

    const { 
 
        dashboardDetails,
    
      } = useSelector(
        (state: any) => state.AdminReducer
      );
      
      const { 
      
           brandSector,
   
        brandSectorCurrentPages,
        brandSectorNumOfPages,
     
      } = useSelector(
        (state: any) => state.UserCompanyReducer
      );
    const dispatch = useDispatch();
    const dynamicHeight: any = useDynamicHeight()
    const [description, setDescription] = useState("");
    const [showSector, setShowSector] = useState(false);
    const addSectorModal = useModal(false);
    const [sector, setSector] = useState("");
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
      const normalizedBrandSectorData = (data: any) => {
        return data.map((el: any) => {
          return {
            name: el.name,
    
          };
        });
      };

  return (
    <div><>
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
    onClick={() => {
      addSectorModal.hide()
      setSector('')
    }}
  />
  <Button
    text={translate("common.submit")}
    onClick={() => {
      addBrandSectorAdding();

    }}
  />
</div>
</Modal></></div>
  )
}

export { BrandSector}