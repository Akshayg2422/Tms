import { Issues, Companies, Settings, OpenTicket, ClosedTicket, OtherTicket,Logout, Broadcast} from '@Modules'
import { Login, Otp, Splash,} from '@Modules'


export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SPLASH: "/",
    OTP: "/otp",
    REGISTER: '/register',
    VIEW_GOOGLE_BUSINESS: '/view-google-business',
    // ISSUE_DETAILS: '/issueDetails'
  },
  HOME: {
    Admin: "/admin/issues",
    Company: "/company/open",
    DASHBOARD: "/dashboard",
  },
};

export const AUTH_PATH = {
  SPLASH: "/",
  LOGIN: "/login",
  OTP: "/otp",
  REGISTER: '/register',
};


export const HOME_PATH = {
  DASHBOARD: "/admin",
  COMPANY: "/company",
  CREATE_COMPANY: "/create-company",
  COMPANY_INFO: "/company-info",
  ADD_USER:"/add-user",
  ISSUE_DETAILS:"/issue-details",
  
}
export const CREATE_BROAD_CAST = {
  DASHBOARD: "/admin",
  COMPANY: "/company",
  BROAD_CAST:"/CreateBroadCast",
 }
 

export const INFO = {
  DASHBOARD: "/admin",
  COMPANY: "/company",
  COMPANY_INFO: "/CompanyInfo"
}

export const ADD_USER_INFO={
  DASHBOARD: "/admin",
  COMPANY: "/company",
  ADD_USER:"/AddUser"
 }
 export const ISSUE_CREATE={
  DASHBOARD: "/admin",
  COMPANY: "/company",
  ISSUE_TICKET:"/IssueCreate"
 }

 export const TAB_ISSUE_ATTACH_DETAILS={
  DASHBOARD: "/admin",
  COMPANY: "/company",
  TAB_ISSUE_USER_DETAILS:"/TabIssueReferenceDetails"
 }




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




export const ADMIN_ROUTES = [
  {
    path: "/issues",
    name: "Issues",
    icon: "ni ni-bell-55 text-red",
    layout: "/admin",
    component: <Issues />
  },
  {
    path: "/companies",
    name: "Companies",
    icon: "ni ni-square-pin text-primary",
    layout: "/admin",
    component: <Companies />
  }, 
  {
    path: "/broadCast",
    name: "Broadcast",
    icon: "ni ni-world-2 text-primary",
    layout: "/admin",
    component: <Broadcast/>
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-settings-gear-65 text-primary",
    layout: "/admin",
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
