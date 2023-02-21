import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { companySelectedDetails, getAssociatedBranch } from "@Redux";
import { Card, Divider, Button, HomeContainer } from "@Components";
import { CompanyItem } from "@Modules";
import { useNavigation } from "@Hooks";
import {  HOME_PATH, INFO } from "@Routes";
import { translate } from "@I18n";

function Companies() {
  const dispatch = useDispatch();
  const { goTo } = useNavigation();

  const { associatedCompanies } = useSelector(
    (state: any) => state.AdminReducer
  );

  useEffect(() => {
    const params = { q: "" };

    dispatch(
      getAssociatedBranch({
        params,
        onSuccess: () => () => {},
        onError: () => () => {},
      })
    );
  }, []);

  const handleOnClick = (item: any) => {
    goTo(HOME_PATH.DASHBOARD + INFO.COMPANY_INFO);
    dispatch(companySelectedDetails(item));
  };

  return (
    <HomeContainer>
      <div className="col text-right">
        <Button
          text={translate("common.createCompany")}
          onClick={() => {
            goTo(HOME_PATH.DASHBOARD + HOME_PATH.CREATE_COMPANY);
          }}
        />
      </div>
      <Card title={"Companies"} className="mt-4">
        {associatedCompanies &&
          associatedCompanies.length > 0 &&
          associatedCompanies?.map((company: any, index: number) => {
            return (
              <div
                onClick={() => {
                  handleOnClick(company);
                }}
              >
                <CompanyItem key={company.id} item={company} />
                {index !== associatedCompanies?.length - 1 && (
                  <div className="mx-7">
                    <Divider />
                  </div>
                )}
              </div>
            );
          })}
      </Card>
    </HomeContainer>
  );
}
export { Companies };
