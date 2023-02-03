import {takeLatest, put, call} from 'redux-saga/effects';
import {GET_STORE_DETAILS , showLoader, hideLoader, getStoreDetailsSuccess, getStoreDetailsFailure} from '@Redux'
import {getStoreDetailsApi} from '@Services'


function* getStoreDetailsSaga(action) {

    console.log(JSON.stringify(action.payload.params)+"======saga");

    try {

        yield put(showLoader());
    
        const response = yield call(getStoreDetailsApi, action.payload.params);
        // console.log(JSON.stringify(response)+"+++++++");

        

        if (response.success) {
          yield put(hideLoader());
          yield put(getStoreDetailsSuccess({ ...response }));
        //   yield call(action.payload.onSuccess(response));
        } else {
          yield put(hideLoader());
          yield put(getStoreDetailsFailure({...response}));
        //   yield call(action.payload.onError(response));
        }
      } catch (error) {
        yield put(hideLoader());
      }

  }

function* CustomerSaga() {
    yield takeLatest(GET_STORE_DETAILS, getStoreDetailsSaga);
}

export default CustomerSaga;
