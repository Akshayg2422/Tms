import { takeLatest, put, call } from "redux-saga/effects";
import {
 
  getDashboardApi,
 
  getAssociatedCompanieslApi,

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
  GET_TASKS,
  getTasksSuccess,
  getTasksFailure,
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

/**get reference tasks */
function* getReferenceTasksSaga(action) {

  try {
    yield put(showLoader());
    const response = yield call(getReferenceTasksApi, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(getReferenceTasksSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getReferenceTasksFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(hideLoader());
    yield put(getReferenceTasksFailure("Invalid Request"));
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
    yield call(action.payload.onError(error));
  }
}

/* ADD TASK */

function* getAddTaskSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(addTaskApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addTaskSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addTaskFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addTaskFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/*GET SUB TASK*/

function* getSubTasksSaga(action) {

  try {
    yield put(showLoader());
    const response = yield call(getSubTaskApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getSubTasksSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getSubTasksFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getSubTasksFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* getTaskUsersSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTaskUsersApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getTaskUsersSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTaskUsersFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getTaskUsersFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* getTicketUsersSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTicketUsersApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getTicketUsersSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTicketUsersFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getTicketUsersFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}




function* getTaskSubGroupSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTaskSubGroupApi, action.payload.params);

    if (response.success) {

      yield put(hideLoader());
      yield put(getTaskSubGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTaskSubGroupFailure(response.error_message));
    }
  }
    catch 
    (error) {
    yield put(hideLoader());
    yield put(getTaskSubGroupFailure("Invalid Request"));
    yield call(action.payload.onError(error));
    }
  }
  
/**
 * GET TASK HISTORY
 */

function* getTaskHistorySaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(getTaskHistoryApi, action.payload.params);
  
    if (response.success) {
      yield put(hideLoader());
      yield put(getTaskHistorySuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTaskHistoryFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(getTaskHistoryFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

///watcher///

function* AdminSaga() {

  yield takeLatest(GET_ASSOCIATED_COMPANY_BRANCH, getAssociatedCompanieslSaga);
  yield takeLatest(GET_DASHBOARD, getDashboardSaga);

  yield takeLatest(GET_TASKS, getTasksSaga)
  yield takeLatest(ADD_TASK, getAddTaskSaga);
  yield takeLatest(GET_SUB_TASKS, getSubTasksSaga);

  yield takeLatest(GET_REFERENCE_TASKS, getReferenceTasksSaga);
  yield takeLatest(GET_TASK_USERS, getTaskUsersSaga)
  yield takeLatest(GET_TICKET_USERS, getTicketUsersSaga)

  yield takeLatest(GET_TASK_SUB_GROUP, getTaskSubGroupSaga)
  yield takeLatest(GET_TASK_HISTORY, getTaskHistorySaga)

}

export default AdminSaga;
