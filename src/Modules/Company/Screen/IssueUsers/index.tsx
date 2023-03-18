import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Divider, HomeContainer, NoDataFound, Table } from "@Components";
import { UserItem } from "@Modules";
import { getEmployees } from "@Redux";

function IssueUsers() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state: any) => state.CompanyReducer);
  const { selectedIssues, selectedReferenceIssues } = useSelector(
    (state: any) => state.AdminReducer
  );

  useEffect(() => {

    const params = {

      branch_id: selectedReferenceIssues
        ? selectedReferenceIssues.raised_by_company?.branch_id
        : selectedIssues.raised_by_company?.branch_id,
    };

    dispatch(
      getEmployees({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  }, [selectedIssues, selectedReferenceIssues]);


  const normalizedTableData = (employees: any) => {
    return employees.map((el: any) => {
      return {
        name: el?.name,
        phone: el?.mobile_number,
        email: el?.email
      };
    });
  };

  return (

    <HomeContainer isCard title={"Employee Details"}>
      {
        employees && employees?.length > 0 && <Table tableDataSet={employees} displayDataSet={normalizedTableData(employees)} />
      }
    </HomeContainer>

  );
}
export { IssueUsers };
