import {
  GET_ASSOCIATED_BRANCH,
  GET_ASSOCIATED_BRANCH_FAILURE,
  GET_ASSOCIATED_BRANCH_SUCCESS,
  GET_TASK_GROUP,
  GET_TASK_GROUP_FAILURE,
  GET_TASK_GROUP_SUCCESS,
  ADD_TASK_GROUP,
  ADD_TASK_GROUP_SUCCESS,
  ADD_TASK_GROUP_FAILURE,
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
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_PROFILE_PHOTO,
  UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS,
  UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE,
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,

  REGISTER_ADMIN,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAILURE,

  REGISTER_COMPANY,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAILURE,


  RESTORE_USER_COMPANY,
} from '../ActionTypes';
import { UserCompanyStateProp } from '../../Interfaces';

import * as ActionTypes from '../ActionTypes'
const initialState: UserCompanyStateProp = {

  loading: false,
  error: '',
  designationData: undefined,
  departmentData: undefined,
  designationCurrentPages: undefined,
  designationNumOfPages: undefined,
  departmentCurrentPages:undefined,
  departmentNumOfPages: undefined,
  employees: undefined,
  brandSector: undefined,
  ticketTag: undefined,
  brandSectorCurrentPages: undefined,
  brandSectorNumOfPages: undefined,
  addEmployeeDetails: undefined,
  updateEmployeeProfile: undefined,
  ticketTagCurrentPages: undefined,
  ticketTagNumOfPages: undefined,
  getTaskGroupDetails: undefined,
  getTaskGroupCurrentPages: undefined,
  taskGroupDetails: undefined,
  taskGroupCurrentPages: undefined,
  taskGroupNumOfPages: undefined,
  addTaskGroup: undefined,
  associatedCompanies: undefined,
  associatedCompaniesNumOfPages: undefined,
  associatedCompaniesCurrentPages: 1,
  response: undefined,
  registerAdminResponse: undefined,
  associatedCompaniesL: undefined,
  dashboardDetails: undefined
}

