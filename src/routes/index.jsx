import { Navigate } from "react-router-dom";
import {
    LoginPage,
    RegisterPage,
    ResultListPage,
    OperationPage,
    SbjPage
} from "../pages";
import { HomePage } from "../pages/home/HomePage";
import { AsgmtPage } from "../pages/asgmt/AsgmtPage";

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
                path: "subject",
                element: <SbjPage />
            }
        ]
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/",
        element: <Navigate to="/login" />
    }
];

export default routes;

