import {

  GET_ASSOCIATED_COMPANY_BRANCH,
  GET_ASSOCIATED_COMPANY_BRANCH_SUCCESS,
  GET_ASSOCIATED_COMPANY_BRANCH_FAILURE,
  GET_DASHBOARD,
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_SUCCESS,
  SET_SELECTED_ISSUES,
  SET_REFERENCE_SELECTED_ISSUES,

  COMPANY_SELECTED_DETAILS,
  REFERENCE_ISSUE_DETAILS,
  RESTORE_ADMIN,


  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,

  GET_SUB_TASKS,
  GET_SUB_TASKS_SUCCESS,
  GET_SUB_TASKS_FAILURE,

  GET_TASKS_ITEM,

  GET_REFERENCE_TASKS,
  GET_REFERENCE_TASKS_SUCCESS,
  GET_REFERENCE_TASKS_FAILURE,
  GET_TASK_USERS,
  GET_TASK_USERS_SUCCESS,
  GET_TASK_USERS_FAILURE,
  GET_TICKET_USERS,
  GET_TICKET_USERS_SUCCESS,
  GET_TICKET_USERS_FAILURE,
  GET_CURRENT_PAGE,


  GET_REFERENCE_ID,
  GET_SUBTASK_ID,
  LOGIN_USER,
  GET_TASK_SUB_GROUP,
  GET_TASK_SUB_GROUP_SUCCESS,
  GET_TASK_SUB_GROUP_FAILURE,

  GET_TASK_HISTORY,
  GET_TASK_HISTORY_SUCCESS,
  GET_TASK_HISTORY_FAILURE,

} from '../ActionTypes';

import { AdminStateProp } from '../../Interfaces';


const initialState: AdminStateProp = {

  dashboardDetails: undefined,
  selectedIssues: undefined,
  loading: false,
  error: '',
  companyDetailsSelected: undefined,
  referenceIssueSelectedDetails: undefined,
  selectedReferenceIssues: undefined,
  companyBranchNames: undefined,
  tasks: undefined,
  taskNumOfPages: undefined,
  taskCurrentPages: 1,
  addingTask: undefined,
  subTasks: undefined,
  taskItem: undefined,
  current: undefined,

  referencesTasks: undefined,
  referencesTasksNumOfPages: undefined,
  referencesTasksCurrentPages: undefined,
  taskUsers: undefined,
  showSubTaskGroup: undefined,
  ticketEmployees: undefined,
  getReferenceId: undefined,
  getSubTaskId: undefined,
  loginUserSuccess: false,
  taskHistoryList: undefined,
};


