import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { companySelectedDetails, getAssociatedBranch, setIsSync } from "@Redux";
import { Button, HomeContainer, Image, CommonTable, NoDataFound, NoTaskFound } from "@Components";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto, paginationHandler } from "@Utils";

function Companies() {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();

  const { associatedCompanies, associatedCompaniesNumOfPages, associatedCompaniesCurrentPages } = useSelector(
    (state: any) => state.AdminReducer
  );
  const { isSync } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (!isSync.companies) {
      getAssociatedCompaniesHandler(associatedCompaniesCurrentPages)
    }
  }, [isSync])


  const getAssociatedCompaniesHandler = (pageNumber: number) => {
    const params = {
      page_number: pageNumber
    };

    dispatch(
      getAssociatedBranch({
        params,
        onSuccess: () => () => {
          setSyncCompany(true)
        },
        onError: () => () => { },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
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

  function setSyncCompany(sync = false) {
    dispatch(
      setIsSync({
        ...isSync,
        companies: sync,
      })
    );
  }

  return (
    <>
      <HomeContainer>
        {associatedCompanies && associatedCompanies?.length > 0 ?
          <div className="text-right">
            <Button
              size={'sm'}
              text={translate("common.addCompany")}
              onClick={() => {
                goTo(HOME_PATH.DASHBOARD + HOME_PATH.CREATE_COMPANY);
              }}
            />
          </div> : null}
      </HomeContainer>

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
            dispatch(companySelectedDetails(item));
            goTo(HOME_PATH.DASHBOARD + HOME_PATH.COMPANY_INFO);

          }} /> :
        <div className={'py-5'}><NoTaskFound text={'No Companies Found'} />
          <div className="text-center">
            <Button
              size={'md'}
              text={translate("common.addCompany")}
              onClick={() => {
                goTo(HOME_PATH.DASHBOARD + HOME_PATH.CREATE_COMPANY);
              }}
            />
          </div>
        </div>

      }
    </>

  );
}
export { Companies };
