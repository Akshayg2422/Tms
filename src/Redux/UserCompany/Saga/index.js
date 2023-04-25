import { takeLatest, put, call } from "redux-saga/effects";
import {
   
    fetchDesignationDataApi,
    getTicketTagApi,
    getBrandSectorsApi,
    addBrandSectorApi,
    addTicketTagApi,
    postAddDepartmentApi,
    postAddDesignationApi,
    fetchDepartmentDataApi,
    getTaskGroupApi,
    getAssociatedCompaniesApi,
    addTaskGroupApi,
    addEmployeeApi,
    updateEmployeeProfilePhotoApi,
    getEmployeesApi,
    registerAdminApi,
    registerCompanyApi,
  } from "@Services";
  import{
    
    ADD_DEPARTMENT,
    getAssociatedBranchSuccess,
    getAssociatedBranchFailure,
    GET_ASSOCIATED_BRANCH,
    showLoader,
    hideLoader,
    addDepartmentSuccess,
    addDepartmentFailure,
    ADD_BRAND_SECTOR,
    addBrandSectorSuccess,
    addBrandSectorFailure,
    ADD_DESIGNATION,
    addDesignationSuccess,
    addDesignationFailure,
    ADD_TICKET_TAG,
    addTicketTagSuccess,
    addTicketTagFailure,
    FETCH_DEPARTMENT,
    getDepartmentDataSuccess,
    getDepartmentDataFailure,
    GET_BRAND_SECTOR,
    getBrandSectorSuccess,
    getBrandSectorFailure,
    FETCH_DESIGNATION,
    getDesignationDataSuccess,
    getDesignationDataFailure,
    GET_TICKET_TAG,
    getTicketTagSuccess,
    getTicketTagFailure,
    GET_TASK_GROUP,
    getTaskGroupSuccess,
    getTaskGroupFailure,
    ADD_TASK_GROUP,
    addTaskGroupSuccess,
    addTaskGroupFailure,
    UPDATE_EMPLOYEE_PROFILE_PHOTO,
    addUpdateEmployeePhotoSuccess,
    addUpdateEmployeePhotoFailure,
    ADD_EMPLOYEE,
    addEmployeeSuccess,
    addEmployeeFailure,
    GET_EMPLOYEES,
    getEmployeesSuccess,
    getEmployeesFailure,
    registerCompanySuccess,
    registerCompanyFailure,
    registerAdminSuccess,
    registerAdminFailure,
    REGISTER_ADMIN,
    REGISTER_COMPANY,
  }from '@Redux'

    function* addDepartment(action) {
        try {
          yield put(showLoader());
      
          const response = yield call(postAddDepartmentApi, action.payload.params);
      
          if (response.success) {
            yield put(hideLoader());
            yield put(addDepartmentSuccess(response.details));
            yield call(action.payload.onSuccess(response));
          } else {
            yield put(hideLoader());
            yield put(addDepartmentFailure(response.error_message));
            yield call(action.payload.onError(response));
          }
        } catch (error) {
          yield put(hideLoader());
          yield put(addDepartmentFailure("Invalid Request"));
          yield call(action.payload.onError);
        }
      }

      function* addBrandSector(action) {
        try {
        //   yield put(showLoader());
      
          const response = yield call(addBrandSectorApi, action.payload.params);
      
          if (response.success) {
            // yield put(hideLoader());
            yield put(addBrandSectorSuccess(response.details));
            yield call(action.payload.onSuccess(response));
          } else {
            // yield put(hideLoader());
            yield put(addBrandSectorFailure(response.error_message));
            yield call(action.payload.onError(response));
          }
        } catch (error) {
        //   yield put(hideLoader());
          yield put(addBrandSectorFailure("Invalid Request"));
          yield call(action.payload.onError);
        }
      }

      /**
 * add Designation
 */

