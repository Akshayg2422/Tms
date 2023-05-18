import { takeLatest, put, call } from 'redux-saga/effects';
import {
  addBroadCastMessagesApi,
  getBroadCastMessagesApi,
  getEventsApi,
  addEventApi

} from '@Services';
import {
  ADD_BROADCAST_MESSAGES,
  GET_BROADCAST_MESSAGES,
  addBroadCastMessagesSuccess,
  addBroadCastMessagesFailure,
  getBroadCastMessagesSuccess,
  getBroadCastMessagesFailure,
  GET_EVENTS,
  getEventsSuccess,
  getEventsFailure,
  ADD_EVENT,
 addEventSuccess,
 addEventFailure

} from '@Redux';

// import * as Action from '../Store'
// import * as Services from '@Services'

function* addBroadCastMessagesSaga(action) {
  try {
    const response = yield call(addBroadCastMessagesApi, action.payload.params);
    if (response.success) {
      yield put(addBroadCastMessagesSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(addBroadCastMessagesFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(addBroadCastMessagesFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getBroadCastMessagesSaga(action) {

  try {
    const response = yield call(getBroadCastMessagesApi, action.payload.params);
    if (response.success) {
      yield put(getBroadCastMessagesSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(getBroadCastMessagesFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(getBroadCastMessagesFailure(error));
    yield call(action.payload.onError(error));
  }
}

// function* addUpdateEmployeePhotoSaga(action) {
//   try {
//     yield put(showLoader());
//     const response = yield call(updateEmployeeProfilePhotoApi, action.payload.params);

//     if (response.success) {
//       yield put(hideLoader());
//       yield put(addUpdateEmployeePhotoSuccess(response));
//       yield call(action.payload.onSuccess(response));
//     } else {
//       yield put(hideLoader());
//       yield put(addUpdateEmployeePhotoFailure(response.error_message));
//       yield call(action.payload.onError(response));
//     }
//   } catch (error) {

//     yield put(hideLoader());
//     yield put(addUpdateEmployeePhotoFailure(error));
//     yield call(action.payload.onError(error));

//   }
// }

function* CompanySaga() {
  yield takeLatest(ADD_BROADCAST_MESSAGES, addBroadCastMessagesSaga)
  yield takeLatest(GET_BROADCAST_MESSAGES, getBroadCastMessagesSaga)
  

}
export default CompanySaga;
