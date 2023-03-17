import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { companySelectedDetails, getAssociatedBranch, setIsSync } from "@Redux";
import { Button, HomeContainer, Image, Table, NoDataFound } from "@Components";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";
import { getPhoto } from "@Utils";

function Companies() {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();

  const { associatedCompanies } = useSelector(
    (state: any) => state.AdminReducer
  );
  console.log();


  const { isSync } = useSelector(
    (state: any) => state.AppReducer
  );
  useEffect(() => {
    const params = { q: "" };
    if (!isSync.companies) {
      dispatch(
        getAssociatedBranch({
          params,
          onSuccess: () => () => {
            setSyncCompany(true)
          },
          onError: () => () => { },
        })
      );
    }
  }, []);


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

      <HomeContainer isCard>
        {associatedCompanies && associatedCompanies?.data?.length > 0 ? <Table displayDataSet={normalizedTableData(associatedCompanies?.data)} tableOnClick={(e, index) => {
          const selectedItem = associatedCompanies?.data[index]
          goTo(HOME_PATH.DASHBOARD + HOME_PATH.COMPANY_INFO);
          dispatch(companySelectedDetails(selectedItem));
        }} /> : <NoDataFound />}
      </HomeContainer>
    </>
  );
}
export { Companies };
