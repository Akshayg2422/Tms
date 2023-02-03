import {
  FETCH_TASK_DETAILS,
  FETCH_TASK_DETAILS_SUCCESS,
  FETCH_TASK_DETAILS_FAILURE,

  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,

  FETCH_COURSE_TOPICS,
  FETCH_COURSE_TOPICS_SUCCESS,
  FETCH_COURSE_TOPICS_FAILURE,

  FETCH_COURSE_TOPIC_TASKS,
  FETCH_COURSE_TOPIC_TASKS_SUCCESS,
  FETCH_COURSE_TOPIC_TASKS_FAILURE,

  SET_COURSE_TOPIC_NAME,

  POST_GENERIC_CRUD_DETAILS,
  POST_GENERIC_CRUD_DETAILS_SUCCESS,
  POST_GENERIC_CRUD_DETAILS_FAILURE,

  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILURE,

  ADD_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAILURE,

  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,

  FETCH_DESIGNATION,
  FETCH_DESIGNATION_SUCCESS,
  FETCH_DESIGNATION_FAILURE,

  POST_GENERIC_BATCH_CRUD_DETAILS,
  POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS,
  POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE,

  SET_CURRENT_COURSE_SECTION,
  IS_DND_MODAL_OPEN,

  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,

  FETCH_STUDENTS_LIST,
  FETCH_STUDENTS_LIST_SUCCESS,
  FETCH_STUDENTS_LIST_FAILURE,

  ADD_FACULTY,
  ADD_FACULTY_SUCCESS,
  ADD_FACULTY_FAILURE,

  FETCH_FACULTIES_LIST,
  FETCH_FACULTIES_LIST_SUCCESS,
  FETCH_FACULTIES_LIST_FAILURE,

  FETCH_APPROVER_LIST,
  FETCH_APPROVER_LIST_SUCCESS,
  FETCH_APPROVER_LIST_FAILURE,

  FETCH_REFERER_LIST,
  FETCH_REFERER_LIST_SUCCESS,
  FETCH_REFERER_LIST_FAILURE,

  SETTING_CURRENT_COURSE,

  FETCH_STUDENTS_DETAILS,
  FETCH_STUDENTS_DETAILS_SUCCESS,
  FETCH_STUDENTS_DETAILS_FAILURE,

  SETTING_CURRENT_TASK_ITEM,

  FETCH_DASHBOARD_DETAILS,
  FETCH_DASHBOARD_DETAILS_SUCCESS,
  FETCH_DASHBOARD_DETAILS_FAILURE,

  SETTING_SELECTED_FACULTY_ID,

  EDIT_USER_REGISTRATION,

  POST_RAISE_ANONYMOUS_COMPLAINT,
  POST_RAISE_ANONYMOUS_COMPLAINT_SUCCESS,
  POST_RAISE_ANONYMOUS_COMPLAINT_FAILURE,


  FETCH_FACULTIES_DETAILS,
  FETCH_FACULTIES_DETAILS_FAILURE,
  FETCH_FACULTIES_DETAILS_SUCCESS,
  /**
   * Student
   */

  FETCH_STUDENT_COURSE_TASKS,
  FETCH_STUDENT_COURSE_TASKS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_FAILURE,

  FETCH_STUDENT_COURSE_TASKS_DETAILS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE,

  FETCH_STUDENT_COURSES,
  FETCH_STUDENT_COURSES_SUCCESS,
  FETCH_STUDENT_COURSES_FAILURE,

  FETCH_STUDENT_COURSE_SECTION,
  FETCH_STUDENT_COURSE_SECTION_SUCCESS,
  FETCH_STUDENT_COURSE_SECTION_FAILURE,

  FETCH_STUDENT_COURSE_TOPICS,
  FETCH_STUDENT_COURSE_TOPICS_SUCCESS,
  FETCH_STUDENT_COURSE_TOPICS_FAILURE,

  SETTING_DEFAULT_COURSE

} from '../ActionTypes';

/**
* Fetch task details
*/

export const fetchTaskDetails = (params: any) => {
  return {
    type: FETCH_TASK_DETAILS,
    payload: params,
  };
};

