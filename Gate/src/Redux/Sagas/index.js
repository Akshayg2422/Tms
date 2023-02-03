import { all, fork } from 'redux-saga/effects';

import AppSaga from '../App/Saga';
import AuthSaga from '../Auth/Saga';
import CustomerSaga from '../Customer/Saga';



export default function* rootSaga() {
  yield all([fork(AppSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(CustomerSaga)]);

}
