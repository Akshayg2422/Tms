import { Issues, Companies, Settings, Broadcast, Tasks, Profile } from '@Modules'
import { Login, Otp, Landing, Splash } from '@Modules'




export const HOME_PATH = {
  DASHBOARD: "/admin",
  COMPANY: "/company",
  CREATE_COMPANY: "/create-company",
  COMPANY_INFO: "/company-info",
  ADD_USER: "/add-user",
  ISSUE_DETAILS: "/issue-details",
  ADD_REFERENCE_TICKET: '/add-reference-ticket',
  ADD_REFERENCE_TASK: '/add-reference-task',
  ISSUE_TICKET: '/issue-ticket',
  CREATE_BROAD_CAST: '/create-broad-cast',
  ADD_TASK: '/add-task',
  ADD_SUB_TASK: '/add-sub-task',
  TASK_DETAILS: '/task-details'
}

export const ROUTES = {
  'auth-module': {
    login: '/login',
    otp: '/otp',
    splash: '/splash',
    register: '/register',
    landing: '/'
  },
  'task-module': {
    tasks: '/tasks',
  },
  'issue-module': {
    issues: '/issues',
  },
  'user-company-module': {
    companies: '/companies',
    profile: '/profile',
    setting: '/setting'
  },
  'message-module': {
    broadcast: '/broadcast',
  }
}

export const AUTH_ROUTES = [

  {
    key: 1,
    path: ROUTES['auth-module'].landing,
    component: <Landing />
  },
  {
    key: 2,
    path: ROUTES['auth-module'].login,
    component: <Login />
  },
  {
    key: 3,
    path: ROUTES['auth-module'].otp,
    component: <Otp />
  },
  {
    key: 4,
    path: ROUTES['auth-module'].splash,
    component: <Splash />
  },

];



export const HOME_ROUTES = [
  {
    path: ROUTES['task-module'].tasks,
    name: "Tasks",
    icon: "bi bi-list-task text-primary",
    layout: "",
    component: <Tasks />
  },

  {
    path: ROUTES['issue-module'].issues,
    name: "Tickets",
    icon: "bi bi-bell text-primary",
    layout: "",
    component: <Issues />
  },
  {
    path: ROUTES['user-company-module'].companies,
    name: "Companies",
    icon: "bi bi-geo-alt text-primary",
    layout: "",
    component: <Companies />
  },
  {
    path: ROUTES['message-module'].broadcast,
    name: "Broadcast",
    icon: "bi bi-megaphone text-primary",
    layout: "",
    component: <Broadcast />
  },
  {
    path: ROUTES['user-company-module'].profile,
    name: "Profile",
    icon: "bi bi-person-circle text-primary",
    layout: "",
    component: <Profile />
  },
  {
    path: ROUTES['user-company-module'].setting,
    name: "Settings",
    icon: "bi bi-gear text-primary",
    layout: "",
    component: <Settings />
  }
];





export const ADMIN_ROUTES = [

  {
    path: "/profile",
    name: "Profile",
    icon: "bi bi-person-circle text-primary",
    layout: "",
    component: <Profile />
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "bi bi-list-task text-primary",
    layout: "",
    component: <Tasks />
  },

  {
    path: "/issues",
    name: "Tickets",
    icon: "bi bi-bell text-primary",
    layout: "",
    component: <Issues />
  },
  {
    path: "/companies",
    name: "Companies",
    icon: "bi bi-geo-alt text-primary",
    layout: "",
    component: <Companies />
  },
  {
    path: "/broadCast",
    name: "Broadcast",
    icon: "bi bi-megaphone text-primary",
    layout: "",
    component: <Broadcast />
  },

  {
    path: "/settings",
    name: "Settings",
    icon: "bi bi-gear text-primary",
    layout: "",
    component: <Settings />
  }
];

export * from "./RequireAuth";
export * from "./RequireHome";
