import {GetAssociatedCompanies} from '@Services';

export interface AdminStateProp {
  associatedCompanies?: GetAssociatedCompanies;
  dashboardDetails?: any;
  selectedIssues?: any;
  loading?:boolean;
  error?:string;
  departmentData?:any;
  taskGroupDetails:any,
  designationData?:any;
  companyDetailsSelected?:any;
  referenceIssueSelectedDetails:any;
  selectedReferenceIssues:any;
  companyBranchNames:any;
  associatedCompaniesNumOfPages:any,
  associatedCompaniesCurrentPages:any,
  tasks:any
  taskNumOfPages:any,
  taskCurrentPages:any
  designationCurrentPages:any,
  designationNumOfPages:any,
  departmentCurrentPages:any,
  departmentNumOfPages:any,
  addingTask:any,
  subTasks:any,
  taskItem:any,
  brandSector: any,
  getTaskGroupCurrentPages:any,
  ticketTag:any,
  loginUserSuccess:any,
  brandSectorCurrentPages:any,
  brandSectorNumOfPages:any,
  ticketTagCurrentPages:any,
  ticketTagNumOfPages:any,
  referencesTasks:any,
  referencesTasksNumOfPages:any,
  referencesTasksCurrentPages:any,
  taskUsers:any,
  ticketEmployees:any;
  current:any;
  getTaskGroupDetails:any,
  taskGroupCurrentPages:any,
  taskGroupNumOfPages:any,
  addTaskGroup:any,
  getReferenceId:any,
  getSubTaskId:any,
  taskHistoryList:any,
}
