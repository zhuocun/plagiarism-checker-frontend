import { Navigate } from "react-router-dom";
import {

  LoginPage,
  RegisterPage,
  ResultListPage,
  OperationPage,
  ResultStudentPage,
  SbjPage,
  SendLink,
  PasswordReset,
  UserPage
} from "../pages";
 
import { AsgmtPage } from "../pages/asgmt/AsgmtPage";

import { HomePage } from "../pages/home/HomePage"

const routes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "subject/:subjectCode/",
        element: <AsgmtPage />
      },
      {
        path: "subject/:subjectCode/:assignmentName",
        element: <OperationPage />
      },
      {
        path: "result",
        element: <ResultListPage />
      },
      {
        path: "user",
        element: <UserPage />
      },
      {
        path: "subject",
        element: <SbjPage />
      },
      {
        path: "/",
        element: <Navigate to="/subject" />
      }
    ]
  },

  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "/setPassword",
    element: <PasswordReset />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/reset",
    element: <SendLink />
  },
  {
    path: "/",
    element: <Navigate to="/login" />
  }
];

export default routes;

