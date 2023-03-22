import {
  GET_ASSOCIATED_BRANCH,
  GET_ASSOCIATED_BRANCH_SUCCESS,
  GET_ASSOCIATED_BRANCH_FAILURE,
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

} from '../ActionTypes';

export const RestoreAdmin = () => {
  return {
    type: RESTORE_ADMIN,


  };
};

export const getAssociatedBranch = (params: any) => {
  console.log(params, "jjjjjjjjjjjjjj");

  return {
    type: GET_ASSOCIATED_BRANCH,
    payload: params,
  };
};
export const getAssociatedBranchSuccess = (response: any) => {
  return {
    type: GET_ASSOCIATED_BRANCH_SUCCESS,
    payload: response,
  };
};
export const getAssociatedBranchFailure = (error: any) => {
  return {
    type: GET_ASSOCIATED_BRANCH_FAILURE,
    payload: error,
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

export const getDashboard = (params: any) => {
  return {
    type: GET_DASHBOARD,
    payload: params,
  };
};
export const getDashboardSuccess = (response: any) => {
  return {
    type: GET_DASHBOARD_SUCCESS,
    payload: response,
  };
};
export const getDashboardFailure = (error: any) => {
  return {
    type: GET_DASHBOARD_FAILURE,
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
 * add department
 */
export const addDepartment = (params) => {
  return {
    type: ADD_DEPARTMENT,
    payload: params,
  };
};

export const addDepartmentSuccess = (response) => {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const addDepartmentFailure = (error) => {
  return {
    type: ADD_DEPARTMENT_FAILURE,
    payload: error,
  };
};
/**
 * add designation
 */
export const addDesignation = (params) => {
  return {
    type: ADD_DESIGNATION,
    payload: params,
  };
};

export const addDesignationSuccess = (response) => {
  return {
    type: ADD_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const addDesignationFailure = (error) => {
  return {
    type: ADD_DESIGNATION_FAILURE,
    payload: error,
  };
};
//get designation

export const getDesignationData = (params) => {
  return {
    type: FETCH_DESIGNATION,
    payload: params,
  };
};

export const getDesignationDataSuccess = (response) => {
  return {
    type: FETCH_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const getDesignationDataFailure = (error) => {
  return {
    type: FETCH_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get departments

export const getDepartmentData = (params) => {
  return {
    type: FETCH_DEPARTMENT,
    payload: params,
  };
};

export const getDepartmentDataSuccess = (response) => {
  return {
    type: FETCH_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const getDepartmentDataFailure = (error) => {
  return {
    type: FETCH_DEPARTMENT_FAILURE,
    payload: error,
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

export const getTasks = (params: any) => {
  return {
    type: GET_TASKS,
    payload: params
  }
}

export const getTasksSuccess = (response: any) => {
  return {

    type: GET_TASKS_SUCCESS,
    payload: response
  }
}

export const getTasksFailure = (error: any) => {
  return {
    type: GET_TASKS_FAILURE,
    payload: error
  }
}

/* CREATE TASK */
export const getAddTask = (params: any) => {
  return {
    type: ADD_TASK,
    payload: params
  }
}
export const getAddTaskSuccess = (response: any) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: response
  }
}
export const getAddTaskFailure = (error: any) => {
  return {
    type: ADD_TASK_FAILURE,
    payload: error
  }
}