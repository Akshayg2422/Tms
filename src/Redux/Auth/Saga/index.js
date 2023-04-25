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

import {
  VALIDATE_REGISTER_USER,
  OTP_REGISTER,
  validateUserSuccess,
  validateUserFailure,
  validateRegisterUserSuccess,
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



    const response = yield call(validateUserBusinessApi, action.payload.params);
    if (response.success) {

      yield put(validateUserBusinessSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(validateUserBusinessFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(validateUserBusinessFailure(error));
    yield call(action.payload.onError(error));
  }
}


/**
 * 
 * @param {validate User} action 
 */

function* validateUserSaga(action) {
  try {

    const response = yield call(validateUserApi, action.payload);
    if (response.success) {

      yield put(validateUserSuccess({ ...response }));
    } else {

      yield put(validateUserFailure(response.error_message));
    }
  } catch (error) {

    yield put(validateUserFailure(error));
    yield call(action.payload.onError(error));

  }
}



/**
 * register admin
 */

function* registerAdminSaga(action) {
  try {

    const response = yield call(registerAdminApi, action.payload.params);
    if (response.success) {

      yield put(registerAdminSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(registerAdminFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(registerAdminFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * get user business places
 */

function* getUserBusinessPlacesSaga(action) {
  try {

    const response = yield call(getBusinessPlacesApi, action.payload.params);
    if (response.success) {
      yield put(getUserBusinessPlacesSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(getUserBusinessPlacesFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(getUserBusinessPlacesFailure(error));
    yield call(action.payload.onError(error));
  }
}


function* validateRegisterUserSaga(action) {
  try {

    const response = yield call(validateRegisterUserApi, action.payload.params);

    if (response.success) {

      yield put(validateRegisterUserSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(validateUserFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(validateUserFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* otpRegisterSaga(action) {
  try {

    const response = yield call(otpRegisterApi, action.payload.params);
    if (response.success) {

      yield put(otpRegisterSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(otpRegisterFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(otpRegisterFailure(error));
    yield call(action.payload.onError(error));
  }
}


/**
 * otp login
 * @param {*} action 
 */


function* otpLoginSaga(action) {
  try {

    const response = yield call(otpLoginApi, action.payload.params);
    if (response.success) {
      yield put(otpLoginSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(otpLoginFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(otpLoginFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* brandSectorsSaga(action) {
  try {

    const response = yield call(getBrandSectorsApi, action.payload);
    if (response.success) {
      yield put(brandSectorsSuccess({ ...response }));
    } else {
      yield put(brandSectorsFailure(response.error_message));
    }
  } catch (error) {
    yield put(brandSectorsFailure(error));
    yield call(action.payload.onError(error));
  }
}
function* businessPlaceDetailsSaga(action) {
  try {

    const response = yield call(
      getBusinessPlaceDetailsApi,
      action.payload.params,
    );
    if (response.success) {

      yield put(businessPlaceDetailsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(businessPlaceDetailsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(businessPlaceDetailsFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* registerCompanySaga(action) {
  try {

    const response = yield call(registerCompanyApi, action.payload.params);
    if (response.success) {

      yield put(registerCompanySuccess({ ...response }));
      yield call(action.payload.onSuccess(response));

    } else {

      yield put(registerCompanyFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(registerCompanyFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* sectorServiceTypesSaga(action) {
  try {

    const response = yield call(SectorServiceTypesApi, action.payload);
    if (response.success) {
      yield put(sectorServiceTypesSuccess({ ...response }));
    } else {
      yield put(sectorServiceTypesFailure(response.error_message));
    }
  } catch (error) {
    yield put(sectorServiceTypesFailure(error));
    yield call(action.payload.onError(error));
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
