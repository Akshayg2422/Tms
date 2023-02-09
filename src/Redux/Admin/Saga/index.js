import {takeLatest, put, call} from 'redux-saga/effects';
import {getAssociatedCompaniesApi, getDashboardApi,  postAddDepartmentApi,
  postAddDesignationApi,
  fetchDepartmentDataApi,
  fetchDesignationDataApi} from '@Services';
import {
  GET_ASSOCIATED_BRANCH,
  GET_DASHBOARD,
  showLoader,
  hideLoader,
  getAssociatedBranchSuccess,
  getAssociatedBranchFailure,
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

} from '@Redux';

function* getAssociatedCompaniesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      getAssociatedCompaniesApi,
      action.payload.params,
    );
    if (response.success) {
      yield put(hideLoader());
      yield put(getAssociatedBranchSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getAssociatedBranchFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

function* getDashboardSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getDashboardApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getDashboardSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getDashboardFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
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
  }
}


///watcher///

function* AdminSaga() {
  yield takeLatest(GET_ASSOCIATED_BRANCH, getAssociatedCompaniesSaga);
  yield takeLatest(GET_DASHBOARD, getDashboardSaga);
  yield takeLatest(ADD_DEPARTMENT, addDepartment);
  yield takeLatest(ADD_DESIGNATION, addDesignation);
  yield takeLatest(FETCH_DESIGNATION, getDesignation);
  yield takeLatest(FETCH_DEPARTMENT, getDepartments);
}

export default AdminSaga;
