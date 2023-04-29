import { all, fork } from 'redux-saga/effects';

import AppSaga from '../App/Saga';
import AuthSaga from '../Auth/Saga';
import AdminSaga from '../Admin/Saga';
import CompanySaga from '../Company/Saga';
import UserCompanySaga from '../UserCompany/Saga';
import TaskSaga from '../Task/Saga';
import CommunicationSaga from '../Communication/Saga';
import TicketSaga from '../Ticket/Saga';


export default function* rootSaga() {
  yield all([fork(AppSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(AdminSaga)]);
  yield all([fork(CompanySaga)]);
  yield all([fork(UserCompanySaga)]);
  yield all([fork(TaskSaga)]);
  yield all([fork(CommunicationSaga)]);
  yield all([fork[TicketSaga]]);
}
