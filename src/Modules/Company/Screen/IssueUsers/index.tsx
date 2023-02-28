import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Divider, Button, HomeContainer } from "@Components";
import { UserItem } from "@Modules";
import { getEmployees } from "@Redux";
import { useNavigation } from "@Hooks";
import { ADD_USER_INFO, HOME_PATH } from "@Routes";
import { translate } from "@I18n";
function IssueUsers() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { getEmployeesDetails } = useSelector(
    (state: any) => state.CompanyReducer
  );

  const { selectedIssues } = useSelector((state: any) => state.AdminReducer);

  useEffect(() => {
    const params = { branch_id: selectedIssues.raised_by_company.branch_id };

    dispatch(
      getEmployees({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }, []);

  return (
    <HomeContainer>
      <div>

        <Card className="mt-2 py-2">
          {getEmployeesDetails &&
            getEmployeesDetails.length > 0 &&
            getEmployeesDetails.map((user: any, index: number) => {
              return (
                <>
                  <UserItem item={user} />
                  {index !== getEmployeesDetails.length - 1 && <Divider space={'4'} />}
                </>
              );
            })}
        </Card>
      </div>
    </HomeContainer>
  );
}
export { IssueUsers };
