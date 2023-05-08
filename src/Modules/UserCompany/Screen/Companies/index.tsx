import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAssociatedBranch, setSelectedCompany } from "@Redux";
import { Button, Card, Image, CommonTable, NoDataFound } from "@Components";
import { useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler } from "@Utils";

function Companies() {

  const dispatch = useDispatch();
  const { goTo } = useNavigation();

  const { associatedCompanies, associatedCompaniesNumOfPages, associatedCompaniesCurrentPages } = useSelector(
    (state: any) => state.UserCompanyReducer
  );

  useEffect(() => {
    getAssociatedCompaniesHandler(associatedCompaniesCurrentPages)
  }, [])


  const getAssociatedCompaniesHandler = (page_number: number) => {
    const params = {
      page_number
    };

    dispatch(
      getAssociatedBranch({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => { },
      })
    );

  };

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



  return (
    <Card className="m-3">
      {associatedCompanies && associatedCompanies?.length > 0 ?
        <div className="text-right mb-3">
          <Button
            size={'sm'}
            text={translate("common.addCompany")}
            onClick={() => {
              goTo(ROUTES["user-company-module"]["add-company"]);
            }}
          />
        </div> : null}

        
<div >
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
        <div className="vh-100 d-flex align-item-center justify-content-center"><NoDataFound text="No Companies found" buttonText={'Add Company'} onClick={() => {
          goTo(ROUTES["user-company-module"]["add-company"]);
        }} isButton/></div>

      }
      </div>
    </Card>
  );
}
export { Companies };
