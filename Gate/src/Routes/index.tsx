import {} from '@Modules'
import {Login, Otp, Splash,Products, Bookings, Store ,Landing} from '@Modules'

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SPLASH: "/",
    OTP: "/otp",
    REGISTER: '/register',
    VIEW_GOOGLE_BUSINESS: '/view-google-business'


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

export const AUTH_ROUTES = [
  {
    key: 1,
    path: AUTH_PATH.SPLASH,
    component: <Landing/>
  },
  {
    key: 2,
    path: AUTH_PATH.LOGIN,
    component: <Login/>
  },
  {
    key: 3,
    path: AUTH_PATH.OTP,
    component: <Otp/>
  },
];
export const CUSTOMER_ROUTES = [
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-archive-2 text-primary",
    layout: "/dashboard",
    component: <Products/>
  },
  {
    path: "/bookings",
    name: "Bookings",
    icon: "ni ni-box-2 text-green",
    layout: "/dashboard",
    component: <Bookings/>
  }, {
    path: "/store",
    name: "Store",
    icon: "ni ni-shop text-red",
    layout: "/dashboard",
    component:<Store/>
  },
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
        component:<div></div>,
        layout: "/company",

      },
      {
        path: "/closed",
        name: "Closed",
        miniName: "CL",
        component: <div></div>,
        layout: "/company",
      },
      {
        path: "/others",
        name: "Others",
        miniName: "OT",
        component:<div></div>,
        layout: "/company",
      },
    ],
  },
  {
    path: "/setting",
    name: "Settings",
    icon: "ni ni-settings-gear-65 text-gray",
    layout: "/company",
    component: <div></div>
  },
];

export * from "./RequireAuth";
export * from "./RequireHome";
