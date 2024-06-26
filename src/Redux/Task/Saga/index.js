import { takeLatest, put, call,} from 'redux-saga/effects';
import * as Action from '../Store'
import * as Services from '@Services'


// getTaskGroupL

function* getTaskGroupLSaga(action) {
  
    try {
        const response = yield call(Services.getTaskGroupLApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTaskGroupsLSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskGroupLFailure(response));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTaskGroupLFailure(error));
        yield call(action.payload.onError(error));
    }
}

function* getTasksSaga(action) {
    try {
        const response = yield call(Services.getTaskApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTasksFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}

/**
 * Add Task Event
 * @param {*} action 
 */

function* addTaskEventSaga(action) {
    try {
        const response = yield call(Services.addTaskEventApi, action.payload.params);

        if (response.success) {
            yield put(Action.addTaskEventSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {

            yield put(Action.addTaskEventFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {

        yield put(Action.addTaskEventFailure(error));
        yield call(action.payload.onError(error));

    }
}

/**
 * GET TASK EVENT HISTORY
 */

function* getTaskEventHistorySaga(action) {
   
    try {
        const response = yield call(Services.getTaskEventHistoryApi, action.payload.params);
     
        if (response.success) {
            yield put(Action.getTaskEventHistorySuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskEventHistoryFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTaskEventHistoryFailure("Invalid Request"));
        yield call(action.payload.onError);
    }
}


/**
 * Get Sub Tasks
 * @param {} action 
 */

function* getSubTasksSaga(action) {

    try {
        const response = yield call(Services.getSubTaskApi, action.payload.params);

        if (response.success) {
            yield put(Action.getSubTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getSubTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getSubTasksFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


/**
 *  get Task Events
 */

function* getTaskEventsSaga(action) {
    // console.log('getTaskEventsSaga' + JSON.stringify(action));
    try {
        const response = yield call(Services.getTaskEventsApi, action.payload.params);
        // console.log(JSON.stringify(response) + 'getTaskEventsSaga-----');
        if (response.success) {
            yield put(Action.getTaskEventsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskEventsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTaskEventsFailure(error));
        yield call(action.payload.onError(error));
    }
}



/**
 * get Reference task
 * @param {*} action 
 */
function* getReferenceTasksSaga(action) {
    try {
        const response = yield call(Services.getReferenceTasksApi, action.payload.params);

        if (response.success) {
            yield put(Action.getReferenceTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getReferenceTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getReferenceTasksFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


/**
 * get Task User
 */

function* getTaskUsersSaga(action) {
    try {
        const response = yield call(Services.getTaskUsersApi, action.payload.params);
        if (response.success) {

            yield put(Action.getTaskUsersSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskUsersFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {

        yield put(Action.getTaskUsersFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


/**
 * get Task Event Attachments
 */

function* getTaskEventAttachmentsSaga(action) {
    try {
        const response = yield call(Services.getTaskEventsApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTaskEventAttachmentsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskEventAttachmentsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTaskEventAttachmentsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/* GET TASK DETAILS */

function* getTaskDetailsSaga(action) {
    try {
        const response = yield call(Services.getTaskDetailsApi, action.payload.params);
        if (response.success) {
            yield put(Action.getTaskDetailsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTaskDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
       

        yield put(Action.getTaskDetailsFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


/**
 * sub task groups
 */

function* getSubTaskGroupSaga(action) {
    try {
        const response = yield call(Services.getSubTaskGroupsApi, action.payload.params);
        if (response.success) {
            yield put(Action.getSubTaskGroupsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getSubTaskGroupsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getSubTaskGroupsFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


// get AssignedTask

function* getAssignedTaskSaga(action) {
    try {
        const response = yield call(Services.getAssignedTaskApi, action.payload.params);
        if (response.success) {
            yield put(Action.getAssignedTaskSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getAssignedTaskFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getAssignedTaskFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


// get AssignedTask

function* getTimeLineBreakDownSaga(action) {
    try {
        const response = yield call(Services.getTimeLineBreakdownApi , action.payload.params);
        if (response.success) {
            yield put(Action.getTimeLineBreakdownSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getTimeLineBreakdownFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.getTimeLineBreakdownFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


// add Attachments Message

function* addAttachmentsMessageSaga(action) {
   
    try {
        const response = yield call(Services.addAttachmentsMessageApi, action.payload.params);
        if (response.success) {
        
            yield put(Action.addAttachmentsMessageSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
         
            yield put(Action.addAttachmentsMessageFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.addAttachmentsMessageFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


// add voice record

function* fetchUsingVoiceSaga(action) {
  
    try {
        const response = yield call(Services.addTaskUsingVoiceApi, action.payload.params);
        if (response.success) {
          
            yield put(Action.fetchUsingVoiceSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
        
            yield put(Action.fetchUsingVoiceFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.fetchUsingVoiceFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}



// add company label

function* fetchCompanyLabelSaga(action) {
   
    try {
        const response = yield call(Services.fetchCompanyLabelApi, action.payload.params);
        if (response.success) {
          
            yield put(Action.fetchUsingCompanyLabelSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
      
            yield put(Action.fetchUsingCompanyLabelFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(Action.fetchUsingCompanyLabelFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}

// get Attachments Message

function* getAttachmentsMessageSaga(action){
    try{
        const response = yield call(Services.getAttachmentsMessageApi , action.payload.params);
        if (response.success) {
            yield put(Action.getAttachmentsMessageSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(Action.getAttachmentsMessageFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } 
    catch (error) {
        yield put(Action.getAttachmentsMessageFailure("Invalid Request"));
        yield call(action.payload.onError(error));
    }
}


function* TaskSaga() {
    yield takeLatest(Action.GET_TASK_GROUPS_L, getTaskGroupLSaga)
    yield takeLatest(Action.GET_TASKS, getTasksSaga)
    yield takeLatest(Action.ADD_TASK_EVENT, addTaskEventSaga)
    yield takeLatest(Action.GET_TASK_EVENT_HISTORY, getTaskEventHistorySaga)
    yield takeLatest(Action.GET_SUB_TASKS, getSubTasksSaga)
    yield takeLatest(Action.GET_TASK_EVENTS, getTaskEventsSaga)
    yield takeLatest(Action.GET_REFERENCE_TASKS, getReferenceTasksSaga);
    yield takeLatest(Action.GET_TASK_USERS, getTaskUsersSaga);
    yield takeLatest(Action.GET_TASK_EVENT_ATTACHMENTS, getTaskEventAttachmentsSaga)
    yield takeLatest(Action.GET_TASK_DETAILS, getTaskDetailsSaga)
    yield takeLatest(Action.GET_SUB_TASK_GROUPS, getSubTaskGroupSaga)
    yield takeLatest(Action.GET_ASSIGNED_TASK, getAssignedTaskSaga)
    yield takeLatest(Action.GET_TIMELINE_BREAKDOWN, getTimeLineBreakDownSaga)
    yield takeLatest(Action.ADD_ATTACHMENTS_MESSAGE,addAttachmentsMessageSaga)
    yield takeLatest(Action.GET_ATTACHMENTS_MESSAGE,getAttachmentsMessageSaga)
    yield takeLatest(Action.FETCH_USING_VOICE,fetchUsingVoiceSaga)
    yield takeLatest(Action.FETCH_COMPANY_LABEL,fetchCompanyLabelSaga)


    
}

export default TaskSaga;

