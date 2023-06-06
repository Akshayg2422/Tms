import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssociatedCompany, getAssociatedBranch, getTaskGroupsL, getAssociatedCompany, refreshUserCompanies, setSelectedCompany } from "@Redux";
import { Button, Card, Image, CommonTable, NoDataFound, Modal, DropDown, showToast, CollapseButton, Spinner } from "@Components";
import { useNavigation, useModal, useDynamicHeight, useDropDown } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler } from "@Utils";

function Companies() {
  const item = [{ id: '1', text: "welcome to my world" },
  { id: '1', text: "welcome to my worlds" },
  { id: '1', text: "welcome to my worldr" },
  { id: '1', text: "welcome to my worlde" }]

  const dispatch = useDispatch();
  const { goTo, goBack } = useNavigation();

  const associatedCompanyModal = useModal(false);
  const associatedCompanyDropDown = useDropDown({})
  const dynamicHeight: any = useDynamicHeight()
  const [loading, setLoading] = useState(false)
  const { associatedCompanies, associatedCompaniesNumOfPages, associatedCompaniesCurrentPages, associatedCompany, dashboardDetails } = useSelector(
    (state: any) => state.UserCompanyReducer
  );



  useEffect(() => {
    getAssociatedCompaniesHandler(associatedCompaniesCurrentPages)
    getAssociatedCompanyApi()
    // setLoading(true)
  }, [])


  const getAssociatedCompaniesHandler = (page_number: number) => {
    setLoading(true)
    const params = {
      page_number
    };

    dispatch(
      getAssociatedBranch({
        params,
        onSuccess: () => () => {
          setLoading(false)
        },
        onError: () => () => {
          setLoading(false)
        },
      })
    );

  }


  const getAssociatedCompanyApi = () => {

    const params = {}

    dispatch(
      getAssociatedCompany({
        params,
        onSuccess: (response: any) => () => {
          associatedCompanyModal.hide()
        }
      })
    )
  }


  const addAssociatedCompanyApi = () => {

    const params = {
      company_id: associatedCompanyDropDown.value.id,
      id: dashboardDetails.company.id
    }



    dispatch(
      addAssociatedCompany({
        params,
        onSuccess: (response: any) => () => {
          associatedCompanyModal.hide();
          associatedCompanyDropDown.set({})
          showToast(response.message)
          // setLoading(false)
        },
        onError: (error) => () => {
          showToast(error.error_message)

        },
      })
    )
  }

  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {
      return {
        Company: <div className="row"> <div>
          <Image variant={'rounded'} src={getPhoto(el?.attachment_logo)} /></div>
          <div className="text-center pt-3 pl-1"> {el.display_name}<div></div></div>
        </div>,
        phone: el?.phone,
        email: el?.email,
        address: el?.address,
      };
    });
  };

  function getAssociatedCompanyDropDownDisplayData(data: any, key: string = 'display_name') {
    if (data && data.length > 0) {
      return data.map(each => {
        return { ...each, text: each[key] }
      })
    }
  }


  return (
    <>
      <Card className="m-3">
        {associatedCompanies && associatedCompanies?.length > 0 ?
          <div className="text-right mb-3">
            <Button
              className={'text-white'}
              size={'sm'}
              text={translate("auth.associatedCompany")}
              onClick={() => {
                associatedCompanyModal.show()
              }}
            />
          </div> : null}

        {
          loading && (
            <div className="d-flex justify-content-center align-item-center " style={{ minHeight: '200px' ,marginTop:'250px'}}>
              <Spinner />
            </div>
          )
        }

        {!loading && <div style={{ marginLeft: "-23px", marginRight: "-23px" }}>

          {associatedCompanies && associatedCompanies?.length > 0 ?
            <CommonTable
              isPagination
              title={'Companies'}
              tableDataSet={associatedCompanies}
              currentPage={associatedCompaniesCurrentPages}
              noOfPage={associatedCompaniesNumOfPages}
              displayDataSet={normalizedTableData(associatedCompanies)}
              paginationNumberClick={(currentPage) => {
                getAssociatedCompaniesHandler(paginationHandler("current", currentPage));
              }}
              previousClick={() => {
                getAssociatedCompaniesHandler(paginationHandler("prev", associatedCompaniesCurrentPages))
              }
              }
              nextClick={() => {
                getAssociatedCompaniesHandler(paginationHandler("next", associatedCompaniesCurrentPages));
              }
              }
              tableOnClick={(idx, index, item) => {
                dispatch(setSelectedCompany(item));
                goTo(ROUTES["user-company-module"]["company-details"]);

              }} />
            :
            <div className="vh-100 d-flex align-item-center justify-content-center"><NoDataFound text={translate("common.No Companies found")!} buttonText={translate("common.addCompany")!} onClick={() => {
              goTo(ROUTES["user-company-module"]["add-company"]);
            }} isButton /></div>

          }
        </div>}
      </Card>

      <Modal size={"md"} fade={false} isOpen={associatedCompanyModal.visible} style={{ overflowY: 'auto', maxHeight: dynamicHeight.dynamicHeight }} onClose={associatedCompanyModal.hide}>

        {
          <div className="col mt--4">
            <DropDown
              heading={translate('order.SELECTED COMPANIES :')}
              data={getAssociatedCompanyDropDownDisplayData(associatedCompany)}
              onChange={(item) => {
                associatedCompanyDropDown.onChange(item)
              }}
              selected={associatedCompanyDropDown.value}
            />

            <div className="text-right">
              <Button
                className={'text-white'}
                size={'sm'}
                text={translate("common.submit")}
                onClick={() => {
                  console.log('caadsas');

                  addAssociatedCompanyApi()
                }} />
            </div>

            <div className={'text-xs text-muted mb-2'}>{translate("order.Can't find Company?")}</div>

            <Button
              className={'text-white'}
              size={'sm'}
              text={translate("common.addNew")}
              onClick={() => {
                goTo(ROUTES["user-company-module"]["add-company"]);
              }}
            />
          </div>
        }

      </Modal>
    </>


  );
}
export { Companies };
