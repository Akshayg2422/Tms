import {
  GET_ASSOCIATED_BRANCH,
  GET_ASSOCIATED_BRANCH_FAILURE,
  GET_ASSOCIATED_BRANCH_SUCCESS,
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
} from '../ActionTypes';

import {AdminStateProp} from '../../Interfaces';

const initialState: AdminStateProp = {
  associatedCompanies: undefined,
  dashboardDetails: undefined,
  selectedIssues: undefined,
  loading: false,
  error: '',
  designationData: undefined,
  departmentData: undefined,
  companyDetailsSelected:undefined,
  referenceIssueSelectedDetails:undefined,
  selectedReferenceIssues:undefined,

};

const AdminReducer = (state: AdminStateProp = initialState, action: any) => {
  switch (action.type) {

    case RESTORE_ADMIN:
      state = initialState;
      break;
      
    case GET_ASSOCIATED_BRANCH:
      state = {...state};
      break;
    case GET_ASSOCIATED_BRANCH_SUCCESS:
      state = {...state, associatedCompanies: action.payload.details};
      break;
    case GET_ASSOCIATED_BRANCH_FAILURE:
      state = {...state};
      break;
    /**
     * Dashboard
     */
    case GET_DASHBOARD:
      state = {...state, dashboardDetails: undefined};
      break;
    case GET_DASHBOARD_SUCCESS:
      state = {...state, dashboardDetails: action.payload.details};
      break;
    case GET_DASHBOARD_FAILURE:
      state = {...state, dashboardDetails: action.payload};
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
      state = { ...state, loading: true };
      break;
    case FETCH_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        departmentData: action.payload,
      };
      break;
    case FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get designations

    case FETCH_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case FETCH_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        designationData: action.payload,
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
       case COMPANY_SELECTED_DETAILS :
        state ={
          ...state,
          companyDetailsSelected:action.payload
        };
        break;

        /**
         * REFERENCE ISSUE DETAILS
         */
         case REFERENCE_ISSUE_DETAILS :
          state ={
            ...state,
            referenceIssueSelectedDetails:action.payload,
          };
          break;

    /**
     * Issue Item
     */

    case SET_SELECTED_ISSUES:
      
      state = {...state, selectedIssues: action.payload};
      break;

      case SET_REFERENCE_SELECTED_ISSUES:
      
        state = {...state, selectedReferenceIssues: action.payload};
        break;

    default:
      state = state;
      break;
  }
  return state;

  

  
};
export {AdminReducer};
