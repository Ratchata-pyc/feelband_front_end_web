// import { RouterProvider } from "react-router-dom";
// import { lazy } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
// import HomePage from "../pages/HomePage";
// import ProfilePage from "../pages/ProfilePage";
// import SearchPage from "../pages/SearchPage";
// import ReportPage from "../pages/ReportPage";
// import ProtectedRoute from "../features/authentication/ProtectedRoute";

// const MainContainer = lazy(() => import("../layouts/MainContainer"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainContainer />,
//     children: [
//       { path: "/", element: <HomePage /> },
//       { path: "profile/:userId", element: <ProfilePage /> },
//       { path: "/search", element: <SearchPage /> },
//       {
//         path: "/report",
//         element: (
//           <ProtectedRoute>
//             <ReportPage />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },

//   { path: "/login", element: <LoginPage /> },
//   { path: "/register", element: <RegisterPage /> },
// ]);

// export default function Router() {
//   return <RouterProvider router={router} />;
// }

import { Navigate, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import SearchPage from "../pages/SearchPage";
import ReportPage from "../pages/ReportPage";
import ProtectedRoute from "../features/authentication/ProtectedRoute";

const MainContainer = lazy(() => import("../layouts/MainContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "profile/:userId", element: <ProfilePage /> },
      { path: "/search", element: <SearchPage /> },
      {
        path: "/report",
        element: (
          <ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
