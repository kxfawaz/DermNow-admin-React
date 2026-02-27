import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ConsultationDetail from "./ConsultationDetail";
import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "./AdminLogin";
import ConsultationList from "./ConsultationList";
import AdminQuestions from "./AdminQuestions";
import AdminQuestionDetail from "./AdminQuestionDetail";
import AdminManagement from "./AdminManagement";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/AdminLogin" replace /> },
  { path: "/AdminLogin", element: <AdminLogin /> },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "consultations", element: <ConsultationList /> },
          { path: "consultations/:id", element: <ConsultationDetail /> },
          { path: "questions", element: <AdminQuestions /> },
          { path: "questions/:id", element: <AdminQuestionDetail /> },
          { path: "/admin/management", element: <AdminManagement /> }
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}