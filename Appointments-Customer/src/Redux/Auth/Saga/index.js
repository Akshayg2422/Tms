import { takeLatest, put, call } from 'redux-saga/effects';
import {
  validateUserApi,
  otpRegisterApi,
  otpLoginApi,
  submitRegistrationOtpApi,
  resendRegistrationOtpApi,
  validateRegisterUserApi,
} from '@Services';
import { ERRORS } from '@Utils';
import {
  VALIDATE_USER,
  validateUserSuccess,
  validateUserFailure,
  hideLoader,
  showLoader,
  OTP_REGISTER,
  otpRegisterSuccess,
  otpRegisterFailure,
  OTP_LOGIN,
  otpLoginSuccess,
  otpLoginFailure,
  SUBMIT_REGISTRATION_OTP,
  submitRegistrationOtpSuccess,
  submitRegistrationOtpFailure,
  RESEND_REGISTRATION_OTP,
  resendRegistrationOtpSuccess,
  resendRegistrationOtpFailure,
  VALIDATE_REGISTER_USER,
  validateRegisterUserSuccess,
  validateRegisterUserFailure,
} from '@Redux';

function* validateUserSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(validateUserApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(validateUserSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(validateUserFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(validateUserFailure(ERRORS.INVALID_REQUEST));
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
    yield put(otpRegisterFailure(ERRORS.INVALID_REQUEST));
  }
}

function* submitRegistrationOtpSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(submitRegistrationOtpApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(submitRegistrationOtpSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(submitRegistrationOtpFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(submitRegistrationOtpFailure(ERRORS.INVALID_REQUEST));
  }
}

function* resendRegistrationOtpSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(resendRegistrationOtpApi, action.payload.params);
    console.log('response', response);
    if (response.success) {
      yield put(hideLoader());
      yield put(resendRegistrationOtpSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(resendRegistrationOtpFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(resendRegistrationOtpFailure(ERRORS.INVALID_REQUEST));
  }
}

function* otpLoginSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(otpLoginApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(otpLoginSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(otpLoginFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(otpLoginFailure(ERRORS.INVALID_REQUEST));
  }
}

function* validateRegisterUserSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(validateRegisterUserApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(validateRegisterUserSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(validateRegisterUserFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(validateRegisterUserFailure(ERRORS.INVALID_REQUEST));
  }
}

function* AuthSaga() {
  yield takeLatest(VALIDATE_USER, validateUserSaga);
  yield takeLatest(SUBMIT_REGISTRATION_OTP, submitRegistrationOtpSaga);
  yield takeLatest(RESEND_REGISTRATION_OTP, resendRegistrationOtpSaga);
  yield takeLatest(OTP_REGISTER, otpRegisterSaga);
  yield takeLatest(OTP_LOGIN, otpLoginSaga);
  yield takeLatest(VALIDATE_REGISTER_USER, validateRegisterUserSaga);
}

export default AuthSaga;
