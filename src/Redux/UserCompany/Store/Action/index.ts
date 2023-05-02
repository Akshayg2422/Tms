
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
  console.log('jjj==', JSON.stringify(response))
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
