
import { AUTO_COMPLETE_DROPDOWN } from '@Redux//Company';
import {

  GET_ASSOCIATED_COMPANY_BRANCH,
  GET_ASSOCIATED_COMPANY_BRANCH_SUCCESS,
  GET_ASSOCIATED_COMPANY_BRANCH_FAILURE,
  SET_SELECTED_ISSUES,
  SET_REFERENCE_SELECTED_ISSUES,
  COMPANY_SELECTED_DETAILS,
  REFERENCE_ISSUE_DETAILS,
  RESTORE_ADMIN,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,

  GET_TASKS_ITEM,
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

export const RestoreAdmin = () => {
  return {
    type: RESTORE_ADMIN,


  };
};



export const getAssociatedCompanyBranch = (params: any) => {

  return {
    type: GET_ASSOCIATED_COMPANY_BRANCH,
    payload: params,
  };
};
export const getAssociatedCompanyBranchSuccess = (response: any) => {


  return {
    type: GET_ASSOCIATED_COMPANY_BRANCH_SUCCESS,
    payload: response,
  };
};
export const getAssociatedCompanyBranchFailure = (error: any) => {
  return {
    type: GET_ASSOCIATED_COMPANY_BRANCH_FAILURE,
    payload: error,
  };
};



/**
 *
 */

export const setSelectedIssues = (response: any) => {
  return {
    type: SET_SELECTED_ISSUES,
    payload: response,
  };
};
export const setSelectedReferenceIssues = (response: any) => {

  return {
    type: SET_REFERENCE_SELECTED_ISSUES,
    payload: response,
  };
};

/**
 * COMPANY SELECTED DETAILS
 */
export const companySelectedDetails = (response) => {
  return {
    type: COMPANY_SELECTED_DETAILS,
    payload: response,
  }
}
export const referenceIssueDetails = (params) => {
  return {
    type: REFERENCE_ISSUE_DETAILS,
    payload: params,
  }
}

/* Tasks */


export const loginUser = (params: any) => {

  return {
    type: LOGIN_USER,
    payload: params
  }
}


/* CREATE TASK */
export const addTask = (params: any) => {
  return {
    type: ADD_TASK,
    payload: params
  }
}
export const addTaskSuccess = (response: any) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: response
  }
}
export const addTaskFailure = (error: any) => {
  return {
    type: ADD_TASK_FAILURE,
    payload: error
  }
}


export const getTaskItem = (params: any) => {

  return {
    type: GET_TASKS_ITEM,
    payload: params
  }
}






export const getSelectReferenceId = (response) => {
  return {
    type: GET_REFERENCE_ID,
    payload: response,

  }
}

export const getSelectSubTaskId = (response) => {
  return {
    type: GET_SUBTASK_ID,
    payload: response,

  }
}


export const getTicketUsers = (params: any) => {

  return {
    type: GET_TICKET_USERS,
    payload: params
  }
}

export const getTicketUsersSuccess = (response: any) => {


  return {

    type: GET_TICKET_USERS_SUCCESS,
    payload: response
  }
}

export const getTicketUsersFailure = (error: any) => {
  return {
    type: GET_TICKET_USERS_FAILURE,
    payload: error
  }
}


export const getCurrentPage = (params: any) => {

  return {
    type: GET_CURRENT_PAGE,
    payload: params
  }
}



export const getTaskSubGroup = (params: any) => {
  return {
    type: GET_TASK_SUB_GROUP,
    payload: params
  }
}

export const getTaskSubGroupSuccess = (response: any) => {


  return {
    type: GET_TASK_SUB_GROUP_SUCCESS,
    payload: response
  }
}

export const getTaskSubGroupFailure = (error: any) => {


  return {
    type: GET_TASK_SUB_GROUP_FAILURE,
    payload: error
  }
}

export const autoCompleteDropDown = (params: any) => {
  return {
    type: AUTO_COMPLETE_DROPDOWN,
    payload: params
  }
}

