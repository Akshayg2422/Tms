
import * as ActionTypes from '../ActionTypes'


export const RestoreUserCompany = () => {
  return {
    type: ActionTypes.RESTORE_USER_COMPANY,
  };
};

export const addDepartment = (params) => {
  return {
    type: ActionTypes.ADD_DEPARTMENT,
    payload: params,
  };
};

export const addDepartmentSuccess = (response) => {

  return {
    type: ActionTypes.ADD_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const addDepartmentFailure = (error) => {
  return {
    type: ActionTypes.ADD_DEPARTMENT_FAILURE,
    payload: error,
  };
};

export const addDesignation = (params) => {
  console.log("designationparams--->", params)
  return {
    type: ActionTypes.ADD_DESIGNATION,
    payload: params,
  };
};

export const addDesignationSuccess = (response) => {
  return {
    type: ActionTypes.ADD_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const addDesignationFailure = (error) => {
  return {
    type: ActionTypes.ADD_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get designation

export const getDesignations = (params: any) => {
  return {
    type: ActionTypes.FETCH_DESIGNATION,
    payload: params,
  };
};

export const getDesignationsSuccess = (response: any) => {
  return {
    type: ActionTypes.FETCH_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const getDesignationsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get departments

export const getDepartments = (params: any) => {
  return {
    type: ActionTypes.FETCH_DEPARTMENT,
    payload: params,
  };
};

export const getDepartmentsSuccess = (response: any) => {
  return {
    type: ActionTypes.FETCH_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const getDepartmentsFailure = (error: any) => {
  return {
    type: ActionTypes.FETCH_DEPARTMENT_FAILURE,
    payload: error,
  };
};

export const getTaskGroup = (params: any) => {
  return {
    type: ActionTypes.GET_TASK_GROUP,
    payload: params
  }
}
export const getTaskGroupSuccess = (response: any) => {

  return {
    type: ActionTypes.GET_TASK_GROUP_SUCCESS,
    payload: response
  }
}
export const getTaskGroupFailure = (error: any) => {


  return {
    type: ActionTypes.GET_TASK_GROUP_FAILURE,
    payload: error
  }
}

export const getBrandSector = (params) => {
  return {
    type: ActionTypes.GET_BRAND_SECTOR,
    payload: params,
  };
};

export const getBrandSectorSuccess = (response) => {
  return {
    type: ActionTypes.GET_BRAND_SECTOR_SUCCESS,
    payload: response,
  };
};

export const getBrandSectorFailure = (error) => {
  return {
    type: ActionTypes.GET_BRAND_SECTOR_FAILURE,
    payload: error,
  };
};

export const getTicketTag = (params: any) => {
  return {
    type: ActionTypes.GET_TICKET_TAG,
    payload: params,
  };
};

export const getTicketTagSuccess = (response: any) => {

  return {
    type: ActionTypes.GET_TICKET_TAG_SUCCESS,
    payload: response,
  };
};

export const getTicketTagFailure = (error: any) => {
  return {
    type: ActionTypes.GET_TICKET_TAG_FAILURE,
    payload: error,
  };
};

/**
* add designation
*/
export const addTicketTag = (params) => {
  return {
    type: ActionTypes.ADD_TICKET_TAG,
    payload: params,
  };
};

export const addTicketTagSuccess = (response) => {
  return {
    type: ActionTypes.ADD_TICKET_TAG_SUCCESS,
    payload: response,
  };
};

export const addTicketTagFailure = (error) => {
  return {
    type: ActionTypes.ADD_TICKET_TAG_FAILURE,
    payload: error,
  };
};

export const addBrandSector = (params) => {
  return {
    type: ActionTypes.ADD_BRAND_SECTOR,
    payload: params,
  };
};

export const addBrandSectorSuccess = (response) => {
  return {
    type: ActionTypes.ADD_BRAND_SECTOR_SUCCESS,
    payload: response,
  };
};

export const addBrandSectorFailure = (error) => {
  return {
    type: ActionTypes.ADD_BRAND_SECTOR_FAILURE,
    payload: error,
  };
};

export const addTaskGroup = (params: any) => {
  return {
    type: ActionTypes.ADD_TASK_GROUP,
    payload: params
  }
}

export const addTaskGroupSuccess = (response: any) => {


  return {
    type: ActionTypes.ADD_TASK_GROUP_SUCCESS,
    payload: response
  }
}

export const addTaskGroupFailure = (error: any) => {


  return {
    type: ActionTypes.ADD_TASK_GROUP_FAILURE,
    payload: error
  }
}

//assocatCompany

export const getAssociatedBranch = (params: any) => {


  return {
    type: ActionTypes.GET_ASSOCIATED_BRANCH,
    payload: params,
  };
};
export const getAssociatedBranchSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_ASSOCIATED_BRANCH_SUCCESS,
    payload: response,
  };
};
export const getAssociatedBranchFailure = (error: any) => {
  return {
    type: ActionTypes.GET_ASSOCIATED_BRANCH_FAILURE,
    payload: error,
  };
};


/**
*add Employee tags
* @param params
* @returns
*/

export const addEmployee = (params: any) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE,
    payload: params,
  };
};

export const addEmployeeSuccess = (response: any) => {

  return {
    type: ActionTypes.ADD_EMPLOYEE_SUCCESS,
    payload: response,

  };
};

export const addEmployeeFailure = (error: any) => {

  return {
    type: ActionTypes.ADD_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const addUpdateEmployeePhoto = (params: any) => {

  return {
    type: ActionTypes.UPDATE_EMPLOYEE_PROFILE_PHOTO,
    payload: params,
  };
};

export const addUpdateEmployeePhotoSuccess = (response: any) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS,
    payload: response,
  };
};

export const addUpdateEmployeePhotoFailure = (error: any) => {

  return {
    type: ActionTypes.UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE,
    payload: error,
  };
};
/**
 *get Employee tags
 * @param params
 * @returns
 */

export const getEmployees = (params: any) => {

  return {
    type: ActionTypes.GET_EMPLOYEES,
    payload: params,
  };
};

export const getEmployeesSuccess = (response: any) => {

  return {
    type: ActionTypes.GET_EMPLOYEES_SUCCESS,
    payload: response,
  };
};

export const getEmployeesFailure = (error: any) => {
  return {
    type: ActionTypes.GET_EMPLOYEES_FAILURE,
    payload: error,
  };
};


// GETEMPLOYESSL

export const getEmployeesl = (params: any) => {

  return {
    type: ActionTypes.GET_EMPLOYEESL,
    payload: params,
  };
};

export const getEmployeeslSuccess = (response: any) => {

  return {
    type: ActionTypes.GET_EMPLOYEESL_SUCCESS,
    payload: response,
  };
};

export const getEmployeeslFailure = (error: any) => {
  return {
    type: ActionTypes.GET_EMPLOYEESL_FAILURE,
    payload: error,
  };
};



// GETEmployeetimeline

export const getEmployeeTimeline = (params: any) => {

  return {
    type: ActionTypes.GET_EMPLOYEE_TIMELINE,
    payload: params,
  };
};

export const getEmployeeTimelineSuccess = (response: any) => {

  return {
    type: ActionTypes.GET_EMPLOYEE_TIMELINE_SUCCESS,
    payload: response,
  };
};

export const getEmployeeTimelineFailure = (error: any) => {
  return {
    type: ActionTypes.GET_EMPLOYEE_TIMELINE_FAILURE,
    payload: error,
  };
};

// addEmpoyeetimeline

export const addEmployeeTimeline = (params: any) => {

  return {
    type: ActionTypes.ADD_EMPLOYEE_TIMELINE,
    payload: params,
  };
};

export const addEmployeeTimelineSuccess = (response: any) => {

  return {
    type: ActionTypes.ADD_EMPLOYEE_TIMELINE_SUCCESS,
    payload: response,
  };
};

export const addEmployeeTimelineFailure = (error: any) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_TIMELINE_FAILURE,
    payload: error,
  };
};
export const registerAdmin = (params: any) => {
  return {
    type: ActionTypes.REGISTER_ADMIN,
    payload: params,
  };
};

export const registerAdminSuccess = (response: any) => {
  return {
    type: ActionTypes.REGISTER_ADMIN_SUCCESS,
    payload: response,
  };
};

export const registerAdminFailure = (error: any) => {
  return {
    type: ActionTypes.REGISTER_ADMIN_FAILURE,
    payload: error,
  };
};

export const registerCompany = (params: any) => {

  return {
    type: ActionTypes.REGISTER_COMPANY,
    payload: params,
  };
};

export const registerCompanySuccess = (response: any) => {
  return {
    type: ActionTypes.REGISTER_COMPANY_SUCCESS,
    payload: response,
  };
};

export const registerCompanyFailure = (error: any) => {
  return {
    type: ActionTypes.REGISTER_COMPANY_FAILURE,
    payload: error,
  };
};


/**
 * 
 */


export const getAssociatedCompaniesL = (params: any) => {

  return {
    type: ActionTypes.GET_ASSOCIATED_COMPANIES_L,
    payload: params,
  };
};
export const getAssociatedCompaniesLSuccess = (response: any) => {


  return {
    type: ActionTypes.GET_ASSOCIATED_COMPANIES_L_SUCCESS,
    payload: response,
  };
};
export const getAssociatedCompaniesLFailure = (error: any) => {
  return {
    type: ActionTypes.GET_ASSOCIATED_COMPANIES_L_FAILURE,
    payload: error,
  };
};

/**
 * get Dashboard Details
 */


export const getDashboard = (params: any) => {
  return {
    type: ActionTypes.GET_DASHBOARD,
    payload: params,
  };
};
export const getDashboardSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_DASHBOARD_SUCCESS,
    payload: response,
  };
};
export const getDashboardFailure = (error: any) => {
  return {
    type: ActionTypes.GET_DASHBOARD_FAILURE,
    payload: error,
  };
};


/**
 * get selected company
 */

export const setSelectedCompany = (response: any) => {
  return {
    type: ActionTypes.SET_SELECTED_COMPANY,
    payload: response,
  }
}

export const setSelectedEmployee = (response: any) => {
  return {
    type: ActionTypes.SET_SELECTED_EMPLOYEE,
    payload: response,
  }
}


//GET EVENTS
export const getEvents = (params: any) => {
  return {
    type: ActionTypes.GET_EVENTS,
    payload: params,
  };
};

export const getEventsSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_EVENTS_SUCCESS,
    payload: response,
  };
};

