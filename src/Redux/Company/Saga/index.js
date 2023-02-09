import {takeLatest, put, call} from 'redux-saga/effects';
import {
  raiseNewTicketApi,
  getTicketsApi,
  getTicketEventsApi,
  addTicketEventApi,
  getTicketTagsApi,
  getEmployeeApi,
  addEmployeeApi

} from '@Services';
import {
  showLoader,
  hideLoader,
  RAISE_NEW_TICKET,
  GET_TICKETS,
  GET_TICKET_EVENTS,
  GET_TICKET_TAGS,
  ADD_TICKET_EVENT,
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
  GET_EMPLOYEE,
  getEmployeeSuccess,
  getEmployeeFailure,
  ADD_EMPLOYEE,
  addEmployeeSuccess,
  addEmployeeFailure
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
  }
}

function* getTicketsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTicketsApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getTicketsSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTicketsFailure({...response}));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

function* getTicketEventsSaga(action) {

  try {
    // yield put(showLoader());
    const response = yield call(getTicketEventsApi, action.payload.params);

    console.log(JSON.stringify());
    if (response.success) {
      // yield put(hideLoader());
      yield put(getTicketsEventsSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
      // yield put(hideLoader());
      yield put(getTicketsEventsFailure({...response}));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    // yield put(hideLoader());
  }
}

function* addTicketEventSaga(action) {
  try {
    // yield put(showLoader());
    const response = yield call(addTicketEventApi, action.payload.params);
    if (response.success) {
      // yield put(hideLoader());
      yield put(addTicketEventSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      // yield put(hideLoader());
      yield put(addTicketEventFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    // yield put(hideLoader());
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
  }
}


function* getEmployeeSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getEmployeeApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getEmployeeSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getEmployeeFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

function* addEmployeeSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(addEmployeeApi, action.payload.params);
    console.log('resAddEmployee--------------->',response)
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
  }
}

function* CompanySaga() {
  yield takeLatest(RAISE_NEW_TICKET, raiseNewTicketSaga);
  yield takeLatest(GET_TICKETS, getTicketsSaga);
  yield takeLatest(GET_TICKET_EVENTS, getTicketEventsSaga);
  yield takeLatest(GET_TICKET_TAGS, getTicketTagsSaga);
  yield takeLatest(ADD_TICKET_EVENT, addTicketEventSaga);
  yield takeLatest(GET_EMPLOYEE,getEmployeeSaga);
  yield takeLatest(ADD_EMPLOYEE,addEmployeeSaga);
}

export default CompanySaga;
