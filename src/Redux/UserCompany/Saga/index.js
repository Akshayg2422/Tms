import { takeLatest, put, call } from "redux-saga/effects";
import * as Api from '@Services'
import * as Action from '../Store'


function* addDepartment(action) {
  try {
    const response = yield call(Api.postAddDepartmentApi, action.payload.params);
    if (response.success) {
      yield put(Action.addDepartmentSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.addDepartmentFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addDepartmentFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

function* addBrandSector(action) {
  try {
    const response = yield call(Api.addBrandSectorApi, action.payload.params);

    if (response.success) {
      yield put(Action.addBrandSectorSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addBrandSectorFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addBrandSectorFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
* add Designation
*/

function* addDesignation(action) {
  try {
    const response = yield call(Api.postAddDesignationApi, action.payload.params);

    if (response.success) {
      yield put(Action.addDesignationSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addDesignationFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addDesignationFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
* add ticket tag
*/
function* addTicketTag(action) {
  try {


    const response = yield call(Api.addTicketTagApi, action.payload.params);
    if (response.success) {
      yield put(Action.addTicketTagSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.addTicketTagFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.addTicketTagFailure("Invalid Request"));
    yield call(action.payload.onError);
  }
}

/**
* get designation
*/

function* getDesignation(action) {
  try {

    const response = yield call(Api.fetchDesignationDataApi, action.payload.params);

    if (response.success) {
      yield put(Action.getDesignationsSuccess(response.details));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getDesignationsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getDesignationsFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
/**get ticket tag */
function* getTicketTag(action) {

  try {

    const response = yield call(Api.getTicketTagApi, action.payload.params);

    if (response.success) {
      yield put(Action.getTicketTagSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getTicketTagFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getTicketTagFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/**
* get Departments
*/

function* getDepartmentsSaga(action) {
  try {
    const response = yield call(Api.fetchDepartmentDataApi, action.payload.params);

    if (response.success) {
      yield put(Action.getDepartmentsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.getDepartmentsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.getDepartmentsFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

/**
* get brand sector
*/

function* getBrandSector(action) {
  try {



    const response = yield call(Api.getBrandSectorsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getBrandSectorSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getBrandSectorFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getBrandSectorFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
function* getTaskGroupSaga(action) {
  try {

    const response = yield call(Api.getTaskGroupApi, action.payload.params);

    if (response.success) {
      yield put(Action.getTaskGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {

      yield put(Action.getTaskGroupFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getTaskGroupFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}

function* addTaskGroupSaga(action) {
  try {

    const response = yield call(Api.addTaskGroupApi, action.payload.params);

    if (response.success) {
      yield put(Action.addTaskGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addTaskGroupFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addTaskGroupFailure("Invalid Request"));
    yield call(action.payload.onError(error));
  }
}
function* getAssociatedCompaniesSaga(action) {
  try {

    const response = yield call(
      Api.getAssociatedCompaniesApi,
      action.payload.params
    );

    if (response.success) {
      yield put(Action.getAssociatedBranchSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getAssociatedBranchFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getAssociatedBranchFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* addUpdateEmployeePhotoSaga(action) {
  try {

    const response = yield call(Api.updateEmployeeProfilePhotoApi, action.payload.params);
    if (response.success) {
      yield put(Action.addUpdateEmployeePhotoSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addUpdateEmployeePhotoFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {


    yield put(Action.addUpdateEmployeePhotoFailure(error));
    yield call(action.payload.onError(error));

  }
}
function* addEmployeeSaga(action) {

  console.log('addEmployeeSaga');
  try {
    const response = yield call(Api.addEmployeeApi, action.payload.params);
    console.log(response);
    if (response.success) {
      yield put(Action.addEmployeeSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addEmployeeFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {

    yield put(Action.addEmployeeFailure(error));
    yield call(action.payload.onError(error));
  }
}


function* getEmployeesSaga(action) {

  try {
    const response = yield call(Api.getEmployeesApi, action.payload.params);
    if (response.success) {
      yield put(Action.getEmployeesSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getEmployeesFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getEmployeesFailure(error));
    yield call(action.payload.onError(error));
  }
}


// get employeesl

function* getEmployeeslSaga(action) {

  try {
    const response = yield call(Api.getEmployeeslApi, action.payload.params);
    if (response.success) {
      yield put(Action.getEmployeeslSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getEmployeeslFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getEmployeeslFailure(error));
    yield call(action.payload.onError(error));
  }
}
//get employeeTimeline
function* getEmployeeTimelineSaga(action) {
  try {
    const response = yield call(Api.getEmployeeTimeLineApi, action.payload.params);
    if (response.success) {
      yield put(Action.getEmployeeTimelineSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getEmployeeTimelineFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getEmployeeTimelineFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* addEmployeeTimelineSaga(action) {

  try {
    const response = yield call(Api.addEmployeeTimeLineApi, action.payload.params);
    if (response.success) {
      yield put(Action.addEmployeeTimelineSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addEmployeeTimelineFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addEmployeeTimelineFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* registerCompanySaga(action) {
  try {

    const response = yield call(Api.registerCompanyApi, action.payload.params);
    if (response.success) {
      yield put(Action.registerCompanySuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.registerCompanyFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.registerCompanyFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * register admin
 */

function* registerAdminSaga(action) {
  try {

    const response = yield call(Api.registerAdminApi, action.payload.params);
    if (response.success) {
      yield put(Action.registerAdminSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.registerAdminFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.registerAdminFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* getAssociatedCompaniesLSaga(action) {
  try {

    const response = yield call(
      Api.getAssociatedCompaniesLApi,
      action.payload.params
    );
    if (response.success) {
      yield put(Action.getAssociatedCompaniesLSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getAssociatedCompaniesLFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getAssociatedCompaniesLFailure(error));
    yield call(action.payload.onError(error));
  }
}


/**
 * Dashboard Saga
 */

function* getDashboardSaga(action) {
  try {
    const response = yield call(Api.getDashboardApi, action.payload.params);
    if (response.success) {
      yield put(Action.getDashboardSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getDashboardFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getDashboardFailure(error));
    yield call(action.payload.onError(error));
  }
}


function* getEventsSaga(action) {

  try {
    const response = yield call(Api.getEventsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getEventsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getEventsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getEventsFailure(error));
    yield call(action.payload.onError(error));
  }
}


/**
 * add employee for virtual conference
 */

function* postVideoConferenceSaga(action) {
  try {
    const response = yield call(Api.postVideoConferenceApi, action.payload.params);
    if (response.success) {
      yield put(Action.postVideoConferenceSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.postVideoConferenceFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.postVideoConferenceFailure(error));
    yield call(action.payload.onError(error));
  }
}

function* addEventSaga(action) {

  try {
    const response = yield call(Api.addEventApi, action.payload.params);
    if (response.success) {
      yield put(Action.addEventSuccess({ response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addEventFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addEventFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * get schedule list for meeting
 */

function* getVideoConferenceListSaga(action) {
  try {
    const response = yield call(Api.getVideoConferenceListApi, action.payload.params);
    if (response.success) {
      yield put(Action.getVideoConferenceListSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getVideoConferenceListFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getVideoConferenceListFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * get auth token for meeting
 */

function* getTokenByUserSaga(action) {
  try {
    const response = yield call(Api.getTokenByUserApi, action.payload.params);
    console.log('=========>', response)
    if (response.success) {
      yield put(Action.getAssociatedCompanySuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getAssociatedCompanyFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getAssociatedCompanyFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * GET ASSOCIATED COMPANIES
 */

function* getAssociatedCompanySaga(action) {
  try {
    const response = yield call(Api.getAssociatedCompanyApi, action.payload.params);
    console.log("registerCompany============>", response)
    if (response.success) {
      yield put(Action.getAssociatedCompanySuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getAssociatedCompanyFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getAssociatedCompanyFailure(error));
    yield call(action.payload.onError(error));
  }
}

/**
 * ADD ASSOCIATED COMPANY
 */

function* addAssociatedCompanySaga(action) {
  try {
    const response = yield call(Api.addAssociatedCompanyApi, action.payload.params);
    console.log("registerCompany============>", response)
    if (response.success) {
      yield call(action.payload.onSuccess(response));
    } else {
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield call(action.payload.onError(error));
  }
}
// getGroupEmployees

function* getGroupsEmployeesSaga(action) {
  try {
    const response = yield call(Api.getGroupEmployeesApi, action.payload.params);
    if (response.success) {
      yield put(Action.getGroupsEmployeesSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getGroupsEmployeesFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getGroupsEmployeesFailure(error));
    yield call(action.payload.onError(error));
  }
}

//get group message

function* getGroupsMessageSaga(action) {
  try {
    const response = yield call(Api.getGroupMessageApi, action.payload.params);
    if (response.success) {
      yield put(Action.getGroupMessageSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getGroupMessageFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getGroupMessageFailure(error));
    yield call(action.payload.onError(error));
  }
}

//add group message

function* addGroupsMessageSaga(action) {
  try {
    const response = yield call(Api.addGroupMessageApi, action.payload.params);
    if (response.success) {
      yield put(Action.addGroupMessageSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addGroupMessageFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addGroupMessageFailure(error));
    yield call(action.payload.onError(error));
  }
}


function* getSubGroupSaga(action) {
  try {
    const response = yield call(Api.getSubGroupApi, action.payload.params);
    if (response.success) {
      yield put(Action.getSubGroupSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getSubGroupFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getSubGroupFailure(error));
    yield call(action.payload.onError(error));
  }
}

//add group USER

function* addGroupUserSaga(action) {
  try {
    const response = yield call(Api.addGroupUserApi, action.payload.params);
    if (response.success) {
      yield put(Action.addGroupUserSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.addGroupUserFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.addGroupUserFailure(error));
    yield call(action.payload.onError(error));
  }
}

//get group 

function* getChatGroupsSaga(action) {
  try {
    const response = yield call(Api.getChatGroupsApi, action.payload.params);
    if (response.success) {
      yield put(Action.getChatGroupsSuccess(response));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(Action.getChatGroupsFailure(response));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(Action.getChatGroupsFailure(error));
    yield call(action.payload.onError(error));
  }
}



function* UserCompanySaga() {

  yield takeLatest(Action.GET_EMPLOYEES, getEmployeesSaga);
  yield takeLatest(Action.GET_EMPLOYEESL, getEmployeeslSaga);
  yield takeLatest(Action.GET_TASK_GROUP, getTaskGroupSaga)
  yield takeLatest(Action.ADD_TASK_GROUP, addTaskGroupSaga)
  yield takeLatest(Action.ADD_BRAND_SECTOR, addBrandSector);
  yield takeLatest(Action.ADD_TICKET_TAG, addTicketTag);
  yield takeLatest(Action.GET_BRAND_SECTOR, getBrandSector);
  yield takeLatest(Action.GET_TICKET_TAG, getTicketTag);
  yield takeLatest(Action.ADD_DEPARTMENT, addDepartment);
  yield takeLatest(Action.ADD_DESIGNATION, addDesignation);
  yield takeLatest(Action.FETCH_DESIGNATION, getDesignation);
  yield takeLatest(Action.FETCH_DEPARTMENT, getDepartmentsSaga);
  yield takeLatest(Action.GET_ASSOCIATED_BRANCH, getAssociatedCompaniesSaga);
  yield takeLatest(Action.ADD_EMPLOYEE, addEmployeeSaga);
  yield takeLatest(Action.UPDATE_EMPLOYEE_PROFILE_PHOTO, addUpdateEmployeePhotoSaga);
  yield takeLatest(Action.REGISTER_ADMIN, registerAdminSaga);
  yield takeLatest(Action.REGISTER_COMPANY, registerCompanySaga);
  yield takeLatest(Action.GET_ASSOCIATED_COMPANIES_L, getAssociatedCompaniesLSaga);
  yield takeLatest(Action.GET_DASHBOARD, getDashboardSaga);
  yield takeLatest(Action.GET_EMPLOYEE_TIMELINE, getEmployeeTimelineSaga);
  yield takeLatest(Action.ADD_EMPLOYEE_TIMELINE, addEmployeeTimelineSaga);
  yield takeLatest(Action.GET_EVENTS, getEventsSaga);
  yield takeLatest(Action.ADD_EVENT, addEventSaga);
  yield takeLatest(Action.POST_VIDEO_CONFERENCE, postVideoConferenceSaga);
  yield takeLatest(Action.GET_VIDEO_CONFERENCE_LIST, getVideoConferenceListSaga);
  yield takeLatest(Action.GET_TOKEN_BY_USER, getTokenByUserSaga);
  yield takeLatest(Action.GET_ASSOCIATED_COMPANY, getAssociatedCompanySaga);
  yield takeLatest(Action.ADD_ASSOCIATED_COMPANY, addAssociatedCompanySaga);
  yield takeLatest(Action.GET_GROUPS_EMPLOYEES, getGroupsEmployeesSaga);
  yield takeLatest(Action.GET_GROUP_MESSAGE, getGroupsMessageSaga);
  yield takeLatest(Action.ADD_GROUP_MESSAGE, addGroupsMessageSaga);
  yield takeLatest(Action.GET_SUB_GROUP, getSubGroupSaga);
  yield takeLatest(Action.ADD_GROUP_USER, addGroupUserSaga);
  yield takeLatest(Action.GET_CHAT_GROUPS, getChatGroupsSaga)

}

export default UserCompanySaga;

