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
import JobOrInternDetails from "../Pages/JobOrInternDetails";
import ErrorPage from "../Pages/ErrorPage";
import axios from "axios";
import { baseURL } from "../Utilities/BaseURL";
import Loader from "../Components/Loader";
import ApplyForJob from "../Pages/ApplyForJob";
import MyApplications from "../Pages/MyApplications";
import PrivateRoute from "../Providers/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";

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
                path: "/see-details/:id",
                loader: async ({ params }) => {
                    try {
                        // Fetch data for a specific job/intern using the ID from the URL
                        const response = await axios.get(`${baseURL}/jobsAndInterns/${params?.id}`);
                        return response.data; // Return the data to the component
                    } catch (error) {
                        console.error("Error fetching job/intern details in loader:", error);
                        // Throw a Response for React Router to catch and display the errorElement
                        throw new Response("Not Found", { status: error.response?.status || 404, statusText: error.response?.statusText || "Details not found" });
                    }
                },
                element: <PrivateRoute>
                    <JobOrInternDetails></JobOrInternDetails>
                </PrivateRoute>,
                hydrateFallbackElement: <Loader></Loader>
            },
            {
                path: "/apply/:id",
                loader: async ({ params }) => {
                    try {
                        // Fetch data for a specific job/intern using the ID from the URL
                        const response = await axios.get(`${baseURL}/jobsAndInterns/${params?.id}`);
                        return response.data; // Return the data to the component
                    } catch (error) {
                        console.error("Error fetching job/intern details in loader:", error);
                        // Throw a Response for React Router to catch and display the errorElement
                        throw new Response("Not Found", { status: error.response?.status || 404, statusText: error.response?.statusText || "Details not found" });
                    }
                },
                element: <PrivateRoute>
                    <ApplyForJob></ApplyForJob>
                </PrivateRoute>,
                hydrateFallbackElement: <Loader></Loader>
            },
        ],
    },
    {
        path: "/dashboard",
        element:
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>,
        children: [
            {
                index: true,
                element: <div className="flex justify-center items-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-secondary my-8 md:my-20">Welcome to Dashboard!</h1>
                </div>,
            },
            {
                path: "/dashboard/browse-listings",
                element: <PrivateRoute>
                    <BrowseJobs></BrowseJobs>
                </PrivateRoute>,
            },
            {
                path: "/dashboard/new-job",
                element: <PrivateRoute>
                    <AddNewJob></AddNewJob>
                </PrivateRoute>,
            },
            {
                path: "/dashboard/applied-jobs",
                element: <PrivateRoute>
                    <MyApplications></MyApplications>
                </PrivateRoute>,
            },
            {
                path: "/dashboard/find-applicants",
                element: <PrivateRoute>
                    <FindApplicants></FindApplicants>
                </PrivateRoute>,
            },

        ]
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
    {
        path: "/*",
        element: <ErrorPage></ErrorPage>
    },
]);