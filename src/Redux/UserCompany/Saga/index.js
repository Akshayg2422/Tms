import { takeLatest, put, call } from "redux-saga/effects";
import * as Api from '@Services'
import * as Action from '../Store'


function* addDepartment(action) {
  try {
    const response = yield call(Api.postAddDepartmentApi, action.payload.params);
    if (response.success) {
      yield put(Action.addDepartmentSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.addDepartmentFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addDepartmentFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* addBrandSector(action) {
  try {
    const response = yield call(Api.addBrandSectorApi, action.payload.params);

    if (response.success) {
      yield put(Action.addBrandSectorSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addBrandSectorFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addBrandSectorFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
* add Designation
*/

function* addDesignation(action) {
  try {
    const response = yield call(Api.postAddDesignationApi, action.payload.params);

    if (response.success) {
      yield put(Action.addDesignationSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addDesignationFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addDesignationFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
* add ticket tag
*/
function* addTicketTag(action) {
  try {


    const response = yield call(Api.addTicketTagApi, action.payload.params);
    if (response.success) {
      yield put(Action.addTicketTagSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.addTicketTagFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.addTicketTagFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
* get designation
*/

function* getDesignation(action) {
  try {

    const response = yield call(Api.fetchDesignationDataApi, action.payload.params);

    if (response.success) {
      yield put(Action.getDesignationDataSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getDesignationDataFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getDesignationDataFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
/**get ticket tag */
function* getTicketTag(action) {

  try {

    const response = yield call(Api.getTicketTagApi, action.payload.params);

    if (response.success) {
      yield put(Action.getTicketTagSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getTicketTagFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getTicketTagFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/**
* get Departments
*/

function* getDepartmentsSaga(action) {
  try {
    const response = yield call(Api.fetchDepartmentDataApi, action.payload.params);

    if (response.success) {
      yield put(Action.getDepartmentsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.getDepartmentsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.getDepartmentsFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/**
* get brand sector
*/

function* getBrandSector(action) {
  try {



    const response = yield call(Api.getBrandSectorsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getBrandSectorSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getBrandSectorFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getBrandSectorFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
function* getTaskGroupSaga(action) {
  try {

    const response = yield call(Api.getTaskGroupApi, action.payload.params);

    if (response.success) {
      yield put(Action.getTaskGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.getTaskGroupFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getTaskGroupFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* addTaskGroupSaga(action) {
  try {

    const response = yield call(Api.addTaskGroupApi, action.payload.params);

    if (response.success) {
      yield put(Action.addTaskGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addTaskGroupFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addTaskGroupFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
function* getAssociatedCompaniesSaga(action) {
  try {

    const response = yield call(
      Api.getAssociatedCompaniesApi,
      action.payload.params
    );

    if (response.success) {
      yield put(Action.getAssociatedBranchSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getAssociatedBranchFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getAssociatedBranchFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* addUpdateEmployeePhotoSaga(action) {
  try {

    const response = yield call(Api.updateEmployeeProfilePhotoApi, action.payload.params);
    if (response.success) {
      yield put(Action.addUpdateEmployeePhotoSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addUpdateEmployeePhotoFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {


    yield put(Action.addUpdateEmployeePhotoFailure(error));
    yield call(action.payload.onError(error));

  }
}
function* addEmployeeSaga(action) {

  console.log('addEmployeeSaga');
  try {
    const response = yield call(Api.addEmployeeApi, action.payload.params);
    console.log(response);
    if (response.success) {
      yield put(Action.addEmployeeSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addEmployeeFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.addEmployeeFailure(error));
    yield call(action.payload.onError(error));
  }
}


function* getEmployeesSaga(action) {

  try {
    const response = yield call(Api.getEmployeesApi, action.payload.params);
    if (response.success) {
      yield put(Action.getEmployeesSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getEmployeesFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getEmployeesFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* registerCompanySaga(action) {
  try {

    const response = yield call(Api.registerCompanyApi, action.payload.params);
    if (response.success) {
      yield put(Action.registerCompanySuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.registerCompanyFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.registerCompanyFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * register admin
 */

function* registerAdminSaga(action) {
  try {

    const response = yield call(Api.registerAdminApi, action.payload.params);
    if (response.success) {
      yield put(Action.registerAdminSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.registerAdminFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.registerAdminFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getAssociatedCompaniesLSaga(action) {
  try {

    const response = yield call(
      Api.getAssociatedCompaniesLApi,
      action.payload.params
    );
    if (response.success) {
      yield put(Action.getAssociatedCompaniesLSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getAssociatedCompaniesLFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getAssociatedCompaniesLFailure(error));
    yield call(action.payload.onError(error));
  }
}


/**
 * Dashboard Saga
 */

function* getDashboardSaga(action) {
  try {
    const response = yield call(Api.getDashboardApi, action.payload.params);
    console.log(JSON.stringify(response) + "===");
    if (response.success) {
      yield put(Action.getDashboardSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getDashboardFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getDashboardFailure(error));
    yield call(action.payload.onError(error));
  }
}


function* UserCompanySaga() {

  yield takeLatest(Action.GET_EMPLOYEES, getEmployeesSaga);
  yield takeLatest(Action.GET_TASK_GROUP, getTaskGroupSaga)
  yield takeLatest(Action.ADD_TASK_GROUP, addTaskGroupSaga)
  yield takeLatest(Action.ADD_BRAND_SECTOR, addBrandSector);
  yield takeLatest(Action.ADD_TICKET_TAG, addTicketTag);
  yield takeLatest(Action.GET_BRAND_SECTOR, getBrandSector);
  yield takeLatest(Action.GET_TICKET_TAG, getTicketTag);
  yield takeLatest(Action.ADD_DEPARTMENT, addDepartment);
  yield takeLatest(Action.ADD_DESIGNATION, addDesignation);
  yield takeLatest(Action.FETCH_DESIGNATION, getDesignation);
  yield takeLatest(Action.FETCH_DEPARTMENT, getDepartmentsSaga);
  yield takeLatest(Action.GET_ASSOCIATED_BRANCH, getAssociatedCompaniesSaga);
  yield takeLatest(Action.ADD_EMPLOYEE, addEmployeeSaga);
  yield takeLatest(Action.UPDATE_EMPLOYEE_PROFILE_PHOTO, addUpdateEmployeePhotoSaga);
  yield takeLatest(Action.REGISTER_ADMIN, registerAdminSaga);
  yield takeLatest(Action.REGISTER_COMPANY, registerCompanySaga);
  yield takeLatest(Action.GET_ASSOCIATED_COMPANIES_L, getAssociatedCompaniesLSaga);
  yield takeLatest(Action.GET_DASHBOARD, getDashboardSaga);
}

export default UserCompanySaga;