import React, { useContext } from 'react';
import { NavLink } from 'react-router'; // Use react-router-dom for NavLink
import "./DashboardMenu.css";
import { AuthContext } from '../Providers/AuthProvider';

const DashboardMenu = () => {
    const { user, loading } = useContext(AuthContext); // Destructure loading from AuthContext

    // Show a loading state or nothing until user and their role are determined
    if (loading) {
        return null; // Or a spinner/loader
    }

    // Determine the user's role
    // Assuming user.role holds the role (e.g., 'admin', 'applicant', 'recruiter')
    // If user is null (not logged in), userRole will be undefined
    const userRole = user?.role;

    return (
        <ul className="menu rounded-box w-full text-center md:space-y-2">
            <li><NavLink to="/dashboard/browse-listings" className="dash-menu-navs">Browse Listings</NavLink></li>

            {/* Admin-specific link */}
            {userRole === 'admin' && (
                <li><NavLink to="/dashboard/new-job" className="dash-menu-navs">Add New Job</NavLink></li>
            )}

            {/* Applicant-specific link */}
            {userRole === 'applicant' && (
                <li><NavLink to="/dashboard/applied-jobs" className="dash-menu-navs">My Applications</NavLink></li>
            )}

            {/* Recruiter-specific link */}
            {userRole === 'recruiter' && (
                <li><NavLink to="/dashboard/find-applicants" className="dash-menu-navs">Find Applicants</NavLink></li>
            )}

            {/* Add any links visible to all logged-in users here */}
            {/* Example:
            {user && (
                <li><NavLink to="/dashboard/profile" className="dash-menu-navs">My Profile</NavLink></li>
            )}
            */}
        </ul>
    );
};

export default DashboardMenu;