export const getEventsFailure = (error: any) => {
  return {
    type: ActionTypes.GET_EVENTS_FAILURE,
    payload: error,
  };
};

//ADD EVENTS
export const addEvent = (params: any) => {
  return {
    type: ActionTypes.ADD_EVENT,
    payload: params,
  };
};

export const addEventSuccess = (response: any) => {
  return {
    type: ActionTypes.ADD_EVENT_SUCCESS,
    payload: response,
  };
};

export const addEventFailure = (error: any) => {
  return {
    type: ActionTypes.ADD_EVENT_FAILURE,
    payload: error,
  };
};
/**
 * add employee details for video conference
 */


export const postVideoConference = (params: any) => {
  return {
    type: ActionTypes.POST_VIDEO_CONFERENCE,
    payload: params,
  };
};
export const postVideoConferenceSuccess = (response: any) => {
  return {
    type: ActionTypes.POST_VIDEO_CONFERENCE_SUCCESS,
    payload: response,
  };
};
export const postVideoConferenceFailure = (error: any) => {
  return {
    type: ActionTypes.POST_VIDEO_CONFERENCE_FAILURE,
    payload: error,
  };
};


/**
* get schedule meeting list
*/


export const getVideoConferenceList = (params: any) => {
  return {
    type: ActionTypes.GET_VIDEO_CONFERENCE_LIST,
    payload: params,
  };
};
export const getVideoConferenceListSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_VIDEO_CONFERENCE_LIST_SUCCESS,
    payload: response,
  };
};
export const getVideoConferenceListFailure = (error: any) => {
  return {
    type: ActionTypes.GET_VIDEO_CONFERENCE_LIST_FAILURE,
    payload: error,
  };
};


