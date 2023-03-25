import {
  GET_ASSOCIATED_BRANCH,
  GET_ASSOCIATED_BRANCH_FAILURE,
  GET_ASSOCIATED_BRANCH_SUCCESS,
  GET_ASSOCIATED_COMPANY_BRANCH,
  GET_ASSOCIATED_COMPANY_BRANCH_SUCCESS,
  GET_ASSOCIATED_COMPANY_BRANCH_FAILURE,
  GET_DASHBOARD,
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_SUCCESS,
  SET_SELECTED_ISSUES,
  SET_REFERENCE_SELECTED_ISSUES,

  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILURE,

  ADD_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAILURE,


  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,

  FETCH_DESIGNATION,
  FETCH_DESIGNATION_SUCCESS,
  FETCH_DESIGNATION_FAILURE,

  COMPANY_SELECTED_DETAILS,
  REFERENCE_ISSUE_DETAILS,
  RESTORE_ADMIN,

  GET_TASKS,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,

  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,

  GET_SUB_TASKS,
  GET_SUB_TASKS_SUCCESS,
  GET_SUB_TASKS_FAILURE,

  GET_TASKS_ITEM,
  ADD_BRAND_SECTOR_SUCCESS,
  ADD_BRAND_SECTOR_FAILURE,
  ADD_TICKET_TAG_SUCCESS,
  ADD_TICKET_TAG_FAILURE,
  GET_BRAND_SECTOR_SUCCESS,
  GET_BRAND_SECTOR_FAILURE,
  GET_TICKET_TAG_SUCCESS,
  GET_TICKET_TAG_FAILURE,
  GET_TICKET_TAG,
  GET_BRAND_SECTOR,
  ADD_BRAND_SECTOR,
  ADD_TICKET_TAG,
  GET_REFERENCE_TASKS,
  GET_REFERENCE_TASKS_SUCCESS,
  GET_REFERENCE_TASKS_FAILURE,
  GET_TASK_USERS,
  GET_TASK_USERS_SUCCESS,
  GET_TASK_USERS_FAILURE,
  GET_TICKET_USERS,
  GET_TICKET_USERS_SUCCESS,
  GET_TICKET_USERS_FAILURE,
  
} from '../ActionTypes';

import { AdminStateProp } from '../../Interfaces';

const initialState: AdminStateProp = {
  associatedCompanies: undefined,
  associatedCompaniesNumOfPages: undefined,
  associatedCompaniesCurrentPages: 1,
  dashboardDetails: undefined,
  selectedIssues: undefined,
  loading: false,
  error: '',

  designationData: undefined,
  departmentData: undefined,
  designationCurrentPages:undefined,
  designationNumOfPages:undefined,
  departmentCurrentPages:undefined,
  departmentNumOfPages:undefined,

  brandSector: undefined,
  ticketTag: undefined,
  brandSectorCurrentPages:undefined,
  brandSectorNumOfPages:undefined,
  ticketTagCurrentPages:undefined,
  ticketTagNumOfPages:undefined,
  companyDetailsSelected: undefined,
  referenceIssueSelectedDetails: undefined,
  selectedReferenceIssues: undefined,
  companyBranchNames: undefined,
  tasks: undefined,
  tasksNumOfPages: undefined,
  tasksCurrentPages: 1,
  addTask: undefined,
  subTasks: undefined,
  taskItem: undefined,

  referencesTasks:undefined,
  referencesTasksNumOfPages: undefined,
  referencesTasksCurrentPages:undefined,
  taskUsers: undefined,
  ticketEmployees:undefined,
};


