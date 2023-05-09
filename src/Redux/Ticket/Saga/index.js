import { takeLatest, put, call } from 'redux-saga/effects';
import * as Action from '../Store'
import * as Services from '@Services'


function* raiseNewTicketSaga(action) {
  try {
    const response = yield call(Services.raiseNewTicketApi, action.payload.params);
    if (response.success) {
      yield put(Action.raiseNewTicketSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.raiseNewTicketFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.raiseNewTicketFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketsSaga(action) {
  console.log("saga--ddddddddddddddddddddddddd->",action)
  try {
    const response = yield call(Services.getTicketsApi, action.payload.params);
    console.log("response--->",response)
    if (response.success) {
      console.log('+++++++++',response)
      yield put(Action.getTicketsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getTicketsFailure({ ...response }));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getTicketsFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketEventsSaga(action) {

  try {
    const response = yield call(Services.getTicketEventsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getTicketsEventsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getTicketsEventsFailure({ ...response }));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getTicketsEventsFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* addTicketEventSaga(action) {
  try {
    const response = yield call(Services.addTicketEventApi, action.payload.params);
    if (response.success) {
      yield put(Action.addTicketEventSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addTicketEventFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.addTicketEventFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketTagsSaga(action) {
 
  try {
    const response = yield call(Services.getTicketTagsApi, action.payload.params);
    
    if (response.success) {
    
      yield put(Action.getTicketTagsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getTicketTagsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getTicketTagsFailure(error));
    yield call(action.payload.onError(error));

  }
}




function* getReferenceTicketsSaga(action) {
  try {
    const response = yield call(Services.getReferenceTicketsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getReferenceTicketsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getReferenceTicketsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getReferenceTicketsFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketUsersSaga(action) {
  try {

    const response = yield call(Services.getTicketUsersApi, action.payload.params);

    if (response.success) {

      yield put(Action.getTicketUsersSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.getTicketUsersFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.getTicketUsersFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}


/**
 * GET TASK EVENT HISTORY
 */

 function* getTicketEventHistorySaga(action) {
  try {
      const response = yield call(Services.getTicketEventHistoryApi, action.payload.params);
      if (response.success) {
          yield put(Action.getTicketEventHistorySuccess(response));
          yield call(action.payload.onSuccess(response));
      } else {
          yield put(Action.getTicketEventHistoryFailure(response.error_message));
          yield call(action.payload.onError(response));
      }
  } catch (error) {
      yield put(Action.getTicketEventHistoryFailure("Invalid Request"));
      yield call(action.payload.onError);
  }
}


function* getTicketDetailsSaga(action) {
  try {
      const response = yield call(Services.getTicketDetailsApi, action.payload.params);
      if (response.success) {
          yield put(Action.getTicketDetailsSuccess(response));
          yield call(action.payload.onSuccess(response));
      } else {
          yield put(Action.getTicketDetailsFailure(response.error_message));
          yield call(action.payload.onError(response));
      }
  } catch (error) {
      yield put(Action.getTicketDetailsFailure("Invalid Request"));
      yield call(action.payload.onError(error));
  }
}

/**
 * get Task Event Attachments
 */

 function* getTicketEventAttachmentsSaga(action) {
  try {
      const response = yield call(Services.getTicketEventsApi, action.payload.params);
      if (response.success) {
          yield put(Action.getTicketEventAttachmentsSuccess(response));
          yield call(action.payload.onSuccess(response));
      } else {
          yield put(Action.getTicketEventAttachmentsFailure(response.error_message));
          yield call(action.payload.onError(response));
      }
  } catch (error) {
      yield put(Action.getTicketEventAttachmentsFailure(error));
      yield call(action.payload.onError(error));
  }
}

function* TicketSaga() {
  yield takeLatest(Action.RAISE_NEW_TICKET, raiseNewTicketSaga);
  yield takeLatest(Action.GET_TICKETS, getTicketsSaga);
  yield takeLatest(Action.GET_TICKET_EVENTS, getTicketEventsSaga);
  yield takeLatest(Action.GET_TICKET_TAGS, getTicketTagsSaga);
  yield takeLatest(Action.ADD_TICKET_EVENT, addTicketEventSaga);
  yield takeLatest(Action.GET_REFERENCE_TICKETS, getReferenceTicketsSaga)
  yield takeLatest(Action.GET_TICKET_USERS, getTicketUsersSaga)
  yield takeLatest(Action.GET_TICKET_EVENT_HISTORY, getTicketEventHistorySaga)
  yield takeLatest(Action.GET_TICKET_DETAILS, getTicketDetailsSaga)
  yield takeLatest(Action.GET_TICKET_EVENT_ATTACHMENTS, getTicketEventAttachmentsSaga)
}

export default TicketSaga;