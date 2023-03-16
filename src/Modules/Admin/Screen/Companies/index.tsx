import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAssociatedBranch, setIsSync } from "@Redux";
import { Button, HomeContainer, NoDataFound } from "@Components";
import { CompanyItem } from "@Modules";
import { useNavigation } from "@Hooks";
import { HOME_PATH } from "@Routes";
import { translate } from "@I18n";

import { Table } from "reactstrap";

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



  return (
    <>
      <HomeContainer >
        <div className="text-right m-0">
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
        <Table className="align-items-center table-flush " responsive>
          <thead className="thead-light ">
            <tr>
              <th className="sort" scope="col">
                Comapny
              </th>
              <th className="sort" scope="col">
                Attchments
              </th>
              <th className="sort" scope="col">
                Phone
              </th>
              <th className="sort" scope="col">
                Email
              </th>
              <th className="sort" scope="col">
                Address
              </th>
            </tr>
          </thead>
          {
            associatedCompanies &&
              associatedCompanies?.data?.length > 0 ?
              associatedCompanies?.data?.map((company: any, index: number) => {
                return (
                  <>
                    <CompanyItem item={company} />
                  </>
                );
              }) : <NoDataFound />
          }
        </Table>
      </HomeContainer>
    </>
  );
}
export { Companies };
