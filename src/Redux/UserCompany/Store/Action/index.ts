

import{
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,
    GET_TASK_GROUP,
    ADD_TASK_GROUP,
    GET_TASK_GROUP_FAILURE,
    GET_TASK_GROUP_SUCCESS,
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
    GET_ASSOCIATED_BRANCH,
    GET_ASSOCIATED_BRANCH_SUCCESS,
    GET_ASSOCIATED_BRANCH_FAILURE,
    ADD_EMPLOYEE,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE,
    UPDATE_EMPLOYEE_PROFILE_PHOTO,
    UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS,
    UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE,

    REGISTER_ADMIN,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAILURE,

    REGISTER_COMPANY,
    REGISTER_COMPANY_SUCCESS,
    REGISTER_COMPANY_FAILURE,


    RESTORE_USER_COMPANY} from '../ActionTypes';



export const RestoreUserCompany = () => {
    return {
      type: RESTORE_USER_COMPANY,
  
  
    };
  };

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

export const getDepartmentData = (params: any) => {
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

  //assocatCompany

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
  

  /**
 *add Employee tags
 * @param params
 * @returns
 */

export const addEmployee = (params: any) => {
  return {
    type: ADD_EMPLOYEE,
    payload: params,
  };
};

export const addEmployeeSuccess = (response: any) => {

  return {
    type: ADD_EMPLOYEE_SUCCESS,
    payload: response,

  };
};

export const addEmployeeFailure = (error: any) => {

  return {
    type: ADD_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const addUpdateEmployeePhoto = (params: any) => {
 
  return {
    type:UPDATE_EMPLOYEE_PROFILE_PHOTO,
    payload: params,
  };
};

export const addUpdateEmployeePhotoSuccess = (response: any) => {
  return {
    type:UPDATE_EMPLOYEE_PROFILE_PHOTO_SUCCESS,
    payload: response,
  };
};

export const addUpdateEmployeePhotoFailure = (error: any) => {

  return {
    type:UPDATE_EMPLOYEE_PROFILE_PHOTO_FAILURE,
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
    type: GET_EMPLOYEES,
    payload: params,
  };
};

export const getEmployeesSuccess = (response: any) => {

  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: response,
  };
};

export const getEmployeesFailure = (error: any) => {
  return {
    type: GET_EMPLOYEES_FAILURE,
    payload: error,
  };
};

export const registerAdmin = (params: any) => {
  return {
    type: REGISTER_ADMIN,
    payload: params,
  };
};

export const registerAdminSuccess = (response: any) => {
  return {
    type: REGISTER_ADMIN_SUCCESS,
    payload: response,
  };
};

export const registerAdminFailure = (error: any) => {
  return {
    type: REGISTER_ADMIN_FAILURE,
    payload: error,
  };
};

export const registerCompany = (params: any) => {

  return {
    type: REGISTER_COMPANY,
    payload: params,
  };
};

export const registerCompanySuccess = (response: any) => {
  return {
    type: REGISTER_COMPANY_SUCCESS,
    payload: response,
  };
};

export const registerCompanyFailure = (error: any) => {
  return {
    type: REGISTER_COMPANY_FAILURE,
    payload: error,
  };
};



