import { Companies, Settings, Broadcast, Tasks, Profile, Setting, TaskDetails,TicketDetails,AddReferenceTicket, CompanyDetails, AddReferenceTask, AddTask, AddSubTask, CreateBroadCast, CreateCompany, AddUser, Tickets, AddTicket } from '@Modules'
import { Login, Otp, Landing, Splash } from '@Modules'
import { icons } from '@Assets'



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
  TASK_DETAILS: '/task-details',
  TICKET_DETAILS: '/ticket-details',
  ADD_TICKET: './add-ticket'
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
    'tasks-details': '/tasks-details',
    'reference-task': '/reference-task',
    'add-task': '/add-task',
    'add-sub-task': '/add-sub-task',
  },
  'ticket-module': {
    tickets: '/tickets',
    'tickets-details': '/tickets-details',
    'add-ticket': '/add-ticket',
    'reference-ticket': '/reference-ticket'
  },
  'user-company-module': {
    companies: '/companies',
    "company-details": '/company-details',
    "add-company": '/add-company',
    "add-user": '/add-user',
    profile: '/profile',
    setting: '/setting'
  },
  'message-module': {
    broadcast: '/broadcast',
    'create-broadcast': '/create-broadcast',
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
    icon: icons.task,
    layout: "",
    component: <Tasks />
  },
  {
    path: ROUTES['ticket-module'].tickets,
    name: "Tickets",
    icon: icons.issue,
    layout: "",
    component: <Tickets />
  },
  {
    path: ROUTES['user-company-module'].companies,
    name: "Companies",
    icon: icons.company,
    layout: "",
    component: <Companies />
  },
  {
    path: ROUTES['message-module'].broadcast,
    name: "Broadcast",
    icon: icons.broadCast,
    layout: "",
    component: <Broadcast />
  },
  {
    path: ROUTES['user-company-module'].profile,
    name: "Profile",
    icon: icons.profile,
    layout: "",
    component: <Profile />
  },
  {
    path: ROUTES['user-company-module'].setting,
    name: "Settings",
    icon: icons.setting,
    layout: "",
    component: <Setting />
  }
];

export const TASK_ROUTES = [
  {
    key: 1,
    path: ROUTES['task-module']['tasks-details'] + '/:id',
    component: <TaskDetails />
  },
  {
    key: 2,
    path: ROUTES['task-module']['reference-task'],
    component: <AddReferenceTask />
  },

  {
    key: 3,
    path: ROUTES['task-module']['add-task'],
    component: <AddTask />
  },

  {
    key: 4,
    path: ROUTES['task-module']['add-sub-task'],
    component: <AddSubTask />
  },

];

export const TICKET_ROUTES = [
  {
    key: 1,
    path: ROUTES['ticket-module']['tickets-details']+ '/:id',
    component: <TicketDetails />
  },
  {
    key: 2,
    path: ROUTES['ticket-module']['reference-ticket'],
    component: <AddReferenceTicket />
  },
  {
    key: 3,
    path: ROUTES['ticket-module']['add-ticket'],
    component: <AddTicket />
  }


];


export const MESSAGE_ROUTES = [
  {
    key: 1,
    path: ROUTES['message-module']['create-broadcast'],
    component: <CreateBroadCast />
  },
];

export const USER_COMPANY_ROTES = [
  {
    key: 1,
    path: ROUTES['user-company-module']['company-details'],
    component: <CompanyDetails />
  },
  {
    key: 2,
    path: ROUTES['user-company-module']['add-company'],
    component: <CreateCompany />
  },
  {
    key: 3,
    path: ROUTES['user-company-module']['add-user'],
    component: <AddUser />
  },
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
    component: <Tickets />
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
    component: <Setting />
  }
];

export * from "./RequireAuth";
export * from "./RequireHome";
