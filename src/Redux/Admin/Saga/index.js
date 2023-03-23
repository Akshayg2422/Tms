import { takeLatest, put, call } from "redux-saga/effects";
import {
  getAssociatedCompaniesApi,
  getDashboardApi,
  postAddDepartmentApi,
  postAddDesignationApi,
  fetchDepartmentDataApi,
  getAssociatedCompanieslApi,
  fetchDesignationDataApi,
  getTicketTagApi,
  getBrandSectorsApi,
  addBrandSectorApi,
  addTicketTagApi,
  getTaskApi,
  getAddTaskApi,
} from "@Services";
import {
  GET_ASSOCIATED_BRANCH,
  GET_ASSOCIATED_COMPANY_BRANCH,
  GET_DASHBOARD,
  showLoader,
  hideLoader,
  getAssociatedBranchSuccess,
  getAssociatedBranchFailure,
  getAssociatedCompanyBranchSuccess,
  getAssociatedCompanyBranchFailure,
  getDashboardSuccess,
  getDashboardFailure,
  ADD_DEPARTMENT,
  addDepartmentSuccess,
  addDepartmentFailure,
  ADD_BRAND_SECTOR,
  addBrandSectorSuccess,
  addBrandSectorFailure,
  ADD_DESIGNATION,
  addDesignationSuccess,
  addDesignationFailure,
  ADD_TICKET_TAG,
  addTicketTagSuccess,
  addTicketTagFailure,
  FETCH_DEPARTMENT,
  getDepartmentDataSuccess,
  getDepartmentDataFailure,
  GET_BRAND_SECTOR,
  getBrandSectorSuccess,
  getBrandSectorFailure,
  FETCH_DESIGNATION,
  getDesignationDataSuccess,
  getDesignationDataFailure,
  GET_TICKET_TAG,
  getTicketTagSuccess,
  getTicketTagFailure,
  GET_TASKS,
  getTasksSuccess,
  getTasksFailure,
  getAddTaskSuccess,
  getAddTaskFailure,
  ADD_TASK,
  getTicketTags,
} from "@Redux";

function* getAssociatedCompaniesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      getAssociatedCompaniesApi,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getAssociatedBranchSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getAssociatedBranchFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAssociatedBranchFailure(error));
    yield call(action.payload.onError(error));
  }
}

//
function* getAssociatedCompanieslSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      getAssociatedCompanieslApi,
      action.payload.params
    );

    if (response.success) {
      yield put(hideLoader());
      yield put(getAssociatedCompanyBranchSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getAssociatedCompanyBranchFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAssociatedCompanyBranchFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getDashboardSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getDashboardApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getDashboardSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getDashboardFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDashboardFailure(error));
    yield call(action.payload.onError(error));
  }
}
/**
 * add Department
 */

function* addDepartment(action) {
  try {
    yield put(showLoader());

    const response = yield call(postAddDepartmentApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addDepartmentSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addDepartmentFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addDepartmentFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}
/**add brand sector */
function* addBrandSector(action) {
  try {
    yield put(showLoader());

    const response = yield call(addBrandSectorApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addBrandSectorSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addBrandSectorFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addBrandSectorFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
 * add Designation
 */

function* addDesignation(action) {
  try {
    yield put(showLoader());

    const response = yield call(postAddDesignationApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addDesignationSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addDesignationFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addDesignationFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}
/**
 * add ticket tag
 */
function* addTicketTag(action) {
  try {
    yield put(showLoader());

    const response = yield call(addTicketTagApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(addTicketTagSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(addTicketTagFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(addTicketTagFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}
/**
 * get designation
 */

function* getDesignation(action) {
  try {
    yield put(showLoader());
    const response = yield call(fetchDesignationDataApi, action.payload.params);

    if (response.success) {
      yield put(hideLoader());
      yield put(getDesignationDataSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getDesignationDataFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDesignationDataFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
/**get ticket tag */
function* getTicketTag(action) {

  try {
    yield put(showLoader());
    const response = yield call(getTicketTagApi, action.payload.params);

    if (response.success) {
      
      yield put(hideLoader());
      yield put(getTicketTagSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTicketTagFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
   
    yield put(hideLoader());
    yield put(getTicketTagFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/**
 * get Departments
 */

function* getDepartments(action) {
  try {

    yield put(showLoader());

    const response = yield call(fetchDepartmentDataApi, action.payload.params);

    if (response.success) {
    
      yield put(hideLoader());
      yield put(getDepartmentDataSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getDepartmentDataFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getDepartmentDataFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
/**
 * get brand sector
 */

function* getBrandSector(action) {
  try {

    yield put(showLoader());

    const response = yield call(getBrandSectorsApi, action.payload.params);

    if (response.success) {
    
      yield put(hideLoader());
      yield put(getBrandSectorSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getBrandSectorFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getBrandSectorFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/**
 * get Tasks
 */

 function* getTasksSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getTaskApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getTasksSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getTasksFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getTasksFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/* ADD TASK */

function* getAddTaskSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getAddTaskApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getAddTaskSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getAddTaskFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(getAddTaskFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

///watcher///

function* AdminSaga() {
  yield takeLatest(GET_ASSOCIATED_BRANCH, getAssociatedCompaniesSaga);
  yield takeLatest(GET_ASSOCIATED_COMPANY_BRANCH, getAssociatedCompanieslSaga);
  yield takeLatest(GET_DASHBOARD, getDashboardSaga);
  yield takeLatest(ADD_DEPARTMENT, addDepartment);
  yield takeLatest(ADD_DESIGNATION, addDesignation);
  yield takeLatest(FETCH_DESIGNATION, getDesignation);
  yield takeLatest(FETCH_DEPARTMENT, getDepartments);
  yield takeLatest(GET_TASKS,getTasksSaga)
  yield takeLatest(ADD_TASK, getAddTaskSaga);
  yield takeLatest(ADD_BRAND_SECTOR, addBrandSector);
  yield takeLatest(ADD_TICKET_TAG, addTicketTag);
  yield takeLatest(GET_BRAND_SECTOR, getBrandSector);
  yield takeLatest(GET_TICKET_TAG, getTicketTag);
}

export default AdminSaga;
