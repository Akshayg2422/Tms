

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


export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SPLASH: "/",
  },
  HOME: {
    DASHBOARD: "/dashboard",
  }
}


export * from './RequireAuth'
export * from './RequireHome'
