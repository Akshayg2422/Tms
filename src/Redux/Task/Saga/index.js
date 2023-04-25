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


function* TaskSaga() {
    yield takeLatest(Action.GET_TASK_GROUPS_L, getTaskGroupLSaga)
}

export default TaskSaga;