const AdminReducer = (state: AdminStateProp = initialState, action: any) => {

  switch (action.type) {
    case RESTORE_ADMIN:
      state = initialState;
      break;

    case GET_ASSOCIATED_BRANCH:
      state = {
        ...state,
        associatedCompanies: undefined,
        associatedCompaniesNumOfPages: 0,
        associatedCompaniesCurrentPages: 1
      };
      break;
    case GET_ASSOCIATED_BRANCH_SUCCESS:
      const { data, next_page, num_pages } = action.payload?.details;
      state = {
        ...state,
        associatedCompanies: data,
        associatedCompaniesNumOfPages: num_pages,
        associatedCompaniesCurrentPages:
          next_page === -1
            ? num_pages
            : next_page - 1,
      };
      break;
    case GET_ASSOCIATED_BRANCH_FAILURE:
      state = { ...state };
      break;

    case GET_ASSOCIATED_COMPANY_BRANCH:
      state = { ...state };
      break;
    case GET_ASSOCIATED_COMPANY_BRANCH_SUCCESS:
      state = { ...state, companyBranchNames: action.payload.details };
      break;
    case GET_ASSOCIATED_COMPANY_BRANCH_FAILURE:
      state = { ...state };
      break;

/**get_ticket_users */
case GET_TICKET_USERS:
  state = {
    ...state
  };

  break;
case GET_TICKET_USERS_SUCCESS:
  state = {
    ...state,
    ticketEmployees: action.payload,
  };
  break;
case GET_TICKET_USERS_FAILURE:
  state = { ...state, ticketEmployees: undefined };
  break;

    /**
     * Dashboard
     */
    case GET_DASHBOARD:
      state = { ...state, dashboardDetails: undefined };
      break;
    case GET_DASHBOARD_SUCCESS:
      state = { ...state, dashboardDetails: action.payload.details };
      break;
    case GET_DASHBOARD_FAILURE:
      state = { ...state, dashboardDetails: action.payload };
      break;

    /**
     * add department
     */
    case ADD_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case ADD_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * add designation
     */
    case ADD_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case ADD_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get departments

    case FETCH_DEPARTMENT:
      state = {
        ...state,
        departmentData: undefined,
        departmentNumOfPages: 0,
        departmentCurrentPages: 1,
        loading: true
      };
      break;
    case FETCH_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        departmentData: action?.payload?.data,
        departmentNumOfPages: action?.payload?.num_pages,
        departmentCurrentPages:
          action?.payload?.next_page === -1
            ? action?.payload?.num_pages
            : action?.payload?.next_page - 1,
      };
      break;
    case FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
//GET REFERENCE TASKS
case GET_REFERENCE_TASKS:
  state = {
    ...state,
    referencesTasks: undefined,
    referencesTasksNumOfPages: 0,
    referencesTasksCurrentPages: 1,
    loading: true
  };
  break;
case GET_REFERENCE_TASKS_SUCCESS:
  state = {
    ...state,
    loading: false,
    referencesTasks: action?.payload?.data,
    referencesTasksNumOfPages: action?.payload?.num_pages,
    referencesTasksCurrentPages:
      action?.payload?.next_page === -1
        ? action?.payload?.num_pages
        : action?.payload?.next_page - 1,
  };
  break;
case GET_REFERENCE_TASKS_FAILURE:
  state = {
    ...state,
    error: action.payload,
    loading: false,
  };
  break;
    //get designations

    case FETCH_DESIGNATION:

      state = {
        ...state,
        designationData: undefined,
        designationNumOfPages: 0,
        designationCurrentPages: 1,
        loading: true
      };

      break;
    case FETCH_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        designationData: action?.payload?.data,
        designationNumOfPages: action?.payload?.num_pages,
        designationCurrentPages:
          action?.payload?.next_page === -1
            ? action?.payload?.num_pages
            : action?.payload?.next_page - 1,
      };
      break;
    case FETCH_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
     * COMPANY SELECTED DETAILS
     */
    case COMPANY_SELECTED_DETAILS:
      state = {
        ...state,
        companyDetailsSelected: action.payload
      };
      break;

    /**
     * REFERENCE ISSUE DETAILS
     */
    case REFERENCE_ISSUE_DETAILS:
      state = {
        ...state,
        referenceIssueSelectedDetails: action.payload,
      };
      break;

    /**
     * Issue Item
     */

    case SET_SELECTED_ISSUES:

      state = { ...state, selectedIssues: action.payload };
      break;

    case SET_REFERENCE_SELECTED_ISSUES:

      state = { ...state, selectedReferenceIssues: action.payload };
      break;

    /**
     * Get Tasks
     */
    case GET_TASKS:
      state = {
        ...state,
        tasks: undefined,
        tasksNumOfPages: 0,
        tasksCurrentPages: 1,
      }
      break;
    case GET_TASKS_SUCCESS:
      // const { data, next_page, num_pages } = action.payload?.details; 
      state = {
        ...state,
        tasks: action.payload?.details,
        tasksNumOfPages: action.payload?.details.num_pages,
        tasksCurrentPages:
          action.payload?.details.next_page === -1
            ? action.payload?.details.num_pages
            : action.payload?.details.next_page - 1
      }
      break;
    case GET_TASKS_FAILURE:
      state ={...state,tasks:undefined}
      break;  

        /**
     * add BRAND SECTOR
     */
    case ADD_BRAND_SECTOR:
      state = { ...state, loading: true };
      break;
    case ADD_BRAND_SECTOR_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_BRAND_SECTOR_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * add TICKET TAG
     */
    case ADD_TICKET_TAG:
      state = { ...state, loading: true };
      break;
    case ADD_TICKET_TAG_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_TICKET_TAG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

       //get BRAND SECTOR

    case GET_BRAND_SECTOR:
      state = { ...state,
        brandSector: undefined,
        brandSectorNumOfPages: 0,
        brandSectorCurrentPages: 1,
         loading: true };
      break;
    case GET_BRAND_SECTOR_SUCCESS:
      state = {
        ...state,
        loading: false,
        brandSector: action?.payload?.data,
        brandSectorNumOfPages:action?.payload?.num_pages,
        brandSectorCurrentPages:
        action?.payload?.next_page === -1
            ?action?.payload?.num_pages
            :action?.payload?.next_page - 1,
      };
      break;
    case GET_BRAND_SECTOR_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get designations

    case GET_TICKET_TAG:
   
        state = { ...state,
          designationData: undefined,
          designationNumOfPages: 0,
          designationCurrentPages: 1,
           loading: true };
       
      break;
    case GET_TICKET_TAG_SUCCESS:
      state = {
        ...state,
        loading: false,
        ticketTag:action?.payload?.data,
        ticketTagNumOfPages:action?.payload?.num_pages,
        ticketTagCurrentPages:
        action?.payload?.next_page === -1
            ?action?.payload?.num_pages
            :action?.payload?.next_page - 1,
      };
      break;
    case GET_TICKET_TAG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /* ADD TASK */

    case ADD_TASK:

      state = { ...state, addTask: undefined };
      break;

    case ADD_TASK_SUCCESS:

      state = { ...state, addTask: action.payload.details };
      break;

    case ADD_TASK_FAILURE:

      state = { ...state, addTask: action.payload };
      break;

    /* GET SUB TASK*/

    case GET_SUB_TASKS:

      state = { ...state, subTasks: undefined }
      break;
    case GET_SUB_TASKS_SUCCESS:
      state = { ...state, subTasks: action.payload?.details }
      break;
    case GET_SUB_TASKS_FAILURE:
      state = { ...state, subTasks: action.payload }
      break;

    case GET_TASKS_ITEM:
      state = { ...state, taskItem: action.payload }
      break;

      case GET_TASK_USERS:
        state = { ...state, taskUsers: undefined }
        break;
      case GET_TASK_USERS_SUCCESS:
        state = { ...state, taskUsers: action.payload?.details }
        break;
      case GET_TASK_USERS_FAILURE:
        state = { ...state, taskUsers: undefined }
        break;

    default:
      state = state;
      break;
  }
  return state;

};
export { AdminReducer };

