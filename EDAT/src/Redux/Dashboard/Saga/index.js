import { takeLatest, put, call } from 'redux-saga/effects';
import {
    fetchTaskDetailsApi,
    fetchCoursesApi,
    fetchCourseTopicsApi,
    fetchCourseTopicTasksApi,
    postGenericCrudApi,
    postAddDepartmentApi,
    postAddDesignationApi,
    fetchDepartmentDataApi,
    fetchDesignationDataApi,
    postGenericBatchCrudApi,
    postAddStudentApi,
    fetchStudentsListApi,
    postAddFacultyApi,
    fetchFacultiesListApi,
    fetchApproverApi,
    fetchRefererListApi,
    fetchStudentDetailsApi,
    fetchDashboardDetailsApi,
    postRaiseAnonymousComplaintApi,
    fetchFacultyDetailsApi,

    /**
     * student
     */
    fetchStudentCoursesApi,
    fetchStudentCourseSectionsApi,
    fetchStudentCourseTopicsApi,
    fetchStudentCourseTasksApi,
    fetchStudentCourseTasksDetailsApi
} from '@Services';

import { ERRORS } from '@Utils';
import {
    FETCH_TASK_DETAILS,
    fetchTaskDetailsSuccess,
    fetchTaskDetailsFailure,
    hideLoader,
    showLoader,
    FETCH_COURSES,
    fetchCoursesSuccess,
    fetchCoursesFailure,

    FETCH_COURSE_TOPICS,
    fetchCourseTopicsSuccess,
    fetchCourseTopicsFailure,

    FETCH_COURSE_TOPIC_TASKS,
    fetchCourseTopicTasksSuccess,
    fetchCourseTopicTasksFailure,

    POST_GENERIC_CRUD_DETAILS,
    postGenericCrudDetailsSuccess,
    postGenericCrudDetailsFailure,

    ADD_DEPARTMENT,
    addDepartmentSuccess,
    addDepartmentFailure,

    ADD_DESIGNATION,
    addDesignationSuccess,
    addDesignationFailure,

    FETCH_DEPARTMENT,
    getDepartmentDataSuccess,
    getDepartmentDataFailure,

    FETCH_DESIGNATION,
    getDesignationDataSuccess,
    getDesignationDataFailure,
    POST_GENERIC_BATCH_CRUD_DETAILS,
    postGenericBatchCrudDetailsSuccess,
    postGenericBatchCrudDetailsFailure,

    ADD_STUDENT,
    postAddStudentSuccess,
    postAddStudentFailure,

    FETCH_STUDENTS_LIST,
    fetchStudentsListSuccess,
    fetchStudentsListFailure,

    ADD_FACULTY,
    postAddFacultySuccess,
    postAddFacultyFailure,

    FETCH_FACULTIES_LIST,
    fetchFacultiesListSuccess,
    fetchFacultiesListFailure,

    FETCH_APPROVER_LIST,
    fetchApproverListSuccess,
    fetchApproverListFailure,

    FETCH_REFERER_LIST,
    fetchRefererListSuccess,
    fetchRefererListFailure,

    FETCH_STUDENTS_DETAILS,
    fetchStudentDetailsSuccess,
    fetchStudentDetailsFailure,

    FETCH_DASHBOARD_DETAILS,
    fetchDashboardDetailsSuccess,
    fetchDashboardDetailsFailure,

    POST_RAISE_ANONYMOUS_COMPLAINT,
    postRaiseAnonymousComplaintSuccess,
    postRaiseAnonymousComplaintFailure,

    FETCH_FACULTIES_DETAILS,
    fetchFacultyDetailsSuccess,
    fetchFacultyDetailsFailure,


    /**
     * Student
     */
    FETCH_STUDENT_COURSES,
    fetchStudentCoursesSuccess,
    fetchStudentCoursesFailure,

    FETCH_STUDENT_COURSE_SECTION,
    fetchStudentCourseSectionSuccess,
    fetchStudentCourseSectionFailure,

    FETCH_STUDENT_COURSE_TOPICS,
    fetchStudentCourseTopicsSuccess,
    fetchStudentCourseTopicsFailure,

    FETCH_STUDENT_COURSE_TASKS,
    fetchStudentCourseTasksSuccess,
    fetchStudentCourseTasksFailure,

    FETCH_STUDENT_COURSE_TASKS_DETAILS,
    fetchStudentCourseTaskDetailssSuccess,
    fetchStudentCourseTasksDetailsFailure

} from '@Redux';

function* fetchTaskDetailsSaga(action) {

    try {
        yield put(showLoader());
        const response = yield call(fetchTaskDetailsApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchTaskDetailsSuccess({ ...response.details }));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchTaskDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchTaskDetailsFailure(ERRORS.INVALID_REQUEST));
    }
}

/**
 * get courses
 */

function* fetchCourses(action) {

    try {
        yield put(showLoader());
        const response = yield call(fetchCoursesApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchCoursesSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchCoursesFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchCoursesFailure(ERRORS.INVALID_REQUEST));
    }
}

/**
 * get course topics
 */

