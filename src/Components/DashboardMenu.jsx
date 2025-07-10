import React, { useContext } from 'react';
import { NavLink } from 'react-router'; 
import "./DashboardMenu.css";
import { AuthContext } from '../Providers/AuthProvider';

const DashboardMenu = () => {
    const { user, loading } = useContext(AuthContext); 

    if (loading) {
        return null; 
    }
    const userRole = user?.role;

    return (
        <ul className="menu rounded-box w-full text-center md:space-y-2">
            <li><NavLink to="/dashboard/browse-listings" className="dash-menu-navs">Browse Listings</NavLink></li>

            {/* Admin-specific link */}
            {userRole === 'recruiter' && (
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
        </ul>
    );
};

export default DashboardMenu;