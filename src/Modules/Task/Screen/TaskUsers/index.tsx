// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Card, CommonTable, Divider, HomeContainer, NoDataFound, Table } from "@Components";
// import { UserItem } from "@Modules";
// import { getEmployees } from "@Redux";

// function TaskUsers() {
//   const dispatch = useDispatch();
//   const { employees } = useSelector((state: any) => state.CompanyReducer);
//   const { selectedIssues, selectedReferenceIssues } = useSelector(
//     (state: any) => state.AdminReducer
//   );

//   useEffect(() => {

//     const params = {
//       branch_id: selectedReferenceIssues
//         ? selectedReferenceIssues.raised_by_company?.branch_id
//         : selectedIssues.raised_by_company?.branch_id,
//     };


//     dispatch(
//       getEmployees({
//         params,
//         onSuccess: () => () => { },
//         onError: () => () => { },
//       })
//     );
//   }, [selectedIssues, selectedReferenceIssues]);


//   const normalizedTableData = (employees: any) => {
//     if (employees && employees.length > 0)
//       return employees.map((el: any) => {
//         return {
//           name: el?.name,
//           phone: el?.mobile_number,
//           email: el?.email
//         };
//       });
//   };

//   return (
//     <div className={'overflow-auto overflow-hide'} style={{ height: '82.3vh' }}>
//       <CommonTable tableDataSet={employees} displayDataSet={normalizedTableData(employees)} />
//     </div>
//   );
// }
// export { TaskUsers };

import React from 'react'

function TaskUsers() {
  return (
    <div>TaskUsers</div>
  )
}

export  {TaskUsers}
