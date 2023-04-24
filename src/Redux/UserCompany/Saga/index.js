import { takeLatest, put, call } from "redux-saga/effects";
import {
   
    fetchDesignationDataApi,
    getTicketTagApi,
    getBrandSectorsApi,
    addBrandSectorApi,
    addTicketTagApi,
    postAddDepartmentApi,
    postAddDesignationApi,
    fetchDepartmentDataApi,
    getTaskGroupApi,
    addTaskGroupApi,
   
  } from "@Services";
  import{
    
    ADD_DEPARTMENT,
    showLoader,
    hideLoader,
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
    GET_TASK_GROUP,
    getTaskGroupSuccess,
    getTaskGroupFailure,
    ADD_TASK_GROUP,
    addTaskGroupSuccess,
    addTaskGroupFailure,
   

  }from '@Redux'

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

      function* addBrandSector(action) {
        try {
        //   yield put(showLoader());
      
          const response = yield call(addBrandSectorApi, action.payload.params);
      
          if (response.success) {
            // yield put(hideLoader());
            yield put(addBrandSectorSuccess(response.details));
            yield call(action.payload.onSuccess(response));
          } else {
            // yield put(hideLoader());
            yield put(addBrandSectorFailure(response.error_message));
            yield call(action.payload.onError(response));
          }
        } catch (error) {
        //   yield put(hideLoader());
          yield put(addBrandSectorFailure("Invalid Request"));
          yield call(action.payload.onError);
        }
      }

      /**
 * add Designation
 */

function* addDesignation(action) {
    try {
    //   yield put(showLoader());
  
      const response = yield call(postAddDesignationApi, action.payload.params);
  
      if (response.success) {
        // yield put(hideLoader());
        yield put(addDesignationSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(addDesignationFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(addDesignationFailure("Invalid Request"));
      yield call(action.payload.onError);
    }
  }

  /**
 * add ticket tag
 */
function* addTicketTag(action) {
    try {
    //   yield put(showLoader());
  
      const response = yield call(addTicketTagApi, action.payload.params);
  
      if (response.success) {
        // yield put(hideLoader());
        yield put(addTicketTagSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(addTicketTagFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(addTicketTagFailure("Invalid Request"));
      yield call(action.payload.onError);
    }
  }

  /**
 * get designation
 */

function* getDesignation(action) {
    try {
    //   yield put(showLoader());
      const response = yield call(fetchDesignationDataApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getDesignationDataSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getDesignationDataFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(getDesignationDataFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }
  /**get ticket tag */
function* getTicketTag(action) {

    try {
    //   yield put(showLoader());
      const response = yield call(getTicketTagApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getTicketTagSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getTicketTagFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
  
    //   yield put(hideLoader());
      yield put(getTicketTagFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }

  /**
 * get Departments
 */

function* getDepartmentsSaga(action) {
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
  
    //   yield put(showLoader());
  
      const response = yield call(getBrandSectorsApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getBrandSectorSuccess(response.details));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getBrandSectorFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(getBrandSectorFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }
  function* getTaskGroupSaga(action) {
    try {
    //   yield put(showLoader());
      const response = yield call(getTaskGroupApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(getTaskGroupSuccess(response));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(getTaskGroupFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(getTaskGroupFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }
  
  function* addTaskGroupSaga(action) {
    try {
    //   yield put(showLoader());
      const response = yield call(addTaskGroupApi, action.payload.params);
  
      if (response.success) {
  
        // yield put(hideLoader());
        yield put(addTaskGroupSuccess(response));
        yield call(action.payload.onSuccess(response));
      } else {
        // yield put(hideLoader());
        yield put(addTaskGroupFailure(response.error_message));
        yield call(action.payload.onError(response));
      }
    } catch (error) {
    //   yield put(hideLoader());
      yield put(addTaskGroupFailure("Invalid Request"));
      yield call(action.payload.onError(error));
    }
  }


  function* UserCompanySaga() {


    yield takeLatest(GET_TASK_GROUP, getTaskGroupSaga)
    yield takeLatest(ADD_TASK_GROUP, addTaskGroupSaga)
    yield takeLatest(ADD_BRAND_SECTOR, addBrandSector);
    yield takeLatest(ADD_TICKET_TAG, addTicketTag);
    yield takeLatest(GET_BRAND_SECTOR, getBrandSector);
    yield takeLatest(GET_TICKET_TAG, getTicketTag);
    yield takeLatest(ADD_DEPARTMENT, addDepartment);
    yield takeLatest(ADD_DESIGNATION, addDesignation);
    yield takeLatest(FETCH_DESIGNATION, getDesignation);
    yield takeLatest(FETCH_DEPARTMENT, getDepartmentsSaga);

  }

  export default UserCompanySaga;