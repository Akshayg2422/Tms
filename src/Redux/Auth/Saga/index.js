import { takeLatest, put, call } from 'redux-saga/effects';
import {
  validateUserApi,
  validateRegisterUserApi,
  otpRegisterApi,
  getBusinessPlacesApi,
  validateUserBusinessApi,
  getBrandSectorsApi,
  getBusinessPlaceDetailsApi,
  registerCompanyApi,
  SectorServiceTypesApi,
  registerAdminApi,
  otpLoginApi

} from '@Services';

import { ERRORS } from '@Utils';
import {
  VALIDATE_REGISTER_USER,
  OTP_REGISTER,
  validateUserSuccess,
  validateUserFailure,
  hideLoader,
  showLoader,
  validateRegisterUserSuccess,
  validateRegisterUserFailure,
  otpRegisterSuccess,
  otpRegisterFailure,
  getUserBusinessPlacesSuccess,
  getUserBusinessPlacesFailure,
  validateUserBusinessSuccess,
  validateUserBusinessFailure,
  brandSectorsSuccess,
  brandSectorsFailure,
  businessPlaceDetailsSuccess,
  businessPlaceDetailsFailure,
  registerCompanySuccess,
  registerCompanyFailure,
  sectorServiceTypesSuccess,
  sectorServiceTypesFailure,
  registerAdminSuccess,
  registerAdminFailure,
  VALIDATE_USER,
  VALIDATE_USER_BUSINESS,
  GET_USER_BUSINESS_PLACES,
  BRAND_SECTOR,
  BUSINESS_PLACES_DETAILS,
  REGISTER_COMPANY,
  SECTOR_SERVICE_TYPES,
  REGISTER_ADMIN,
  otpLoginFailure,
  otpLoginSuccess,
  OTP_LOGIN
} from '@Redux';


function* validateUserBusinessSaga(action) {
  try {

    yield put(showLoader());

    const response = yield call(validateUserBusinessApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(validateUserBusinessSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(validateUserBusinessFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}


/**
 * 
 * @param {validate User} action 
 */

function* validateUserSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(validateUserApi, action.payload);
    if (response.success) {
      yield put(hideLoader());
      yield put(validateUserSuccess({ ...response }));
    } else {
      yield put(hideLoader());
      yield put(validateUserFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}



/**
 * register admin
 */

function* registerAdminSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(registerAdminApi, action.payload.params);
    console.log('resttttttttt-----------', response);
    if (response.success) {
      yield put(hideLoader());
      yield put(registerAdminSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(registerAdminFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

/**
 * get user business places
 */

function* getUserBusinessPlacesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getBusinessPlacesApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getUserBusinessPlacesSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getUserBusinessPlacesFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}


function* validateRegisterUserSaga(action) {
  console.log(JSON.stringify(action));
  try {
    yield put(showLoader());
    const response = yield call(validateRegisterUserApi, action.payload.params);
    console.log(JSON.stringify(response));

    if (response.success) {
      yield put(hideLoader());
      yield put(validateRegisterUserSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(validateUserFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

function* otpRegisterSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(otpRegisterApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(otpRegisterSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(otpRegisterFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}


/**
 * otp login
 * @param {*} action 
 */


function* otpLoginSaga(action) {
  console.log(JSON.stringify(action.payload));
  try {
    yield put(showLoader());
    const response = yield call(otpLoginApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(otpLoginSuccess({...response}));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(otpLoginFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

function* brandSectorsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getBrandSectorsApi, action.payload);
    if (response.success) {
      yield put(hideLoader());
      yield put(brandSectorsSuccess({ ...response }));
    } else {
      yield put(hideLoader());
      yield put(brandSectorsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}
function* businessPlaceDetailsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      getBusinessPlaceDetailsApi,
      action.payload.params,
    );
    if (response.success) {
      yield put(hideLoader());
      yield put(businessPlaceDetailsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(businessPlaceDetailsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

function* registerCompanySaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(registerCompanyApi, action.payload.params);
    console.log(JSON.stringify(response)+"=============================");
    if (response.success) {
      yield put(hideLoader());
      yield put(registerCompanySuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
 
    } else {
      yield put(hideLoader());
      yield put(registerCompanyFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

function* sectorServiceTypesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(SectorServiceTypesApi, action.payload);
    if (response.success) {
      yield put(hideLoader());
      yield put(sectorServiceTypesSuccess({ ...response }));
    } else {
      yield put(hideLoader());
      yield put(sectorServiceTypesFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}



///watcher///

function* AuthSaga() {
  yield takeLatest(VALIDATE_USER, validateUserSaga);
  yield takeLatest(VALIDATE_REGISTER_USER, validateRegisterUserSaga);
  yield takeLatest(OTP_REGISTER, otpRegisterSaga);
  yield takeLatest(OTP_LOGIN, otpLoginSaga);
  yield takeLatest(VALIDATE_USER_BUSINESS, validateUserBusinessSaga);
  yield takeLatest(GET_USER_BUSINESS_PLACES, getUserBusinessPlacesSaga);
  yield takeLatest(BRAND_SECTOR, brandSectorsSaga);
  yield takeLatest(BUSINESS_PLACES_DETAILS, businessPlaceDetailsSaga);
  yield takeLatest(REGISTER_COMPANY, registerCompanySaga);
  yield takeLatest(SECTOR_SERVICE_TYPES, sectorServiceTypesSaga);
  yield takeLatest(REGISTER_ADMIN, registerAdminSaga);
}

export default AuthSaga;
