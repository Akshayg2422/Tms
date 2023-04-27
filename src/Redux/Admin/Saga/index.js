import { takeLatest, put, call } from "redux-saga/effects";
import {
  getDashboardApi,
  getAssociatedCompaniesLApi,
  getTaskApi,
  addTaskApi,
  getSubTaskApi,
  getReferenceTasksApi,
  getTaskUsersApi,
  getTicketUsersApi,


  getTaskSubGroupApi,
  getTaskHistoryApi

} from "@Services";
import {


  GET_ASSOCIATED_COMPANY_BRANCH,
  GET_DASHBOARD,

  showLoader,
  hideLoader,
  getAssociatedCompanyBranchSuccess,
  getAssociatedCompanyBranchFailure,
  getDashboardSuccess,
  getDashboardFailure,
  GET_TASK_SUB_GROUP,
  getTaskSubGroupSuccess,
  getTaskSubGroupFailure,
  ADD_TASK,
  addTaskSuccess,
  addTaskFailure,
  GET_SUB_TASKS,
  getSubTasksSuccess,
  getSubTasksFailure,
  GET_TASK_USERS,
  getTaskUsersSuccess,
  getTaskUsersFailure,
  GET_REFERENCE_TASKS,
  getReferenceTasksSuccess,
  getReferenceTasksFailure,
  GET_TICKET_USERS,
  getTicketUsersSuccess,
  getTicketUsersFailure,
  GET_TASK_HISTORY,
  getTaskHistorySuccess,
  getTaskHistoryFailure

} from "@Redux";


//
function* getAssociatedCompanieslSaga(action) {
  try {

    const response = yield call(
      getAssociatedCompaniesLApi,
      action.payload.params
    );

    if (response.success) {

      yield put(getAssociatedCompanyBranchSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(getAssociatedCompanyBranchFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(getAssociatedCompanyBranchFailure(error));
    yield call(action.payload.onError(error));
  }
}







/* ADD TASK */

function* getAddTaskSaga(action) {
  try {

    const response = yield call(addTaskApi, action.payload.params);

    if (response.success) {

      yield put(addTaskSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(addTaskFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(addTaskFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}



function* getTaskUsersSaga(action) {
  try {

    const response = yield call(getTaskUsersApi, action.payload.params);
    if (response.success) {

      yield put(getTaskUsersSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(getTaskUsersFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(getTaskUsersFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* getTicketUsersSaga(action) {
  try {

    const response = yield call(getTicketUsersApi, action.payload.params);

    if (response.success) {

      yield put(getTicketUsersSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(getTicketUsersFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(getTicketUsersFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}




function* getTaskSubGroupSaga(action) {
  try {

    const response = yield call(getTaskSubGroupApi, action.payload.params);

    if (response.success) {


      yield put(getTaskSubGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(getTaskSubGroupFailure(response.error_message));
    }
  }
  catch
  (error) {

    yield put(getTaskSubGroupFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}


///watcher///

function* AdminSaga() {

  yield takeLatest(GET_ASSOCIATED_COMPANY_BRANCH, getAssociatedCompanieslSaga);
  yield takeLatest(ADD_TASK, getAddTaskSaga);
  yield takeLatest(GET_TASK_USERS, getTaskUsersSaga)
  yield takeLatest(GET_TICKET_USERS, getTicketUsersSaga)

  yield takeLatest(GET_TASK_SUB_GROUP, getTaskSubGroupSaga)

}

export default AdminSaga;
