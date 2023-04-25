import { takeLatest, put, call } from 'redux-saga/effects';
import * as Action from '../Store'
import * as Services from '@Services'
import { getTaskEvents } from '@Redux//Company';


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



function* TaskSaga() {
    yield takeLatest(Action.GET_TASK_GROUPS_L, getTaskGroupLSaga)
    yield takeLatest(Action.GET_TASKS, getTasksSaga)
    yield takeLatest(Action.ADD_TASK_EVENT, addTaskEventSaga)


}

export default TaskSaga;
