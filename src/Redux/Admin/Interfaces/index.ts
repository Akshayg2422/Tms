import { GetAssociatedCompanies } from '@Services';

export interface AdminStateProp {
  // associatedCompanies?: GetAssociatedCompanies;
  dashboardDetails?: any;
  loading?: boolean;
  error?: string;
  // departments?:any;
  // taskGroupDetails:any,
  // designations?:any;
  companyDetailsSelected?: any;
  companyBranchNames: any;
  // associatedCompaniesNumOfPages:any,
  // associatedCompaniesCurrentPages:any,
  tasks: any,
  showSubTaskGroup: any,
  taskNumOfPages: any,
  taskCurrentPages: any

  tickets: any,
  // showSubTicketGroup: any,
  // ticketNumOfPages: any,
  // ticketCurrentPages: any
  addingTicket: any,
  
  // designationCurrentPages:any,
  // designationNumOfPages:any,
  // departmentsCurrentPages:any,
  // departmentsNumOfPages:any,
  addingTask: any,
  subTasks: any,
  taskItem: any,
  // brandSector: any,
  // getTaskGroupCurrentPages:any,
  // ticketTag:any,
  loginUserSuccess: any,
  // brandSectorCurrentPages:any,
  // brandSectorNumOfPages:any,
  // ticketTagCurrentPages:any,
  // ticketTagNumOfPages:any,
  referencesTasks: any,
  referencesTasksNumOfPages: any,
  referencesTasksCurrentPages: any,
  taskUsers: any,
  current: any;
  // taskGroups:any,
  // taskGroupCurrentPages:any,
  // taskGroupNumOfPages:any,
  // addTaskGroup:any,
  getReferenceId: any,
  getSubTaskId: any,
  taskHistoryList: any,
}
