import { useNavigate } from "react-router-dom";
import {
  Splash,
  Login,
  Otp,
  Landing,
  Question,
  Procedure,
  CodeEditor,
  CourseSection,
  TopicSection,
  FlowDiagram,
  AdminCourseSection,
  QuestionCreation,
  RegisteredStudents,
  RegisterUser,
  AdminTopicSection,
  Settings,
  RegisteredFaculties,
  RegisterFaculty,
  AssignCourseToStudents,
  AddCourse,
  AnonymousComplaint
} from '@Modules'
// const useNav = () => 


// export const routes = [
//   {
//     collapse: true,
//     name: "Dashboards",
//     icon: "ni ni-shop text-primary",
//     state: "dashboardsCollapse",
//     views: [
//       {
//         path: "/dashboard",
//         name: "Dashboard",
//         miniName: "D",
//         component: Alternative,
//         layout: "/admin",

//       },
//     ], 
//   },
//   {
//     path: "/calendar",
//     name: "Calendar",
//     icon: "ni ni-calendar-grid-58 text-red",
//     layout: "/admin",
//     component: Calendar,
//   },
// ];

export const AUTH_PATH = {
  SPLASH: "/",
  LOGIN: "/login",
  OTP: "/otp",
  REGISTER: '/register',
  REGISTER_STUDENTS: "/register-student",
  REGISTER_FACULTY: "/register-faculty"
};

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SPLASH: "/",
    OTP: "/otp",

  },
  HOME: {
    DASHBOARD: "/dashboard",
    CODE_EDITOR: "/codeEditor",
    QUESTION: "/question",
    PROCEDURE: "/procedure",
    LANDING: "/landing",
    FLOWDIAGRAM: "/flowDiagram",
    COURSE_SECTION: "/course-section",
    TOPIC_SECTION: "/topicSection",
    ADMIN_TOPIC_SECTION: "/adminTopicSection",
    USER_PROFILE: "/userProfile",
    ADMIN_COURSE_SECTION: "/adminCourseSection",
    QUESTION_CREATION: "/question-creation",
    REGISTERED_STUDENTS: "/registered-students",
  },

  ADMIN: {
    SETTINGS: "/settings",
    ASSIGN_COURSE_STUDENTS: "/assignCourse-students",
    REGISTERED_FACULTIES: "/registered-faculties",
    ADD_COURSE: "/add-course",
    ANONYMOUS_COMPLAINT: "/anonymous-complaint"
  },

};


export const AUTH_ROUTES = [
  {
    key: 1,
    path: AUTH_PATH.SPLASH,
    component: <Splash />
  },
  {
    key: 2,
    path: AUTH_PATH.LOGIN,
    component: <Login />
  },
  {
    key: 3,
    path: AUTH_PATH.OTP,
    component: <Otp />
  },

];

export const DASHBOARD_ROUTES = [
  {
    key: 1,
    path: ROUTES.HOME.QUESTION,
    component: <Question />
  },
  {
    key: 2,
    path: ROUTES.HOME.PROCEDURE,
    component: <Procedure />
  },
  {
    key: 3,
    path: ROUTES.HOME.FLOWDIAGRAM,
    component: <FlowDiagram />
  },
  {
    key: 4,
    path: ROUTES.HOME.CODE_EDITOR,
    component: <CodeEditor />
  },
  {
    key: 5,
    path: ROUTES.HOME.LANDING,
    component: <Landing />
  },
  {
    key: 6,
    path: ROUTES.HOME.COURSE_SECTION,
    component: <CourseSection />
  },
  {
    key: 7,
    path: ROUTES.HOME.TOPIC_SECTION,
    component: <TopicSection />
  },
  {
    key: 8,
    path: ROUTES.HOME.ADMIN_TOPIC_SECTION,
    component: <AdminTopicSection />
  },
  {
    key: 8,
    path: ROUTES.HOME.ADMIN_COURSE_SECTION,
    component: <AdminCourseSection />
  },
  {
    key: 9,
    path: ROUTES.HOME.QUESTION_CREATION,
    component: <QuestionCreation />
  },
  {
    key: 10,
    path: ROUTES.HOME.REGISTERED_STUDENTS,
    component: <RegisteredStudents />
  },
  {
    key: 11,
    path: ROUTES.ADMIN.SETTINGS,
    component: <Settings />
  },
  {
    key: 12,
    path: ROUTES.ADMIN.ASSIGN_COURSE_STUDENTS,
    component: <AssignCourseToStudents isCourseNotAssigned={false} />
  },
  {
    key: 13,
    path: AUTH_PATH.REGISTER_STUDENTS,
    component: <RegisterUser />
  },
  {
    key: 14,
    path: ROUTES.ADMIN.REGISTERED_FACULTIES,
    component: <RegisteredFaculties />
  },
  {
    key: 15,
    path: AUTH_PATH.REGISTER_FACULTY,
    component: <RegisterFaculty />
  },
  {
    key: 15,
    path: ROUTES.ADMIN.ADD_COURSE,
    component: <AddCourse />
  },
  {
    key: 16,
    path: ROUTES.ADMIN.ANONYMOUS_COMPLAINT,
    component: <AnonymousComplaint />
  },
];


export const ADMIN_ROUTES = [
  {
    collapse: true,
    name: "Courses",
    icon: "ni ni-ungroup text-orange",
    state: "dashboardsCollapses",
    views: [
      {
        path: "/add-course",
        name: "Add Course",
        miniName: "JS",
        component: <AddCourse />,
        layout: "/dashboard",
      },
      {
        path: "/assign-course-students",
        name: "Assign Course",
        miniName: "AC",
        // icon: "ni ni-single-copy-04 text-pink",
        component: <AssignCourseToStudents isCourseNotAssigned={true} />,
        layout: "/dashboard",

      },
    ],
  },

  {
    path: "/registered-students",
    name: "Students",
    icon: "ni ni-bell-55 text-red",
    component: <RegisteredStudents />,
    layout: "/dashboard",

  },
  {
    path: "/registered-faculties",
    name: "Faculties",
    icon: "ni ni-badge text-red",
    component: <RegisteredFaculties />,
    layout: "/dashboard",

  },
  {
    path: "/anonymous-complaint",
    name: "Anonymous complaint/ticket",
    icon: "ni ni-badge text-red",
    component: <AnonymousComplaint />,
    layout: "/dashboard",

  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-settings text-red",
    component: <Settings />,
    layout: "/dashboard",

  },

];

export const USER_ROUTES = [
  {
    collapse: true,
    name: "Courses",
    icon: "ni ni-single-copy-04 text-blue",
    state: "dashboardsCollapse",
    views: [
      // {
      //   path: "/course-section",
      //   name: "React JS",
      //   miniName: "JS",
      //   component: <CourseSection />,
      //   layout: "/dashboard",

      // },
    ],
  },
  {
    path: "/anonymous-complaint",
    name: "Anonymous complaint/ticket",
    icon: "ni ni-badge text-red",
    component: <AnonymousComplaint />,
    layout: "/dashboard",

  },
]


export * from "./RequireAuth";
export * from "./RequireHome";