/**
* get token for meeting
*/


export const getTokenByUser = (params: any) => {
  return {
    type: ActionTypes.GET_TOKEN_BY_USER,
    payload: params,
  };
};
export const getTokenByUserSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_TOKEN_BY_USER_SUCCESS,
    payload: response,
  };
};
export const getTokenByUserFailure = (error: any) => {
  return {
    type: ActionTypes.GET_TOKEN_BY_USER_FAILURE,
    payload: error,
  };
};


/**
 * GET ASSOCIATED COMPANIES
 */

export const getAssociatedCompany = (params: any) => {
  console.log('actionnnnnnnnnnnnnnnn');

  return {
    type: ActionTypes.GET_ASSOCIATED_COMPANY,
    payload: params,
  };
};
export const getAssociatedCompanySuccess = (response: any) => {
  return {
    type: ActionTypes.GET_ASSOCIATED_COMPANY_SUCCESS,
    payload: response,
  };
};
export const getAssociatedCompanyFailure = (error: any) => {
  return {
    type: ActionTypes.GET_ASSOCIATED_COMPANY_FAILURE,
    payload: error,
  };
};

/**
 * ADD ASSOCIATED COMPANIES
 */

export const addAssociatedCompany = (params: any) => {
  console.log('actionnnnnnnnnnnnnnnn------------addAssociatedCompany');
  return {
    type: ActionTypes.ADD_ASSOCIATED_COMPANY,
    payload: params,
  };
};
export const addAssociatedCompanySuccess = (response: any) => {
  return {
    type: ActionTypes.ADD_ASSOCIATED_COMPANY_SUCCESS,
    payload: response,
  };
};
export const addAssociatedCompanyFailure = (error: any) => {
  return {
    type: ActionTypes.ADD_ASSOCIATED_COMPANY_FAILURE,
    payload: error,
  };
};

