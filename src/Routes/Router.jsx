import {
    createBrowserRouter,
} from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AddNewJob from "../Pages/AddNewJob";
import BrowseJobs from "../Pages/BrowseJobs";
import MyAppliedJobs from "../Pages/MyAppliedJobs";
import FindApplicants from "../Pages/FindApplicants";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/new-job",
                element: <AddNewJob></AddNewJob>,
            },
            {
                path: "/browse-jobs",
                element: <BrowseJobs></BrowseJobs>,
            },
            {
                path: "/applied-jobs",
                element: <MyAppliedJobs></MyAppliedJobs>,
            },
            {
                path: "/find-applicants",
                element: <FindApplicants></FindApplicants>
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>
            },
        ],
    },
]);