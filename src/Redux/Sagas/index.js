import { all, fork } from 'redux-saga/effects';

import AppSaga from '../App/Saga';
import AuthSaga from '../Auth/Saga';
import AdminSaga from '../Admin/Saga';
import CompanySaga from '../Company/Saga';
import TaskSaga from '../Task/Saga';





export default function* rootSaga() {
  yield all([fork(AppSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(AdminSaga)]);
  yield all([fork(CompanySaga)]);
  yield all([fork(TaskSaga)]);
}
