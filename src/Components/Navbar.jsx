import React from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css'
import Logo from './Logo';

const Navbar = () => {
    const links =
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/new-job">New Job/Intern</NavLink></li>
            <li><NavLink to="/browse-jobs">Browse Jobs</NavLink></li>
            <li><NavLink to="/applied-jobs">Applied Jobs</NavLink></li>
            <li><NavLink to="/find-applicants">Find Applicants</NavLink></li>
        </>;

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Logo></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link className="btn btn-primary text-white" to="/auth/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;