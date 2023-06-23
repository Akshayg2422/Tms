import { Companies, Broadcast, Tasks, Profile, Setting, TaskDetails, TicketDetails, AddReferenceTicket, CompanyDetails, AddReferenceTask, AddTask, AddSubTask, CreateBroadCast, CreateCompany, AddUser, AddTicket, EmployeesList, EmployeesTimeSheet, MyPortfolio, Tickets, AdminFeeds, Events, AddEvent, VirtualConference, ScheduleMeeting, VideoConference, Groups, TimeApproval, ReSubmitRequest, IndividualChat } from '@Modules'
import { Login, Otp, Landing, Splash } from '@Modules'
import { icons } from '@Assets'
import { Component } from 'react'
import { MyTimeSheet } from '@Modules//UserCompany/Screen/MyTimeSheet'
import { translate } from '@I18n'


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
  ADD_TICKET: './add-ticket',
  EMPLOYEE_TIME_SHEET: './employee-time-sheet',
  GROUPS: './groups'
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
    "employee-time-sheet": '/employee-time-sheet',
    "time-approval": '/time-approval',
    "re-submit-request": '/re-submit-request',
    profile: '/profile',
    setting: '/setting',
    employee: '/employee-sheet',
    'virtual-conference': '/virtual-conference',
    'video-conference': '/video-conference',
    "scheduled-meeting-list": '/scheduled-meeting-list',
    "schedule-meeting": '/schedule-meeting',
    'my-portfolio': '/my-portfolio',
    'admin-feeds': '/admin-feeds',
    Events: '/events',
    Groups: '/groups',
    'individual-chat': '/chat',
    'add-event': '/add-event'
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
    name: translate("sideNav.Tasks"),
    icon: icons.task,
    layout: "",
    component: <Tasks />
  },
  {
    path: ROUTES['ticket-module'].tickets,
    name: translate("sideNav.Tickets"),
    icon: icons.issue,
    layout: "",
    component: <Tickets />
  },
  {
    path: ROUTES['user-company-module'].companies,
    name: translate("sideNav.Associations"),
    icon: icons.company,
    layout: "",
    component: <Companies />
  },
  {
    path: ROUTES['message-module'].broadcast,
    name: translate("sideNav.Feeds"),
    icon: icons.broadCast,
    layout: "",
    component: <Broadcast />
  },

  {
    collapse: true,
    name: translate("sideNav.Admin"),
    icon: icons.admin,
    state: "dashboardsCollapse",
    views: [
      {
        path: ROUTES['user-company-module'].employee,
        name: translate("sideNav.Employee Portfolio"),
        // icon:icons.protfolio,
        miniName: "EP",
        component: <EmployeesList />,
        layout: '/admin',
      },
      {
        path: ROUTES['user-company-module']['time-approval'],
        name: "Time Approval",
        miniName: "TS",
        component: <TimeApproval />,
        layout: '/admin',
      },
      {
        path: ROUTES['user-company-module']['admin-feeds'],
        name: translate("sideNav.Admin Feeds"),
        miniName: "MF",
        component: <AdminFeeds />,
        layout: '/admin',
      },
      {
        path: ROUTES['user-company-module'].Events,
        name: translate("sideNav.Events"),
        miniName: "ET",
        component: <Events />,
        layout: '/admin',
      },
      {
        path: ROUTES['user-company-module']['virtual-conference'],
        name: translate("sideNav.Virtual Conference"),
        miniName: "VC",
        component: <VirtualConference />,
        layout: '/admin',
      },
    ],


  },

  {
    path: ROUTES['user-company-module']['my-portfolio'],
    name: translate("sideNav.MyTimeSheet"),
    miniName: "TS",
    icon: icons.myTimeSheet,
    component: <MyTimeSheet />,
    layout: '',
  },
  {
    path: ROUTES['user-company-module'].Groups,
    name: translate("sideNav.Groups"),
    icon: icons.group,
    layout: "",
    component: <Groups />
  },
  {
    path: ROUTES['user-company-module']['individual-chat'],
    name: 'Chat',
    icon: icons.company,
    layout: "",
    component: <IndividualChat />
  },
  {
    path: ROUTES['user-company-module'].profile,
    name: translate("sideNav.Profile"),
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
  },
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
    path: ROUTES['ticket-module']['tickets-details'] + '/:id',
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
  {
    key: 4,
    path: ROUTES['user-company-module']['employee-time-sheet'],
    component: <EmployeesTimeSheet />
  },
  {
    key: 5,
    path: ROUTES['user-company-module']['time-approval'],
    component: <TimeApproval />
  },
  {
    key: 6,
    path: ROUTES['user-company-module']['admin-feeds'],
    component: <AdminFeeds />
  },
  {
    key: 6,
    path: ROUTES['user-company-module'].Events,
    component: <Events />
  },
  {
    key: 7,
    path: ROUTES['user-company-module']['add-event'],
    component: <AddEvent />
  },
  {
    key: 8,
    path: ROUTES['user-company-module']['schedule-meeting'],
    component: <ScheduleMeeting />
  },
  {
    key: 9,
    path: ROUTES['user-company-module']['video-conference'],
    component: <VideoConference />
  },
  {
    key: 10,
    path: ROUTES['user-company-module'].Groups,
    component: <Groups />
  },

  {
    key: 12,
    path: ROUTES['user-company-module']['re-submit-request'],
    component: <ReSubmitRequest />
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
