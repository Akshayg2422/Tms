
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

  GET_BRAND_SECTOR,
  GET_BRAND_SECTOR_SUCCESS,
  GET_BRAND_SECTOR_FAILURE,
  GET_TICKET_TAG,
  GET_TICKET_TAG_SUCCESS,
  GET_TICKET_TAG_FAILURE,
  ADD_BRAND_SECTOR,
  ADD_BRAND_SECTOR_SUCCESS,
  ADD_BRAND_SECTOR_FAILURE,
  ADD_TICKET_TAG,
  ADD_TICKET_TAG_SUCCESS,
  ADD_TICKET_TAG_FAILURE,
  GET_REFERENCE_TASKS,
  GET_REFERENCE_TASKS_SUCCESS,
  GET_REFERENCE_TASKS_FAILURE,

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

  GET_TASK_USERS,
  GET_TASK_USERS_SUCCESS,
  GET_TASK_USERS_FAILURE,
  GET_TICKET_USERS,
  GET_TICKET_USERS_SUCCESS,
  GET_TICKET_USERS_FAILURE,
  GET_CURRENT_PAGE,
  GET_TASK_GROUP,
  ADD_TASK_GROUP,
  GET_TASK_GROUP_FAILURE,
  GET_TASK_GROUP_SUCCESS,
  ADD_TASK_GROUP_SUCCESS,
  ADD_TASK_GROUP_FAILURE,
  GET_REFERENCE_ID,

} from '../ActionTypes';

export const RestoreAdmin = () => {
  return {
    type: RESTORE_ADMIN,


  };
};

export const getAssociatedBranch = (params: any) => {


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

export const getDepartmentData = (params:any) => {
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

/* GET SUB TASK*/

export const getSubTasks = (params: any) => {
  return {
    type: GET_SUB_TASKS,
    payload: params
  }
}

export const getSubTasksSuccess = (response: any) => {
  return {

    type: GET_SUB_TASKS_SUCCESS,
    payload: response
  }
}

export const getSubTasksFailure = (error: any) => {
  return {
    type: GET_SUB_TASKS_FAILURE,
    payload: error
  }
}

export const getTaskItem = (params: any) => {
  return {
    type: GET_TASKS_ITEM,
    payload: params
  }
}


/**
 * add department
 */
export const addBrandSector = (params) => {
  return {
    type: ADD_BRAND_SECTOR,
    payload: params,
  };
};

export const addBrandSectorSuccess = (response) => {
  return {
    type: ADD_BRAND_SECTOR_SUCCESS,
    payload: response,
  };
};

export const addBrandSectorFailure = (error) => {
  return {
    type: ADD_BRAND_SECTOR_FAILURE,
    payload: error,
  };
};
/**
 * add designation
 */
export const addTicketTag = (params) => {
  return {
    type: ADD_TICKET_TAG,
    payload: params,
  };
};

export const addTicketTagSuccess = (response) => {
  return {
    type: ADD_TICKET_TAG_SUCCESS,
    payload: response,
  };
};

export const addTicketTagFailure = (error) => {
  return {
    type: ADD_TICKET_TAG_FAILURE,
    payload: error,
  };
};
//get designation

export const getBrandSector = (params) => {
  return {
    type: GET_BRAND_SECTOR,
    payload: params,
  };
};

export const getBrandSectorSuccess = (response) => {
  return {
    type: GET_BRAND_SECTOR_SUCCESS,
    payload: response,
  };
};

export const getBrandSectorFailure = (error) => {
  return {
    type: GET_BRAND_SECTOR_FAILURE,
    payload: error,
  };
};

//get departments

export const getTicketTag = (params) => {
  return {
    type: GET_TICKET_TAG,
    payload: params,
  };
};

export const getTicketTagSuccess = (response) => {

  return {
    type: GET_TICKET_TAG_SUCCESS,
    payload: response,
  };
};

export const getTicketTagFailure = (error) => {
  return {
    type: GET_TICKET_TAG_FAILURE,
    payload: error,
  };
};

export const getReferenceTasks = (params) => {

  return {
    type: GET_REFERENCE_TASKS,
    payload: params,
  };
};

export const getReferenceTasksSuccess = (response) => {



  return {
    type: GET_REFERENCE_TASKS_SUCCESS,
    payload: response,
  };
};

export const getReferenceTasksFailure = (error) => {
  return {
    type: GET_REFERENCE_TASKS_FAILURE,
    payload: error,
  };
};


export const getReferenceId=(params)=>{
  return{
    type: GET_REFERENCE_ID,
    payload: params,

  }
}
/* Task Users */

export const getTaskUsers = (params: any) => {
  return {
    type: GET_TASK_USERS,
    payload: params
  }
}

export const getTaskUsersSuccess = (response: any) => {

  return {

    type: GET_TASK_USERS_SUCCESS,
    payload: response
  }
}

export const getTaskUsersFailure = (error: any) => {
  return {
    type: GET_TASK_USERS_FAILURE,
    payload: error
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


export const getTaskGroup = (params: any) => {
  return {
    type: GET_TASK_GROUP,
    payload: params
  }
}
export const getTaskGroupSuccess = (response: any) => {

  return {
    type: GET_TASK_GROUP_SUCCESS,
    payload: response
  }
}
export const getTaskGroupFailure = (error: any) => {

  return {
    type: GET_TASK_GROUP_FAILURE,
    payload: error
  }
}

export const addTaskGroup = (params: any) => {


  return {
    type: ADD_TASK_GROUP,
    payload: params
  }
}

export const addTaskGroupSuccess = (response: any) => {


  return {
    type: ADD_TASK_GROUP_SUCCESS,
    payload: response
  }
}

export const addTaskGroupFailure = (error: any) => {


  return {
    type: ADD_TASK_GROUP_FAILURE,
    payload: error
  }
}