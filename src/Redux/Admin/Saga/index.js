import { takeLatest, put, call } from "redux-saga/effects";
import {
  getAssociatedCompaniesApi,
  getDashboardApi,
  postAddDepartmentApi,
  postAddDesignationApi,
  fetchDepartmentDataApi,
  getAssociatedCompanieslApi,
  fetchDesignationDataApi,
  getTaskApi,
  getAddTaskApi,
} from "@Services";
import {
  GET_ASSOCIATED_BRANCH,
  GET_ASSOCIATED_COMPANY_BRANCH,
  GET_DASHBOARD,
  showLoader,
  hideLoader,
  getAssociatedBranchSuccess,
  getAssociatedBranchFailure,
  getAssociatedCompanyBranchSuccess,
  getAssociatedCompanyBranchFailure,
  getDashboardSuccess,
  getDashboardFailure,
  ADD_DEPARTMENT,
  addDepartmentSuccess,
  addDepartmentFailure,
  ADD_DESIGNATION,
  addDesignationSuccess,
  addDesignationFailure,
  FETCH_DEPARTMENT,
  getDepartmentDataSuccess,
  getDepartmentDataFailure,
  FETCH_DESIGNATION,
  getDesignationDataSuccess,
  getDesignationDataFailure,
  GET_TASKS,
  getTasksSuccess,
  getTasksFailure,
  getAddTaskSuccess,
  getAddTaskFailure,
  ADD_TASK,
} from "@Redux";

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

//
function* getAssociatedCompanieslSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      getAssociatedCompanieslApi,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getAssociatedCompanyBranchSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getAssociatedCompanyBranchFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAssociatedCompanyBranchFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getDashboardSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getDashboardApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getDashboardSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getDashboardFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDashboardFailure(error));
    yield call(action.payload.onError(error));
  }
}
/**
 * add Department
 */

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

/**
 * add Designation
 */

function* addDesignation(action) {
  try {
    yield put(showLoader());

    const response = yield call(postAddDesignationApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addDesignationSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addDesignationFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addDesignationFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}
/**
 * get designation
 */

function* getDesignation(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchDesignationDataApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getDesignationDataSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getDesignationDataFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDesignationDataFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/**
 * get Departments
 */

function* getDepartments(action) {
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
 * get Tasks
 */

 function* getTasksSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTaskApi, action.payload.params);
console.log("-------->",response)
    if (response.success) {
      yield put(hideLoader());
      yield put(getTasksSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTasksFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getTasksFailure("Invalid Request"));
    yield put(getAddTaskFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/* ADD TASK */

function* getAddTaskSaga(action) {
  console.log('1111111111111111111111111111');
  try {
    yield put(showLoader());
    const response = yield call(getAddTaskApi, action.payload.params);
console.log('2222222222222222',response);
    if (response.success) {
      yield put(hideLoader());
      yield put(getAddTaskSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getAddTaskFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAddTaskFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

///watcher///

function* AdminSaga() {
  yield takeLatest(GET_ASSOCIATED_BRANCH, getAssociatedCompaniesSaga);
  yield takeLatest(GET_ASSOCIATED_COMPANY_BRANCH, getAssociatedCompanieslSaga);
  yield takeLatest(GET_DASHBOARD, getDashboardSaga);
  yield takeLatest(ADD_DEPARTMENT, addDepartment);
  yield takeLatest(ADD_DESIGNATION, addDesignation);
  yield takeLatest(FETCH_DESIGNATION, getDesignation);
  yield takeLatest(FETCH_DEPARTMENT, getDepartments);
  yield takeLatest(GET_TASKS,getTasksSaga)
  yield takeLatest(ADD_TASK, getAddTaskSaga);
}

export default AdminSaga;
