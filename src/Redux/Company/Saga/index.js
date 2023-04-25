import { takeLatest, put, call } from 'redux-saga/effects';
import {
  raiseNewTicketApi,
  getTicketsApi,
  getTicketEventsApi,
  addTicketEventApi,
  getTicketTagsApi,

  getReferenceTicketsApi,
  addBroadCastMessagesApi,
  getBroadCastMessagesApi,
  getTaskEventsApi,
  addTaskEventApi,

  getTaskGrouplApi
} from '@Services';
import {
  show,
  hide,
  RAISE_NEW_TICKET,
  GET_TICKETS,
  GET_TICKET_EVENTS,
  GET_TICKET_TAGS,
  ADD_TICKET_EVENT,
  ADD_BROADCAST_MESSAGES,
  GET_BROADCAST_MESSAGES,
  getTickets,
  getTicketsSuccess,
  getTicketsFailure,
  addTicketEventFailure,
  addTicketEvent,
  addTicketEventSuccess,
  getTicketTags,
  getTicketTagsFailure,
  raiseNewTicketSuccess,
  raiseNewTicketFailure,
  getTicketTagsSuccess,

  getTicketsEventsFailure,
  getTicketsEventsSuccess,

  GET_REFERENCE_TICKETS,
  getReferenceTicketsSuccess,
  getReferenceTicketsFailure,
  addBroadCastMessagesSuccess,
  addBroadCastMessagesFailure,
  getBroadCastMessagesSuccess,
  getBroadCastMessagesFailure,
  GET_TASK_EVENTS,
  getTaskEventsSuccess,
  getTaskEventsFailure,
  ADD_TASK_EVENT,
  addTaskEventSuccess,
  addTaskEventFailure,
  GET_TASK_GROUPL,
  getTaskGrouplSuccess,
  getTaskGrouplFailure,

} from '@Redux';

function* raiseNewTicketSaga(action) {
  try {

    const response = yield call(raiseNewTicketApi, action.payload.params);

    if (response.success) {
      yield put(raiseNewTicketSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(raiseNewTicketFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(raiseNewTicketFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketsSaga(action) {
  try {

    const response = yield call(getTicketsApi, action.payload.params);

    if (response.success) {

      yield put(getTicketsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(getTicketsFailure({ ...response }));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(getTicketsFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketEventsSaga(action) {
  try {
    // 
    const response = yield call(getTicketEventsApi, action.payload.params);
    if (response.success) {
      // 
      yield put(getTicketsEventsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      // 
      yield put(getTicketsEventsFailure({ ...response }));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(getTicketsEventsFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* addTicketEventSaga(action) {
  try {
    // 
    const response = yield call(addTicketEventApi, action.payload.params);
    if (response.success) {
      // 
      yield put(addTicketEventSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      // 
      yield put(addTicketEventFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(addTicketEventFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketTagsSaga(action) {
  try {

    const response = yield call(getTicketTagsApi, action.payload.params);
    if (response.success) {

      yield put(getTicketTagsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(getTicketTagsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(getTicketTagsFailure(error));
    yield call(action.payload.onError(error));

  }
}




function* getReferenceTicketsSaga(action) {
  try {

    const response = yield call(getReferenceTicketsApi, action.payload.params);
    if (response.success) {


      yield put(getReferenceTicketsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(getReferenceTicketsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(getReferenceTicketsFailure(error));
    yield call(action.payload.onError(error));
  }
}


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
    // 
    const response = yield call(getBroadCastMessagesApi, action.payload.params);
    if (response.success) {

      // 
      yield put(getBroadCastMessagesSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      // 
      yield put(getBroadCastMessagesFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    // 
    yield put(getBroadCastMessagesFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTaskEventsSaga(action) {

  try {

    const response = yield call(getTaskEventsApi, action.payload.params);

    if (response.success) {

      yield put(getTaskEventsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(getTaskEventsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {


    yield put(getTaskEventsFailure(error));
    yield call(action.payload.onError(error));

  }
}

function* addTaskEventSaga(action) {
  try {

    const response = yield call(addTaskEventApi, action.payload.params);

    if (response.success) {

      yield put(addTaskEventSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(addTaskEventFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {


    yield put(addTaskEventFailure(error));
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
  console.log("Watcher")
  yield takeLatest(RAISE_NEW_TICKET, raiseNewTicketSaga);
  yield takeLatest(GET_TICKETS, getTicketsSaga);
  yield takeLatest(GET_TICKET_EVENTS, getTicketEventsSaga);
  yield takeLatest(GET_TICKET_TAGS, getTicketTagsSaga);
  yield takeLatest(ADD_TICKET_EVENT, addTicketEventSaga);
  yield takeLatest(GET_REFERENCE_TICKETS, getReferenceTicketsSaga)
  yield takeLatest(ADD_BROADCAST_MESSAGES, addBroadCastMessagesSaga)
  yield takeLatest(GET_BROADCAST_MESSAGES, getBroadCastMessagesSaga)
  yield takeLatest(GET_TASK_EVENTS, getTaskEventsSaga)

}
export default CompanySaga;