export const fetchTaskDetailsSuccess = (response: any) => {
  return {
    type: FETCH_TASK_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchTaskDetailsFailure = (response: any) => {
  return {
    type: FETCH_TASK_DETAILS_FAILURE,
    payload: response,
  };
};

/**
 * Get courses
 */

export const fetchCourses = (params: any) => {
  return {
    type: FETCH_COURSES,
    payload: params,
  };
};

export const fetchCoursesSuccess = (response: any) => {
  return {
    type: FETCH_COURSES_SUCCESS,
    payload: response,
  };
};

export const fetchCoursesFailure = (response: any) => {
  return {
    type: FETCH_COURSES_FAILURE,
    payload: response,
  };
};

/**
* Get course Topics
*/

export const fetchCourseTopics = (params: any) => {
  return {
    type: FETCH_COURSE_TOPICS,
    payload: params,
  };
};

export const fetchCourseTopicsSuccess = (response: any) => {
  return {
    type: FETCH_COURSE_TOPICS_SUCCESS,
    payload: response,
  };
};

export const fetchCourseTopicsFailure = (response: any) => {
  return {
    type: FETCH_COURSE_TOPICS_FAILURE,
    payload: response,
  };
};

/**
* Get course Topic tasks
*/

export const fetchCourseTopicTasks = (params: any) => {
  return {
    type: FETCH_COURSE_TOPIC_TASKS,
    payload: params,
  };
};

export const fetchCourseTopicTasksSuccess = (response: any) => {
  return {
    type: FETCH_COURSE_TOPIC_TASKS_SUCCESS,
    payload: response,
  };
};

export const fetchCourseTopicTasksFailure = (response: any) => {
  return {
    type: FETCH_COURSE_TOPIC_TASKS_FAILURE,
    payload: response,
  };
};

/**
 * Setting course topic name
 */

export const settingCourseTopicName = (value: any) => {
  return {
    type: SET_COURSE_TOPIC_NAME,
    payload: value,
  };
};

/**
 * Generic CRUD action
 */
export const postGenericCrudDetails = (params: any) => {
  console.log('cation',params);
  
  return {
    type: POST_GENERIC_CRUD_DETAILS,
    payload: params,
  };
};

export const postGenericCrudDetailsSuccess = (response: any) => {
  console.log('cation--->',response);
  return {
    type: POST_GENERIC_CRUD_DETAILS_SUCCESS,
    payload: response,
  };
};

export const postGenericCrudDetailsFailure = (response: any) => {
  return {
    type: POST_GENERIC_CRUD_DETAILS_FAILURE,
    payload: response,
  };
};


/**
 * Add department
 */

export const addDepartment = (params) => {
  return {
    type: ADD_DEPARTMENT,
    payload: params,
  };
};

export const addDepartmentSuccess = (response) => {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const addDepartmentFailure = (error) => {
  return {
    type: ADD_DEPARTMENT_FAILURE,
    payload: error,
  };
};

/**
 * Add designation
 */

export const addDesignation = (params) => {
  return {
    type: ADD_DESIGNATION,
    payload: params,
  };
};

export const addDesignationSuccess = (response) => {
  return {
    type: ADD_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const addDesignationFailure = (error) => {
  return {
    type: ADD_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get designation

export const getDesignationData = (params) => {
  return {
    type: FETCH_DESIGNATION,
    payload: params,
  };
};

export const getDesignationDataSuccess = (response) => {
  return {
    type: FETCH_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const getDesignationDataFailure = (error) => {
  return {
    type: FETCH_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get departments

export const getDepartmentData = (params) => {
  return {
    type: FETCH_DEPARTMENT,
    payload: params,
  };
};

export const getDepartmentDataSuccess = (response) => {
  return {
    type: FETCH_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const getDepartmentDataFailure = (error) => {
  return {
    type: FETCH_DEPARTMENT_FAILURE,
    payload: error,
  };
};

/**
 * Setting course topic name
 */

export const settingCurrentCourseSection = (value: any) => {
  return {
    type: SET_CURRENT_COURSE_SECTION,
    payload: value,
  };
};

/**
 * Generic Batch CRUD action
 */

export const postGenericBatchCrudDetails = (params: any) => {
  return {
    type: POST_GENERIC_BATCH_CRUD_DETAILS,
    payload: params,
  };
};

export const postGenericBatchCrudDetailsSuccess = (response: any) => {
  return {
    type: POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS,
    payload: response,
  };
};

export const postGenericBatchCrudDetailsFailure = (response: any) => {
  return {
    type: POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE,
    payload: response,
  };
};

/**
 * To handle dnd modal open or close
 */

export const handleDndModal = (value: Boolean) => {
  return {
    type: IS_DND_MODAL_OPEN,
    payload: value,
  };
};


/**
 * add student
 */

export const postAddStudent = (params: any) => {
  console.log('action');

  return {
    type: ADD_STUDENT,
    payload: params,
  };
};

export const postAddStudentSuccess = (response: any) => {
  return {
    type: ADD_STUDENT_SUCCESS,
    payload: response,
  };
};

export const postAddStudentFailure = (response: any) => {
  return {
    type: ADD_STUDENT_FAILURE,
    payload: response,
  };
};


/**
 * get students list
 */

export const fetchStudentsList = (params: any) => {
  return {
    type: FETCH_STUDENTS_LIST,
    payload: params,
  };
};

export const fetchStudentsListSuccess = (response: any) => {
  return {
    type: FETCH_STUDENTS_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchStudentsListFailure = (response: any) => {
  return {
    type: FETCH_STUDENTS_LIST_FAILURE,
    payload: response,
  };
};



/**
 * add Faculty
 */

export const postAddFaculty = (params: any) => {
  console.log("actionparamsss--->", params);

  return {
    type: ADD_FACULTY,
    payload: params,
  };
};

export const postAddFacultySuccess = (response: any) => {
  return {
    type: ADD_FACULTY_SUCCESS,
    payload: response,
  };
};

export const postAddFacultyFailure = (response: any) => {
  return {
    type: ADD_FACULTY_FAILURE,
    payload: response,
  };
};


/**
 * get Faculty list
 */

export const fetchFacultiesList = (params: any) => {
  return {
    type: FETCH_FACULTIES_LIST,
    payload: params,
  };
};

export const fetchFacultiesListSuccess = (response: any) => {
  return {
    type: FETCH_FACULTIES_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchFacultiesListFailure = (response: any) => {
  return {
    type: FETCH_FACULTIES_LIST_FAILURE,
    payload: response,
  };
};

/**
 * get Approver list
 */

export const fetchApproverList = (params: any) => {
  return {
    type: FETCH_APPROVER_LIST,
    payload: params,
  }
}

export const fetchApproverListSuccess = (response: any) => {
  return {
    type: FETCH_APPROVER_LIST_SUCCESS,
    payload: response,
  }
}

export const fetchApproverListFailure = (response: any) => {
  return {
    type: FETCH_APPROVER_LIST_FAILURE,
    payload: response,
  }
}

/* get referer list
*/

export const fetchRefererList = (params: any) => {
  return {
    type: FETCH_REFERER_LIST,
    payload: params,
  };
};

export const fetchRefererListSuccess = (response: any) => {
  return {
    type: FETCH_REFERER_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchRefererListFailure = (response: any) => {
  return {
    type: FETCH_REFERER_LIST_FAILURE,
    payload: response,
  };
};

/**
 * Setting current course
 */

export const settingCurrentCourse = (value: any) => {
  return {
    type: SETTING_CURRENT_COURSE,
    payload: value,
  };
};

/**
 * get student details
 */

export const fetchStudentDetails = (params: any) => {
  return {
    type: FETCH_STUDENTS_DETAILS,
    payload: params,
  };
};

export const fetchStudentDetailsSuccess = (response: any) => {
  return {
    type: FETCH_STUDENTS_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchStudentDetailsFailure = (response: any) => {
  return {
    type: FETCH_STUDENTS_DETAILS_FAILURE,
    payload: response,
  };
};

/**
* Setting current Task
*/

export const settingCurrentTaskItem = (value: any) => {
  console.log("valuevaluevalue", value);

  return {
    type: SETTING_CURRENT_TASK_ITEM,
    payload: value,
  };
};


/**
 * get Dashboard details
 */

export const fetchDashboardDetails = (params: any) => {
  return {
    type: FETCH_DASHBOARD_DETAILS,
    payload: params,
  };
};

export const fetchDashboardDetailsSuccess = (response: any) => {
  return {
    type: FETCH_DASHBOARD_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchDashboardDetailsFailure = (response: any) => {
  return {
    type: FETCH_DASHBOARD_DETAILS_FAILURE,
    payload: response,
  };
};

/**
* Setting selected faculty id
*/

export const settingSelectedFacultyId = (value: any) => {

  return {
    type: SETTING_SELECTED_FACULTY_ID,
    payload: value,
  };
};

/**
 * selected student details 
 */

export const editUserRegister = (value: any) => {
  return {
    type: EDIT_USER_REGISTRATION,
    payload: value,
  };
};

/**
 * post raise anonymous complaint
 */

export const postRaiseAnonymousComplaint = (params: any) => {
  return {
    type: POST_RAISE_ANONYMOUS_COMPLAINT,
    payload: params,
   };
 };
 
 export const postRaiseAnonymousComplaintSuccess = (response: any) => {
   return {
     type: POST_RAISE_ANONYMOUS_COMPLAINT_SUCCESS,
     payload: response,
   };
 };
 
 export const postRaiseAnonymousComplaintFailure = (response: any) => {
   return {
     type: POST_RAISE_ANONYMOUS_COMPLAINT_FAILURE,
     payload: response,
   };
  }

/**
 * Get Faculty Details
 */

export const fetchFacultyDetails = (params: any) => {
  console.log("response--------->jjjj",params)
  return {
    type: FETCH_FACULTIES_DETAILS,
    payload: params,
   };
 };
 
 export const fetchFacultyDetailsSuccess = (response: any) => {
  console.log("response--------->jjjj",response)
   return {
     type: FETCH_FACULTIES_DETAILS_SUCCESS,
     payload: response,
   };
 };
 
 export const fetchFacultyDetailsFailure = (response: any) => {
   return {
     type: FETCH_FACULTIES_DETAILS_FAILURE,
     payload: response,
   };

   


 };


 /**
  * Student
  */


 /**
 * get student courses
 */

export const fetchStudentCourses = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSES,
    payload: params,
  };
};

export const fetchStudentCoursesSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSES_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCoursesFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSES_FAILURE,
    payload: response,
  };
};

/**
 * get student course Section
 */

export const fetchStudentCourseSection = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_SECTION,
    payload: params,
  };
};

export const fetchStudentCourseSectionSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_SECTION_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseSectionFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_SECTION_FAILURE,
    payload: response,
  };
};


/**
 * get student course TOPICS
 */

export const fetchStudentCourseTopics = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TOPICS,
    payload: params,
  };
};

export const fetchStudentCourseTopicsSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TOPICS_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseTopicsFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TOPICS_FAILURE,
    payload: response,
  };
};

 /**
 * fetch student course tasks
 */

export const fetchStudentCourseTasks = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS,
    payload: params,
   };
 };
 
 export const fetchStudentCourseTasksSuccess = (response: any) => {
   return {
     type: FETCH_STUDENT_COURSE_TASKS_SUCCESS,
     payload: response,
   };
 };
 
 export const fetchStudentCourseTasksFailure = (response: any) => {
   return {
     type: FETCH_STUDENT_COURSE_TASKS_FAILURE,
     payload: response,
   };
 };

  /**
 * fetch student course tasks details
 */

export const fetchStudentCourseTasksDetails = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_DETAILS,
    payload: params,
   };
 };
 
 export const fetchStudentCourseTaskDetailssSuccess = (response: any) => {
   return {
     type: FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS,
     payload: response,
   };
 };
 
 export const fetchStudentCourseTasksDetailsFailure = (response: any) => {
   return {
     type: FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE,
     payload: response,
   };
 };

 /**
 * setting default course 
 */

export const settingDefaultCourse = (value: any) => {
  return {
    type: SETTING_DEFAULT_COURSE,
    payload: value,
  };
};