const AdminReducer = (state: AdminStateProp = initialState, action: any) => {

  switch (action.type) {
    case RESTORE_ADMIN:
      state = initialState;
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

    // case FETCH_DESIGNATION:

    //   state = {
    //     ...state,
    //     designationData: undefined,
    //     designationNumOfPages: 0,
    //     designationCurrentPages: 1,
    //     loading: true
    //   };

    //   break;
    // case FETCH_DESIGNATION_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     designationData: action?.payload?.data,
    //     designationNumOfPages: action?.payload?.num_pages,
    //     designationCurrentPages:
    //       action?.payload?.next_page === -1
    //         ? action?.payload?.num_pages
    //         : action?.payload?.next_page - 1,
    //   };
    //   break;
    // case FETCH_DESIGNATION_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    //   break;
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
 * add BRAND SECTOR
 */
    // case ADD_BRAND_SECTOR:
    //   state = { ...state, loading: true };
    //   break;
    // case ADD_BRAND_SECTOR_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case ADD_BRAND_SECTOR_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    //   break;

    /**
     * add TICKET TAG
     */
    // case ADD_TICKET_TAG:
    //   state = { ...state, loading: true };
    //   break;
    // case ADD_TICKET_TAG_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //   };
    //   break;
    // case ADD_TICKET_TAG_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    //   break;

    //get BRAND SECTOR

    // case GET_BRAND_SECTOR:
    //   state = {
    //     ...state,
    //     brandSector: undefined,
    //     brandSectorNumOfPages: 0,
    //     brandSectorCurrentPages: 1,
    //     loading: true
    //   };
    //   break;
    // case GET_BRAND_SECTOR_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     brandSector: action?.payload?.data,
    //     brandSectorNumOfPages: action?.payload?.num_pages,
    //     brandSectorCurrentPages:
    //       action?.payload?.next_page === -1
    //         ? action?.payload?.num_pages
    //         : action?.payload?.next_page - 1,
    //   };
    //   break;
    // case GET_BRAND_SECTOR_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    //   break;

    //get designations

    // case GET_TICKET_TAG:

    //   state = {
    //     ...state,
    //     ticketTag: undefined,
    //     ticketTagNumOfPages: 0,
    //     ticketTagCurrentPages: 1,
    //     loading: true
    //   };

    //   break;
    // case GET_TICKET_TAG_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     ticketTag: action?.payload?.data,
    //     ticketTagNumOfPages: action?.payload?.num_pages,
    //     ticketTagCurrentPages:
    //       action?.payload?.next_page === -1
    //         ? action?.payload?.num_pages
    //         : action?.payload?.next_page - 1,
    //   };
    //   break;
    // case GET_TICKET_TAG_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    //   break;

    /**get task group */
    // case GET_TASK_GROUP:
    //   const { page_number } = action.payload.params
    //   state = {
    //     ...state,
    //     taskGroupDetails: page_number === 1 ? [] : state.taskGroupDetails,
    //     getTaskGroupDetails: undefined,
    //     taskGroupNumOfPages: 0,
    //     taskGroupCurrentPages: 1,
    //     loading: true
    //   };

    //   break;
    // case GET_TASK_GROUP_SUCCESS:
    //   state = {
    //     ...state,
    //     loading: false,
    //     taskGroupDetails: [...state.taskGroupDetails, ...action.payload?.details?.data],
    //     getTaskGroupCurrentPages:
    //       action.payload?.details?.next_page,

    //     getTaskGroupDetails: action?.payload?.details?.data,
    //     taskGroupNumOfPages: action?.payload?.details?.num_pages,
    //     taskGroupCurrentPages:
    //       action?.payload?.details?.next_page === -1
    //         ? action?.payload?.details?.num_pages
    //         : action?.payload?.details?.next_page - 1,
    //   };
    //   break;
    // case GET_TASK_GROUP_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };
    //   break;

    case GET_REFERENCE_ID:
      state = {
        ...state,
        getReferenceId: action.payload,
        loading: true
      };
      break;

    case GET_SUBTASK_ID:
      state = {
        ...state,
        getSubTaskId: action.payload,
        loading: true
      };
      break;

    /* ADD TASK */

    case ADD_TASK:

      state = { ...state, addingTask: undefined };
      break;

    case ADD_TASK_SUCCESS:

      state = { ...state, addingTask: action.payload.details };
      break;

    case ADD_TASK_FAILURE:

      state = { ...state, addingTask: action.payload };
      break;
    /**add task group */
    // case ADD_TASK_GROUP:

    //   state = { ...state, addTaskGroup: undefined };
    //   break;

    // case ADD_TASK_GROUP_SUCCESS:

    //   state = { ...state, addTaskGroup: action.payload.details };
    //   break;

    // case ADD_TASK_GROUP_FAILURE:

    //   state = { ...state, addTaskGroup: action.payload };
    //   break;

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

    case GET_CURRENT_PAGE:
      state = { ...state, current: action.payload }
      break;


    case GET_TASKS_ITEM:
      state = { ...state, taskItem: action.payload }
      break;
    case LOGIN_USER:

      state = { ...state, loginUserSuccess: action.payload };
      break;

    case GET_TASK_SUB_GROUP:
      state = { ...state, showSubTaskGroup: undefined }
      break;
    case GET_TASK_SUB_GROUP_SUCCESS:

      state = { ...state, showSubTaskGroup: action.payload?.details }

      break;
    case GET_TASK_SUB_GROUP_FAILURE:
      state = { ...state, showSubTaskGroup: undefined }
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

