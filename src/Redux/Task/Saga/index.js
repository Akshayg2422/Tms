import { takeLatest, put, call } from 'redux-saga/effects';
import * as Action from '../Store'
import * as Services from '@Services'


// getTaskGroupL

function* getTaskGroupLSaga(action) {
    try {
        const response = yield call(Services.getTaskGroupLApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTaskGroupsLSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskGroupLFailure(response));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTaskGroupLFailure(error));
        yield call(action.payload.onError(error));
    }
}

function* getTasksSaga(action) {
    try {
        const response = yield call(Services.getTaskApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTasksFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}

/**
 * Add Task Event
 * @param {*} action 
 */

function* addTaskEventSaga(action) {
    try {
        const response = yield call(Services.addTaskEventApi, action.payload.params);

        if (response.success) {
            yield put(Action.addTaskEventSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {

            yield put(Action.addTaskEventFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {

        yield put(Action.addTaskEventFailure(error));
        yield call(action.payload.onError(error));

    }
}


/**
 * GET TASK EVENT HISTORY
 */

function* getTaskEventHistorySaga(action) {
    try {
        const response = yield call(Services.getTaskEventHistoryApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTaskEventHistorySuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskEventHistoryFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTaskEventHistoryFailure("Invalid Request"));
        yield call(action.payload.onError);
    }
}


/**
 * Get Sub Tasks
 * @param {} action 
 */

function* getSubTasksSaga(action) {

    console.log(JSON.stringify(action.payload.params) + "====response");
    try {
        const response = yield call(Services.getSubTaskApi, action.payload.params);
        console.log(JSON.stringify(response));
        if (response.success) {
            yield put(Action.getSubTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getSubTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getSubTasksFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


/**
 *  get Task Events
 */

function* getTaskEventsSaga(action) {
    try {
        const response = yield call(Services.getTaskEventsApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTaskEventsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskEventsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTaskEventsFailure(error));
        yield call(action.payload.onError(error));
    }
}



/**
 * get Reference task
 * @param {*} action 
 */
function* getReferenceTasksSaga(action) {
    try {
        const response = yield call(Services.getReferenceTasksApi, action.payload.params);

        if (response.success) {
            yield put(Action.getReferenceTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getReferenceTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getReferenceTasksFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


/**
 * get Task User
 */

function* getTaskUsersSaga(action) {
    try {
        const response = yield call(Services.getTaskUsersApi, action.payload.params);
        if (response.success) {

            yield put(Action.getTaskUsersSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskUsersFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {

        yield put(Action.getTaskUsersFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


function* TaskSaga() {
    yield takeLatest(Action.GET_TASK_GROUPS_L, getTaskGroupLSaga)
    yield takeLatest(Action.GET_TASKS, getTasksSaga)
    yield takeLatest(Action.ADD_TASK_EVENT, addTaskEventSaga)
    yield takeLatest(Action.GET_TASK_EVENT_HISTORY, getTaskEventHistorySaga)
    yield takeLatest(Action.GET_SUB_TASKS, getSubTasksSaga)
    yield takeLatest(Action.GET_TASK_EVENTS, getTaskEventsSaga)
    yield takeLatest(Action.GET_REFERENCE_TASKS, getReferenceTasksSaga);
    yield takeLatest(Action.GET_TASK_USERS, getTaskUsersSaga);
}

export default TaskSaga;