const UserCompanyReducer = (state: UserCompanyStateProp = initialState, action: any) => {

  switch (action.type) {

    case RESTORE_USER_COMPANY:
      state = initialState;
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
        departmentData: action?.payload?.details?.data,
        departmentNumOfPages: action?.payload?.details?.num_pages,
        departmentCurrentPages:
          action?.payload?.details?.next_page === -1
            ? action?.payload?.details?.num_pages
            : action?.payload?.details?.next_page - 1,
      };
      break;
    case FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

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
      state = {
        ...state,
        brandSector: undefined,
        brandSectorNumOfPages: 0,
        brandSectorCurrentPages: 1,
        loading: true
      };
      break;
    case GET_BRAND_SECTOR_SUCCESS:
      state = {
        ...state,
        loading: false,
        brandSector: action?.payload?.data,
        brandSectorNumOfPages: action?.payload?.num_pages,
        brandSectorCurrentPages:
          action?.payload?.next_page === -1
            ? action?.payload?.num_pages
            : action?.payload?.next_page - 1,
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

      state = {
        ...state,
        ticketTag: undefined,
        ticketTagNumOfPages: 0,
        ticketTagCurrentPages: 1,
        loading: true
      };

      break;
    case GET_TICKET_TAG_SUCCESS:
      state = {
        ...state,
        loading: false,
        ticketTag: action?.payload?.data,
        ticketTagNumOfPages: action?.payload?.num_pages,
        ticketTagCurrentPages:
          action?.payload?.next_page === -1
            ? action?.payload?.num_pages
            : action?.payload?.next_page - 1,
      };
      break;
    case GET_TICKET_TAG_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**get task group */
    case GET_TASK_GROUP:
      const { page_number } = action.payload.params
      state = {
        ...state,
        // taskGroupDetails: page_number === 1 ? [] : state.taskGroupDetails,
        getTaskGroupDetails: undefined,
        taskGroupNumOfPages: 0,
        taskGroupCurrentPages: 1,
        loading: true
      };

      break;
    case GET_TASK_GROUP_SUCCESS:
      state = {
        ...state,
        loading: false,
        // taskGroupDetails: [...state.taskGroupDetails, ...action.payload?.details?.data],
        getTaskGroupCurrentPages:
          action.payload?.details?.next_page,

        getTaskGroupDetails: action?.payload?.details?.data,
        taskGroupNumOfPages: action?.payload?.details?.num_pages,
        taskGroupCurrentPages:
          action?.payload?.details?.next_page === -1
            ? action?.payload?.details?.num_pages
            : action?.payload?.details?.next_page - 1,
      };
      break;
    case GET_TASK_GROUP_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**add task group */
    case ADD_TASK_GROUP:

      state = { ...state, addTaskGroup: undefined };
      break;

    case ADD_TASK_GROUP_SUCCESS:

      state = { ...state, addTaskGroup: action.payload.details };
      break;

    case ADD_TASK_GROUP_FAILURE:

      state = { ...state, addTaskGroup: action.payload };
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

    case ADD_EMPLOYEE:
      state = {
        ...state,
        addEmployeeDetails: undefined,
      };
      break;
    case ADD_EMPLOYEE_SUCCESS:
      state = {
        ...state,
        addEmployeeDetails: action.payload.details,
      };
      break;
    case ADD_EMPLOYEE_FAILURE:
      state = { ...state, addEmployeeDetails: undefined };
      break;

    case UPDATE_EMPLOYEE_PROFILE_PHOTO:
      state = {
        ...state,
        updateEmployeeProfile: undefined,
      };
      break;
    case UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS:
      state = {
        ...state,
        updateEmployeeProfile: action.payload.details,
      };
      break;
    case UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE:
      state = { ...state, updateEmployeeProfile: undefined };
      break;


    case GET_EMPLOYEES:
      state = {
        ...state
      };

      break;
    case GET_EMPLOYEES_SUCCESS:
      state = {
        ...state,
        employees: action.payload.details,
      };
      break;
    case GET_EMPLOYEES_FAILURE:
      state = { ...state, employees: action.payload };
      break;

    case REGISTER_COMPANY:
      state = { ...state };
      break;
    case REGISTER_COMPANY_SUCCESS:
      state = { ...state, response: action.payload };
      break;
    case REGISTER_COMPANY_FAILURE:
      state = { ...state, response: action.payload };
      break;
    case REGISTER_ADMIN:
      state = { ...state };
      break;
    case REGISTER_ADMIN_SUCCESS:
      state = { ...state, loading: false, registerAdminResponse: action.payload };
      break;
    case REGISTER_ADMIN_FAILURE:
      state = { ...state };
      break;

    /**
     * get Comnpanied L
     */


    case ActionTypes.GET_ASSOCIATED_COMPANIES_L:
      state = { ...state, associatedCompaniesL: undefined };
      break;
    case ActionTypes.GET_ASSOCIATED_COMPANIES_L_SUCCESS:
      state = { ...state, associatedCompaniesL: action.payload.details };
      break;
    case ActionTypes.GET_ASSOCIATED_COMPANIES_L_FAILURE:
      state = { ...state, loading: false, associatedCompaniesL: action.payload };
      break;


    /**
 * Dashboard
 */
    case ActionTypes.GET_DASHBOARD:
      state = { ...state, dashboardDetails: undefined };
      break;
    case ActionTypes.GET_DASHBOARD_SUCCESS:
      state = { ...state, dashboardDetails: action.payload.details };
      break;
    case ActionTypes.GET_DASHBOARD_FAILURE:
      state = { ...state, dashboardDetails: action.payload };
      break;

    default:
      state = state;
      break;
  }
  return state;
}
export { UserCompanyReducer }