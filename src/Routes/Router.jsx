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
                element: <JobOrInternDetails></JobOrInternDetails>,
                hydrateFallbackElement: <Loader></Loader>
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
    {
        path: "/*",
        element: <ErrorPage></ErrorPage>
    },
]);