function* addDesignation(action) {
    try {
    //   yield put(showLoader());
  
      const response = yield call(postAddDesignationApi, action.payload.params);
  
      if (response.success) {
        // yield put(hideLoader());
        yield put(addDesignationSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(addDesignationFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(addDesignationFailure("Invalid Request"));
      yield call(action.payload.onError);
    }
  }

  /**
 * add ticket tag
 */
function* addTicketTag(action) {
    try {
    //   yield put(showLoader());
  
      const response = yield call(addTicketTagApi, action.payload.params);
  
      if (response.success) {
        // yield put(hideLoader());
        yield put(addTicketTagSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(addTicketTagFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(addTicketTagFailure("Invalid Request"));
      yield call(action.payload.onError);
    }
  }

  /**
 * get designation
 */

function* getDesignation(action) {
    try {
    //   yield put(showLoader());
      const response = yield call(fetchDesignationDataApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getDesignationDataSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getDesignationDataFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(getDesignationDataFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }
  /**get ticket tag */
function* getTicketTag(action) {

    try {
    //   yield put(showLoader());
      const response = yield call(getTicketTagApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getTicketTagSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getTicketTagFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
  
    //   yield put(hideLoader());
      yield put(getTicketTagFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }

  /**
 * get Departments
 */

function* getDepartmentsSaga(action) {
    try {
  
      yield put(showLoader());
  
      const response = yield call(fetchDepartmentDataApi, action.payload.params);
  
      if (response.success) {
  
        yield put(hideLoader());
        yield put(getDepartmentDataSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        yield put(hideLoader());
        yield put(getDepartmentDataFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
      yield put(hideLoader());
      yield put(getDepartmentDataFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }

  /**
 * get brand sector
 */

function* getBrandSector(action) {
    try {
  
    //   yield put(showLoader());
  
      const response = yield call(getBrandSectorsApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getBrandSectorSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getBrandSectorFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(getBrandSectorFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }
  function* getTaskGroupSaga(action) {
    try {
    //   yield put(showLoader());
      const response = yield call(getTaskGroupApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getTaskGroupSuccess(response));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getTaskGroupFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(getTaskGroupFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }
  
  function* addTaskGroupSaga(action) {
    try {
    //   yield put(showLoader());
      const response = yield call(addTaskGroupApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(addTaskGroupSuccess(response));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(addTaskGroupFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(addTaskGroupFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }
  function* getAssociatedCompaniesSaga(action) {
    try {
      yield put(showLoader());
      const response = yield call(
        getAssociatedCompaniesApi,
        action.payload.params
      );
  
      if (response.success) {
        yield put(hideLoader());
        yield put(getAssociatedBranchSuccess({ ...response }));
        yield call(action.payload.onSuccess(response));
      } else {
        yield put(hideLoader());
        yield put(getAssociatedBranchFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
      yield put(hideLoader());
      yield put(getAssociatedBranchFailure(error));
      yield call(action.payload.onError(error));
    }
  }

  function* addUpdateEmployeePhotoSaga(action) {
    try {
      yield put(showLoader());
      const response = yield call(updateEmployeeProfilePhotoApi, action.payload.params);
     
      if (response.success) {
        yield put(hideLoader());
        yield put(addUpdateEmployeePhotoSuccess(response));
        yield call(action.payload.onSuccess(response));
      } else {
        yield put(hideLoader());
        yield put(addUpdateEmployeePhotoFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
  
      yield put(hideLoader());
      yield put(addUpdateEmployeePhotoFailure(error));
      yield call(action.payload.onError(error));
  
    }
  }
  function* addEmployeeSaga(action) {
    try {
      yield put(showLoader());
      const response = yield call(addEmployeeApi, action.payload.params);
      if (response.success) {
        yield put(hideLoader());
        yield put(addEmployeeSuccess({ ...response }));
        yield call(action.payload.onSuccess(response));
      } else {
        yield put(hideLoader());
        yield put(addEmployeeFailure(response));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
      yield put(hideLoader());
      yield put(addEmployeeFailure(error));
      yield call(action.payload.onError(error));
    }
  }

  
function* getEmployeesSaga(action) {

  try {
    yield put(showLoader());
    const response = yield call(getEmployeesApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeesSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getEmployeesFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getEmployeesFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* registerCompanySaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(registerCompanyApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(registerCompanySuccess({ ...response }));
      yield call(action.payload.onSuccess(response));

    } else {
      yield put(hideLoader());
      yield put(registerCompanyFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(registerCompanyFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * register admin
 */

function* registerAdminSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(registerAdminApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(registerAdminSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(registerAdminFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(registerAdminFailure(error));
    yield call(action.payload.onError(error));
  }
}
  function* UserCompanySaga() {

    yield takeLatest(GET_EMPLOYEES, getEmployeesSaga);
    yield takeLatest(GET_TASK_GROUP, getTaskGroupSaga)
    yield takeLatest(ADD_TASK_GROUP, addTaskGroupSaga)
    yield takeLatest(ADD_BRAND_SECTOR, addBrandSector);
    yield takeLatest(ADD_TICKET_TAG, addTicketTag);
    yield takeLatest(GET_BRAND_SECTOR, getBrandSector);
    yield takeLatest(GET_TICKET_TAG, getTicketTag);
    yield takeLatest(ADD_DEPARTMENT, addDepartment);
    yield takeLatest(ADD_DESIGNATION, addDesignation);
    yield takeLatest(FETCH_DESIGNATION, getDesignation);
    yield takeLatest(FETCH_DEPARTMENT, getDepartmentsSaga);
    yield takeLatest(GET_ASSOCIATED_BRANCH, getAssociatedCompaniesSaga);
    yield takeLatest(ADD_EMPLOYEE, addEmployeeSaga);
    yield takeLatest(UPDATE_EMPLOYEE_PROFILE_PHOTO, addUpdateEmployeePhotoSaga);
    yield takeLatest(REGISTER_ADMIN, registerAdminSaga);
    yield takeLatest(REGISTER_COMPANY, registerCompanySaga);

  }

  export default UserCompanySaga;