import { takeLatest, put, call } from 'redux-saga/effects';
import * as Api from '@Services'
import * as Actions from '../Store'


/**
 * get broadcast message
 */


// function* getBroadCastMessagesSaga(action) {

//     try {
//         const response = yield call(Api.getBroadCastMessagesApi, action.payload.params);
//         if (response.success) {
//             yield put(Actions.getBroadCastMessagesSuccess({ ...response }));
//             yield call(action.payload.onSuccess(response));
//         } else {
//             yield put(Actions.getBroadCastMessagesFailure(response));
//             yield call(action.payload.onError(response));
//         }
//     } catch (error) {
//         yield put(Actions.getBroadCastMessagesFailure(error));
//         yield call(action.payload.onError(error));
//     }
// }

function* CommunicationSaga() {
    // yield takeLatest(Actions.GET_BROADCAST_MESSAGES, getBroadCastMessagesSaga)
}

export default CommunicationSaga;