/* REFRESH USER COMPANY */

export const refreshUserCompanies = () => {
  return {
    type: ActionTypes.REFRESH_USER_COMPANY,
  }
}


//Get groups Employees

export const getGroupsEmployees = (params: any) => {
  return {
    type: ActionTypes.GET_GROUPS_EMPLOYEES,
    payload: params,
  };
};

export const getGroupsEmployeesSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_GROUPS_EMPLOYEES_SUCCESS,
    payload: response,
  };
};

export const getGroupsEmployeesFailure = (error: any) => {
  return {
    type: ActionTypes.GET_GROUPS_EMPLOYEES_FAILURE,
    payload: error,
  };
};

/**
 * refresh group Events
 */


export const refreshGroupEvents = () => {
  return {
    type: ActionTypes.REFRESH_GROUP_EVENTS,
  }
}

/**
 * store selected Group 
 */

export const setSelectedGroup = (group: any) => {
  return {
    type: ActionTypes.SELECTED_GROUP_ITEM,
    payload: group
  }
}

//Get group Message

export const getGroupMessage = (params: any) => {
  return {
    type: ActionTypes.GET_GROUP_MESSAGE,
    payload: params,
  };
};

export const getGroupMessageSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_GROUP_MESSAGE_SUCCESS,
    payload: response,
  };
};

export const getGroupMessageFailure = (error: any) => {
  return {
    type: ActionTypes.GET_GROUP_MESSAGE_FAILURE,
    payload: error,
  };
};

//Add group Message

export const addGroupMessage = (params: any) => {
  return {
    type: ActionTypes.ADD_GROUP_MESSAGE,
    payload: params,
  };
};

export const addGroupMessageSuccess = (response: any) => {
  return {
    type: ActionTypes.ADD_GROUP_MESSAGE_SUCCESS,
    payload: response,
  };
};

export const addGroupMessageFailure = (error: any) => {
  return {
    type: ActionTypes.ADD_GROUP_MESSAGE_FAILURE,
    payload: error,
  };
};


//GET SUB GROUP
export const getSubGroup = (params: any) => {
  return {
    type: ActionTypes.GET_SUB_GROUP,
    payload: params,
  };
};

export const getSubGroupSuccess = (response: any) => {
  return {
    type: ActionTypes.GET_SUB_GROUP_SUCCESS,
    payload: response,
  };
};

export const getSubGroupFailure = (error: any) => {
  return {
    type: ActionTypes.GET_SUB_GROUP_FAILURE,
    payload: error,
  };
};

/**
 * selected Message Group
 */


export const setSelectedGroupChatCode = (value: any) => {
  return {
    type: ActionTypes.SELECTED_GROUP_CHAT_CODE,
    payload: value,
  };
};

//Add group USER

export const addGroupUser = (params: any) => {
  return {
    type: ActionTypes.ADD_GROUP_USER,
    payload: params,
  };
};

export const addGroupUserSuccess = (response: any) => {
  return {
    type: ActionTypes.ADD_GROUP_USER_SUCCESS,
    payload: response,
  };
};

export const addGroupUserFailure = (error: any) => {
  return {
    type: ActionTypes.ADD_GROUP_USER_FAILURE,
    payload: error,
  };
};

