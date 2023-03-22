import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { companySelectedDetails, getAssociatedBranch, setIsSync } from "@Redux";
import { Button, HomeContainer, Image, CommonTable, NoDataFound } from "@Components";
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
        Company: el.display_name,
        attachments: <Image variant={'rounded'} src={getPhoto(el?.attachment_logo)} />,
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
        <div className="text-right">
          <Button
            size={'sm'}
            text={translate("common.createCompany")}
            onClick={() => {
              goTo(HOME_PATH.DASHBOARD + HOME_PATH.CREATE_COMPANY);
            }}
          />
        </div>
      </HomeContainer>

      <>
        {associatedCompanies && associatedCompanies?.length > 0 &&
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

            }} />}
      </>
    </>
  );
}
export { Companies };
