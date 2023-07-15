import {
  Button,
  Card,
  CommonTable,
  Input,
  Modal,
  NoRecordsFound,
  Spinner,
  showToast,
} from "@Components";
import { useDynamicHeight, useInput, useLoader, useModal } from "@Hooks";
import { translate } from "@I18n";
import { addBrandSector, getBrandSector } from "@Redux";
import { ADD_SECTOR, INITIAL_PAGE, capitalizeFirstLetter, getValidateError, ifObjectExist, paginationHandler, validate } from "@Utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


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
  const [loading, setLoading] = useState(false)
  const loginLoader = useLoader(false)

  const getBrandSectorList = (page_number: number) => {
    setLoading(true)
    const params = {
      page_number
    };

    dispatch(
      getBrandSector({
        params,
        onSuccess: (success: any) => () => {
          setLoading(false)
        },
        onError: (error: string) => () => {
          setLoading(false)
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
      loginLoader.show()
      dispatch(
        addBrandSector({
          params,
          onSuccess: (success: any) => () => {
            addSectorModal.hide()
            loginLoader.hide()
            sector.set('')
            showToast(success.message, "success");
            getBrandSectorList(INITIAL_PAGE)
          },
          onError: (error: string) => () => {
            loginLoader.hide()
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
        name: capitalizeFirstLetter(el.name),
      };
    });
  };

  return (
    <>
      <div className={'card justify-content-center'} style={{ height: showSector ? dynamicHeight.dynamicHeight - 35 : "5em" }} >
        <div className="row mx-2">
          <div className="col">
            <h3>{translate("auth.sector")}</h3>
          </div>

          <div className="text-right mr-3 ">
            <Button
              className={'text-white'}
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
              className={'text-white'}
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
          {
            loading && (
              <div className='d-flex justify-content-center align-item-center' style={{ marginTop: '200px' }}>
                <Spinner />
              </div>
            )
          }
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
      </div>
      <Modal
        isOpen={addSectorModal.visible}
        onClose={addSectorModal.hide}
        title={translate("auth.sector")!}
        size="md"
      >
        <div className="col-12">
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
            loading={loginLoader.loader}
            text={translate("common.submit")}
            onClick={addBrandSectorApiHandler}
          />
        </div>
      </Modal>
    </>
  )
}

export { BrandSector };
