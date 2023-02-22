import { takeLatest, put, call } from 'redux-saga/effects';
import {
  raiseNewTicketApi,
  getTicketsApi,
  getTicketEventsApi,
  addTicketEventApi,
  getTicketTagsApi,
  getEmployeesApi,
  addEmployeeApi,
  getReferenceTicketsApi,
  addBroadCastMessagesApi,
 
} from '@Services';
import {
  showLoader,
  hideLoader,
  RAISE_NEW_TICKET,
  GET_TICKETS,
  GET_TICKET_EVENTS,
  GET_TICKET_TAGS,
  ADD_TICKET_EVENT,
  ADD_BROADCAST_MESSAGES,
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
  getTicketsEvents,
  getTicketsEventsFailure,
  getTicketsEventsSuccess,
  GET_EMPLOYEES,
  getEmployeesSuccess,
  getEmployeesFailure,
  ADD_EMPLOYEE,
  addEmployeeSuccess,
  addEmployeeFailure,
  GET_REFERENCE_TICKETS,
  getReferenceTicketsSuccess,
  getReferenceTicketsFailure,
  addBroadCastMessagesSuccess,
  addBroadCastMessagesFailure
} from '@Redux';

function* raiseNewTicketSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(raiseNewTicketApi, action.payload.params);
 
    if (response.success) {
      yield put(hideLoader());
      yield put(raiseNewTicketSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(raiseNewTicketFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(raiseNewTicketFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getTicketsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTicketsApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getTicketsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTicketsFailure({ ...response }));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getTicketsFailure( error ));
    yield call(action.payload.onError(error));
  }
}

function* getTicketEventsSaga(action) {
  try {
    // yield put(showLoader());
    const response = yield call(getTicketEventsApi, action.payload.params);
    if (response.success) {
      // yield put(hideLoader());
      yield put(getTicketsEventsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      // yield put(hideLoader());
      yield put(getTicketsEventsFailure({ ...response }));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
     yield put(hideLoader());
     yield put(getTicketsEventsFailure(error));
      yield call(action.payload.onError(error));
  }
}

function* addTicketEventSaga(action) {
  try {
    // yield put(showLoader());
    const response = yield call(addTicketEventApi, action.payload.params);
    // console.log(JSON.stringify(response) + 'lllllllllllllllll8888888888888');
    if (response.success) {
      // yield put(hideLoader());
      console.log(response,"response------------")
      yield put(addTicketEventSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      // yield put(hideLoader());
      yield put(addTicketEventFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
     yield put(hideLoader());
     yield put(addTicketEventFailure(error));
     yield call(action.payload.onError(error));
  }
}

function* getTicketTagsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTicketTagsApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getTicketTagsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTicketTagsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getTicketTagsFailure(error));
    yield call(action.payload.onError(error));

  }
}


function* getEmployeesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getEmployeesApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeesSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getEmployeesFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getEmployeesFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* addEmployeeSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(addEmployeeApi, action.payload.params);   
    if (response.success) {
      yield put(hideLoader());
      yield put(addEmployeeSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addEmployeeFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addEmployeeFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getReferenceTicketsSaga(action) {
  console.log('actionactionaction',action);
  try {
    yield put(showLoader());
    const response = yield call(getReferenceTicketsApi, action.payload.params);
    console.log('getReferenceTicketsSagagetReferenceTicketsSagagetReferenceTicketsSaga',(JSON.stringify(response)))
    if (response.success) {
      console.log('res-----------------11');
      yield put(hideLoader());
      yield put(getReferenceTicketsSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
      console.log('res---------------------2222222');
      yield put(hideLoader());
      yield put(getReferenceTicketsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getReferenceTicketsFailure(error));
    yield call(action.payload.onError(error));
  }
}
function* addBroadCastMessagesSaga(action) {
  // console.log('actionactionaction',action);
  try {
    yield put(showLoader());
    const response = yield call(addBroadCastMessagesApi, action.payload.params);
    // console.log('getReferenceTicketsSagagetReferenceTicketsSagagetReferenceTicketsSaga',(JSON.stringify(response)))
    if (response.success) {
     
      yield put(hideLoader());
      yield put(  addBroadCastMessagesSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
    
      yield put(hideLoader());
      yield put( addBroadCastMessagesFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put( addBroadCastMessagesFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* CompanySaga() {
  yield takeLatest(RAISE_NEW_TICKET, raiseNewTicketSaga);
  yield takeLatest(GET_TICKETS, getTicketsSaga);
  yield takeLatest(GET_TICKET_EVENTS, getTicketEventsSaga);
  yield takeLatest(GET_TICKET_TAGS, getTicketTagsSaga);
  yield takeLatest(ADD_TICKET_EVENT, addTicketEventSaga);
  yield takeLatest(GET_EMPLOYEES,getEmployeesSaga);
  yield takeLatest(ADD_EMPLOYEE,addEmployeeSaga);
  yield takeLatest(GET_REFERENCE_TICKETS,getReferenceTicketsSaga)
  yield takeLatest(ADD_BROADCAST_MESSAGES, addBroadCastMessagesSaga)
}

export default CompanySaga;
