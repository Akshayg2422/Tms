import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { companySelectedDetails, getAssociatedBranch } from "@Redux";
import { Card, Divider, Button, HomeContainer } from "@Components";
import { CompanyDashBoard, CompanyItem } from "@Modules";
import { useNavigation } from "@Hooks";
import { HOME_PATH, INFO } from "@Routes";

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
          text={"Create Company"}
          onClick={() => {
            goTo(HOME_PATH.DASHBOARD + HOME_PATH.CREATE_COMPANY);
          }}
        />
      </div>
      <Card title={"Companies"} className="mt-4">
        {associatedCompanies &&
          associatedCompanies.data.length > 0 &&
          associatedCompanies.data.map((company: any, index: number) => {
            return (
              <div
                onClick={() => {
                  handleOnClick(company);
                }}
              >
                <CompanyItem key={company.id} item={company} />
                {index !== associatedCompanies.data.length - 1 && (
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
