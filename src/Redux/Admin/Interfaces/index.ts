import {GetAssociatedCompanies} from '@Services';

export interface AdminStateProp {
  associatedCompanies?: GetAssociatedCompanies;
  dashboardDetails?: any;
  selectedIssues?: any;
  loading?:boolean;
  error?:string;
  departmentData?:any;
  designationData?:any;
  companyDetailsSelected?:any;
  referenceIssueSelectedDetails:any;
  selectedReferenceIssues:any;
  companyBranchNames:any;
  associatedCompaniesNumOfPages:any,
  associatedCompaniesCurrentPages:any,
  tasks:any
  tasksNumOfPages:any,
  tasksCurrentPages:any
  designationCurrentPages:any,
  designationNumOfPages:any,
  departmentCurrentPages:any,
  departmentNumOfPages:any,
  addTask:any,
  subTasks:any,
  taskItem:any,
}