function* fetchCourseTopics(action) {

    try {
        // yield put(showLoader());
        const response = yield call(fetchCourseTopicsApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            // yield put(hideLoader());
            yield put(fetchCourseTopicsSuccess({ ...response.details }));
            yield call(action.payload.onSuccess(response.details));
        } else {
            // yield put(hideLoader());
            yield put(fetchCourseTopicsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        // yield put(hideLoader());
        yield put(fetchCourseTopicsFailure(ERRORS.INVALID_REQUEST));
    }
}

/**
 * get course topic tasks
 */

function* fetchCourseTopicTasks(action) {

    try {
        yield put(showLoader());
        const response = yield call(fetchCourseTopicTasksApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchCourseTopicTasksSuccess({ ...response.details }));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchCourseTopicTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchCourseTopicTasksFailure(ERRORS.INVALID_REQUEST));
    }
}

/**
 * post generic CRUD details
 */

function* postGenericCrudDetailSaga(action) {

    try {
        yield put(showLoader());
        console.log("receivedparams gcrud------->", action.payload.params);
        const response = yield call(postGenericCrudApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(postGenericCrudDetailsSuccess({ ...response.details }));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postGenericCrudDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());

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
    }
}

/**
* Generic Batch CRUD
*/

function* postGenericBatchCrudDetailSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postGenericBatchCrudApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postGenericBatchCrudDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postGenericBatchCrudDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        console.log("errorrrrrrsagaaa--->", error)
        yield put(hideLoader());
        yield put(postGenericBatchCrudDetailsFailure("Invalid Request"));
        yield call(action.payload.onError);
    }
}

/**
 * add student
 */

function* addStudent(action) {
    try {
        yield put(showLoader());

        console.log("studaction----", JSON.stringify(action));
        const response = yield call(postAddStudentApi, action.payload.params);

        console.log(JSON.stringify(response) + '====response');
        if (response.success) {
            yield put(hideLoader());
            yield put(postAddStudentSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postAddStudentFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * get students list 
 */

function* getStudentsList(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentsListApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentsListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentsListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());

    }
}

/**
 * add faculty
 */

function* addFaculty(action) {
    try {
        yield put(showLoader());
        console.log("actionnnn", action);
        const response = yield call(postAddFacultyApi, action.payload.params);
        console.log("responseeeeeeee--------->", response);
        if (response.success) {
            console.log("successsss");
            yield put(hideLoader());
            yield put(postAddFacultySuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postAddFacultyFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * get faculties list 
 */

function* getFacultiesList(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchFacultiesListApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchFacultiesListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchFacultiesListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}


/**
 * get Approver list saga
 */

function* getApproverListSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchApproverApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchApproverListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchApproverListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * get referer list
 */

function* getRefererList(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchRefererListApi, action.payload.params);
        console.log("response============", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchRefererListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchRefererListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * get student details
 */

function* getStudentDetails(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentDetailsApi, action.payload.params);
        console.log("response============", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}


/**
 * get dashboard details
 */

function* getDashboardDetails(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchDashboardDetailsApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchDashboardDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchDashboardDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * post raise anonymous complaint saga
 */

function* postRaiseAnonymousComplaintSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postRaiseAnonymousComplaintApi, action.payload.params);
        console.log("response============--->",response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postRaiseAnonymousComplaintSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postRaiseAnonymousComplaintFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}


/**
 * get faculty Details 
 */

function* getFacultyDetails(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchFacultyDetailsApi, action.payload.params);
        console.log("response===========details=--->",response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchFacultyDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchFacultyDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}


/**
 * Student
 */


/**
 * get student courses
 */

function* getStudentCoursesSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCoursesApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCoursesSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentCoursesFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * get student course section
 */

function* getStudentCourseSectionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseSectionsApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseSectionSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentCourseSectionFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * get student course topics
 */

function* getStudentCourseTopicsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseTopicsApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTopicsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentCourseTopicsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * fetch student course tasks saga
 */
function* fetchStudentCourseTasksSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseTasksApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTasksSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentCourseTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

/**
 * fetch student course tasks details saga
 */
function* fetchStudentCourseTasksDetailsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseTasksDetailsApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTaskDetailssSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentCourseTasksDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
    }
}

///watcher///

function* DashboardSaga() {
    yield takeLatest(FETCH_TASK_DETAILS, fetchTaskDetailsSaga);
    yield takeLatest(FETCH_COURSES, fetchCourses);
    yield takeLatest(FETCH_COURSE_TOPICS, fetchCourseTopics);
    yield takeLatest(FETCH_COURSE_TOPIC_TASKS, fetchCourseTopicTasks);
    yield takeLatest(POST_GENERIC_CRUD_DETAILS, postGenericCrudDetailSaga);
    yield takeLatest(ADD_DEPARTMENT, addDepartment);
    yield takeLatest(ADD_DESIGNATION, addDesignation);
    yield takeLatest(FETCH_DESIGNATION, getDesignation);
    yield takeLatest(FETCH_DEPARTMENT, getDepartments);
    yield takeLatest(POST_GENERIC_BATCH_CRUD_DETAILS, postGenericBatchCrudDetailSaga);
    yield takeLatest(ADD_STUDENT, addStudent);
    yield takeLatest(FETCH_STUDENTS_LIST, getStudentsList);
    yield takeLatest(ADD_FACULTY, addFaculty);
    yield takeLatest(FETCH_FACULTIES_LIST, getFacultiesList);
    yield takeLatest(FETCH_APPROVER_LIST, getApproverListSaga);
    yield takeLatest(FETCH_REFERER_LIST, getRefererList);
    yield takeLatest(FETCH_STUDENTS_DETAILS, getStudentDetails);
    yield takeLatest(FETCH_DASHBOARD_DETAILS, getDashboardDetails);
    yield takeLatest(POST_RAISE_ANONYMOUS_COMPLAINT, postRaiseAnonymousComplaintSaga);
    yield takeLatest(FETCH_FACULTIES_DETAILS, getFacultyDetails);


    /**
     * Student saga
     */
    yield takeLatest(FETCH_STUDENT_COURSES, getStudentCoursesSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_SECTION, getStudentCourseSectionSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TOPICS, getStudentCourseTopicsSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TASKS, fetchStudentCourseTasksSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TASKS_DETAILS, fetchStudentCourseTasksDetailsSaga);


}

export default DashboardSaga;