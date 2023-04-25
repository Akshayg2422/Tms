
import { AUTO_COMPLETE_DROPDOWN } from '@Redux//Company';
import {

  GET_ASSOCIATED_COMPANY_BRANCH,
  GET_ASSOCIATED_COMPANY_BRANCH_SUCCESS,
  GET_ASSOCIATED_COMPANY_BRANCH_FAILURE,
  GET_DASHBOARD,
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_SUCCESS,
  SET_SELECTED_ISSUES,
  SET_REFERENCE_SELECTED_ISSUES,


  GET_REFERENCE_TASKS,
  GET_REFERENCE_TASKS_SUCCESS,
  GET_REFERENCE_TASKS_FAILURE,

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


// export const getTaskGroup = (params: any) => {
//   return {
//     type: GET_TASK_GROUP,
//     payload: params
//   }
// }
// export const getTaskGroupSuccess = (response: any) => {

//   return {
//     type: GET_TASK_GROUP_SUCCESS,
//     payload: response
//   }
// }
// export const getTaskGroupFailure = (error: any) => {

//   return {
//     type: GET_TASK_GROUP_FAILURE,
//     payload: error
//   }
// }

// export const addTaskGroup = (params: any) => {
//   return {
//     type: ADD_TASK_GROUP,
//     payload: params
//   }
// }

// export const addTaskGroupSuccess = (response: any) => {


//   return {
//     type: ADD_TASK_GROUP_SUCCESS,
//     payload: response
//   }
// }

// export const addTaskGroupFailure = (error: any) => {


//   return {
//     type: ADD_TASK_GROUP_FAILURE,
//     payload: error
//   }
// }


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

//GET TASK HISTORY

export const getTaskHistory = (params) => {

  return {
    type: GET_TASK_HISTORY,
    payload: params,
  };
};

export const getTaskHistorySuccess = (response) => {

  return {
    type: GET_TASK_HISTORY_SUCCESS,
    payload: response,
  };
};

export const getTaskHistoryFailure = (error) => {


  return {
    type: GET_TASK_HISTORY_FAILURE,
    payload: error,
  };
};
