import { Issues, Companies, Settings, OpenTicket, ClosedTicket, OtherTicket, Broadcast, Tasks,Profile } from '@Modules'
import { Login, Otp, Landing, Splash } from '@Modules'


export const ROUTES = {
  AUTH: {
    SPLASH: "/splash",
    LANDING: "/",
    LOGIN: "/login",
    OTP: "/otp",
    REGISTER: '/register',
    VIEW_GOOGLE_BUSINESS: '/view-google-business',
  },
  HOME: {
    Admin: "/admin/issues",
    Company: "/company/open",
    DASHBOARD: "/dashboard",
  },
};

export const AUTH_PATH = {
  SPLASH: "/splash",
  LANDING: "/",
  LOGIN: "/login",
  OTP: "/otp",
  REGISTER: '/register',
};

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


export const INFO = {
  DASHBOARD: "",
  COMPANY: "/company",
  COMPANY_INFO: "/CompanyInfo"
}

export const ADD_USER_INFO = {
  DASHBOARD: "",
  COMPANY: "/company",
  ADD_USER: "/AddUser"
}


export const TAB_ISSUE_ATTACH_DETAILS = {
  DASHBOARD: "",
  COMPANY: "/company",
  TAB_ISSUE_USER_DETAILS: "/TabIssueReferenceDetails"
}

export const AUTH_ROUTES = [

  {
    key: 1,
    path: AUTH_PATH.LANDING,
    component: <Landing />
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
  {
    key: 4,
    path: AUTH_PATH.SPLASH,
    component: <Splash />
  },

];

export const ADMIN_ROUTES = [

  {
    path: "/profile",
    name: "Profile",
    icon: "bi bi-person-circle text-primary",
    layout: "",
    component: <Profile/>
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

export const COMPANY_ROUTES = [
  {
    collapse: true,
    name: "Tickets",
    icon: "ni ni-single-copy-04 text-pink",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/opened",
        name: "Opened",
        miniName: "OP",
        component: <OpenTicket />,
        layout: "/company",

      },
      {
        path: "/closed",
        name: "Closed",
        miniName: "CL",
        component: <ClosedTicket />,
        layout: "/company",
      },
      {
        path: "/others",
        name: "Others",
        miniName: "OT",
        component: <OtherTicket />,
        layout: "/company",
      },
    ],
  },
  {
    path: "/setting",
    name: "Settings",
    icon: "ni ni-settings-gear-65 text-gray",
    layout: "/company",
    component: <Settings />
  },

];

export * from "./RequireAuth";
export * from "./RequireHome";
