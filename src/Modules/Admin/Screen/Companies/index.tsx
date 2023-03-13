import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { companySelectedDetails, getAssociatedBranch, setIsSync } from "@Redux";
import { Card, Divider, Button, HomeContainer, FilePicker, NoDataFound } from "@Components";
import { CompanyItem } from "@Modules";
import { useNavigation } from "@Hooks";
import { HOME_PATH, INFO } from "@Routes";
import { translate } from "@I18n";

function Companies() {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();

  const { associatedCompanies } = useSelector(
    (state: any) => state.AdminReducer
  );

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
            dispatch(setIsSync({
              ...isSync, companies: true
            }))
          },
          onError: () => () => { },
        })
      );
    }
  }, []);

  const handleOnClick = (item: any) => {
    goTo(HOME_PATH.DASHBOARD + HOME_PATH.COMPANY_INFO);
    dispatch(companySelectedDetails(item));
  };

  return (
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
      <Card title={"Companies"} className="mt-3">
        {associatedCompanies &&
          associatedCompanies?.data?.length > 0 ?
          associatedCompanies?.data?.map((company: any, index: number) => {
            const divider = associatedCompanies?.data?.length - 1 !== index
            return (
              <div
                key={company.id}
                onClick={() => {
                  handleOnClick(company);
                }}
              >
                <CompanyItem item={company} showDivider={divider} />
              </div>
            );
          }) : <NoDataFound />}
      </Card>
    </HomeContainer>
  );
}
export { Companies };
