import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ADD_SECTOR, ifObjectExist, validate, getValidateError, INITIAL_PAGE } from "@Utils";
import { useDynamicHeight, useModal, useInput } from "@Hooks";
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
    brandSector,
    brandSectorCurrentPages,
    brandSectorNumOfPages,
  } = useSelector(
    (state: any) => state.UserCompanyReducer
  );

  const dispatch = useDispatch();
  const dynamicHeight: any = useDynamicHeight()


  const [showSector, setShowSector] = useState(false);
  const addSectorModal = useModal(false);
  const sector = useInput('')


  const getBrandSectorList = (page_number: number) => {
    const params = {
      page_number
    };

    dispatch(
      getBrandSector({
        params,
        onSuccess: (success: any) => () => {
        },
        onError: (error: string) => () => {

        },
      })
    );

  };

  const addBrandSectorApiHandler = () => {

    const params = {
      name: sector.value,
    };

    const validation = validate(ADD_SECTOR, params)

    if (ifObjectExist(validation)) {
      dispatch(
        addBrandSector({
          params,
          onSuccess: (success: any) => () => {
            addSectorModal.hide()
            sector.set('')
            showToast(success.message, "success");
            getBrandSectorList(INITIAL_PAGE)
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
                setShowSector(!showSector)
                if (!showSector) {
                  getBrandSectorList(brandSectorCurrentPages)
                }
              }}
            />
            <Button
              text={translate("product.addItem")}
              size={"sm"}
              onClick={addSectorModal.show}
            />
          </div>
        </div>

        <div
          className="overflow-auto overflow-hide"
          style={{
            height: showSector ? dynamicHeight.dynamicHeight - 100 : '0px',
          }}>
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
            />) :
            (
              <div className="h-100 d-flex justify-content-center align-items-center">
                < NoRecordsFound />
              </div>
            )}
        </div>
      </Card >
      <Modal
        isOpen={addSectorModal.visible}
        onClose={addSectorModal.hide}
        title={translate("auth.sector")!}
      >
        <div className="col-6">
          <Input
            placeholder={translate("auth.sector")}
            value={sector.value}
            onChange={sector.onChange}
          />
        </div>
        <div className="text-right">
          <Button
            color={"secondary"}
            text={translate("common.cancel")}
            onClick={() => {
              addSectorModal.hide()
              sector.set('')
            }}
          />
          <Button
            text={translate("common.submit")}
            onClick={addBrandSectorApiHandler}
          />
        </div>
      </Modal>
    </>
  )
}

export { BrandSector }